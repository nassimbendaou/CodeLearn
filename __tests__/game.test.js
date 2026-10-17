import { createChallengeRound, nextRound, pointsForAnswer, questions, rankPlayers } from '../lib/game';
import { reviewCode } from '../lib/review';
import { getPlacementRecommendation, placementQuestions } from '../lib/placement';
import { getAdaptivePlan, getNextSkill } from '../lib/adaptive';
import { getDailyChallenge, getLeague } from '../lib/league';

describe('challenge scoring', () => {
  it('rewards fast correct answers and preserves a failed streak', () => {
    expect(pointsForAnswer({ correct: true, secondsLeft: 10, streak: 2 })).toBe(180);
    expect(pointsForAnswer({ correct: false, secondsLeft: 10, streak: 2 })).toBe(0);
    expect(nextRound({ questionIndex: 0, secondsLeft: 12, points: 200, streak: 2 }, 0)).toMatchObject({ points: 388, streak: 3, answered: true });
    expect(nextRound({ questionIndex: 0, secondsLeft: 12, points: 200, streak: 2 }, 1)).toMatchObject({ points: 200, streak: 0 });
  });

  it('ranks players by points then name', () => {
    expect(rankPlayers([{ name: 'Zoé', points: 200 }, { name: 'Ana', points: 200 }, { name: 'Malik', points: 340 }]).map((player) => player.name)).toEqual(['Malik', 'Ana', 'Zoé']);
  });

  it('provides a unique sequence for a room', () => {
    expect(new Set(questions.map((question) => question.id)).size).toBe(questions.length);
    expect(questions.length).toBeGreaterThanOrEqual(10_000);
    expect(createChallengeRound(10, 450).map((question) => question.id)).toHaveLength(10);
  });

  it('returns actionable senior review notes', () => {
    expect(reviewCode('var total = 2; console.log(total)')).toMatchObject({ score: expect.any(Number) });
    expect(reviewCode('var total = 2; console.log(total)').notes).toHaveLength(4);
    expect(reviewCode('const total = (value) => value * 2;').score).toBeGreaterThan(80);
  });

  it('creates an adaptive placement recommendation', () => {
    expect(placementQuestions).toHaveLength(6);
    expect(getPlacementRecommendation([0, 0, 0, 0, 0, 0])).toMatchObject({ level: 1, pathId: 'js' });
    expect(getPlacementRecommendation(placementQuestions.map((question) => question.answer))).toMatchObject({ level: 5, pathId: 'react' });
  });

  it('unlocks the next skill after completing the current one', () => {
    const placement = getPlacementRecommendation([0, 0, 0, 0, 0, 0]);
    const initialPlan = getAdaptivePlan(placement);
    expect(getNextSkill(initialPlan)).toMatchObject({ id: 'js-basics', unlocked: true });
    const progressedPlan = getAdaptivePlan(placement, ['js-basics']);
    expect(getNextSkill(progressedPlan)).toMatchObject({ id: 'js-functions', unlocked: true });
  });

  it('assigns leagues and a deterministic daily challenge', () => {
    expect(getLeague(3_200)).toMatchObject({ name: 'Or', nextName: 'Platine', pointsToNext: 2_800 });
    expect(getDailyChallenge(6)).toMatchObject({ id: expect.any(String), reward: 250 });
  });

});
