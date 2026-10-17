// Deployed by the "Deploy AI review worker" GitHub Actions workflow.
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const fallback = {
  score: 0,
  verdict: 'La revue IA est momentanément indisponible.',
  notes: ['Réessayez dans quelques instants ou utilisez la revue locale.'],
};

function json(body, status = 200) {
  return Response.json(body, { status, headers: corsHeaders });
}

function extractJson(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return fallback;
  try {
    const data = JSON.parse(match[0]);
    if (typeof data.score !== 'number' || typeof data.verdict !== 'string' || !Array.isArray(data.notes)) return fallback;
    return { score: Math.max(0, Math.min(100, Math.round(data.score))), verdict: data.verdict.slice(0, 500), notes: data.notes.slice(0, 4).map(String) };
  } catch {
    return fallback;
  }
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
    const url = new URL(request.url);
    if (request.method !== 'POST' || url.pathname !== '/review') return json({ error: 'Not found' }, 404);
    if (!env.GEMINI_API_KEY) return json(fallback, 503);
    let code;
    try { ({ code } = await request.json()); } catch { return json({ error: 'Invalid JSON' }, 400); }
    if (typeof code !== 'string' || code.length < 1 || code.length > 12_000) return json({ error: 'Code must contain 1 to 12000 characters' }, 400);
    const prompt = `You are a supportive senior software engineer reviewing code from a learner. Review the code below in French. Return JSON only, with score (0-100), verdict (one sentence), and notes (1-4 specific, actionable items). Do not execute code.\n\nCODE:\n${code}`;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(env.GEMINI_API_KEY)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.25, responseMimeType: 'application/json' } }),
    });
    if (!response.ok) return json(fallback, 502);
    const payload = await response.json();
    return json(extractJson(payload.candidates?.[0]?.content?.parts?.[0]?.text ?? ''));
  },
};
