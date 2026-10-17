import { questions } from './game';

const leagues = [
  { name: 'Bronze', minPoints: 0, color: '#CD9B6A' },
  { name: 'Argent', minPoints: 1_500, color: '#BFC7D5' },
  { name: 'Or', minPoints: 3_000, color: '#F7C948' },
  { name: 'Platine', minPoints: 6_000, color: '#77E2D0' },
  { name: 'Diamant', minPoints: 10_000, color: '#A98BFF' },
];

export function getLeague(points) {
  let index = 0;
  for (let position = 0; position < leagues.length; position += 1) {
    if (points >= leagues[position].minPoints) index = position;
  }
  const league = leagues[Math.max(0, index)];
  const next = leagues[index + 1];
  return { ...league, nextName: next?.name ?? 'Champion', pointsToNext: next ? Math.max(0, next.minPoints - points) : 0 };
}

export function getDailyChallenge(seed = 0) {
  const question = questions[(seed * 97 + 631) % questions.length];
  return { ...question, reward: 250, label: 'Défi du jour' };
}
