import { z } from 'zod';
import { reviewCode } from './review';

const seniorReviewSchema = z.object({
  score: z.number().min(0).max(100),
  verdict: z.string().min(1).max(500),
  notes: z.array(z.string().min(1).max(500)).min(1).max(4),
});

export async function getSeniorReview(code) {
  const endpoint = process.env.EXPO_PUBLIC_AI_REVIEW_URL;
  if (!endpoint) return reviewCode(code);
  try {
    const response = await fetch(`${endpoint.replace(/\/$/, '')}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    if (!response.ok) throw new Error('AI review unavailable');
    return seniorReviewSchema.parse(await response.json());
  } catch {
    return reviewCode(code);
  }
}
