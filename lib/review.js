export function reviewCode(source) {
  const notes = [];
  const code = source.trim();
  if (!code) return { score: 0, verdict: 'Écrivez une première solution pour lancer la revue.', notes: ['Le senior attend votre code.'] };
  if (/\bvar\b/.test(code)) notes.push('Préférez const ou let à var afin de limiter la portée des variables.');
  if (/console\.log/.test(code)) notes.push('Le console.log aide à déboguer ; retirez-le avant de livrer.');
  if (/TODO|FIXME/i.test(code)) notes.push('Transformez ce TODO en comportement testé avant de soumettre.');
  if (!/\b(return|=>)\b/.test(code)) notes.push('La fonction devrait retourner un résultat explicite.');
  if (!/[;}]\s*$/.test(code)) notes.push('Vérifiez la fin de votre instruction ou de votre bloc.');
  const score = Math.max(30, 100 - notes.length * 16);
  return { score, verdict: notes.length ? 'Revue du senior : quelques points à améliorer.' : 'Revue du senior : solution propre, lisible et prête à tester.', notes: notes.length ? notes : ['Nommage clair, résultat explicite et aucune alerte détectée.', 'Ajoutez maintenant un test pour sécuriser ce comportement.'] };
}
