import { createChallengeRound, nextRound, pointsForAnswer, questions, rankPlayers } from '../lib/game';
import { reviewCode } from '../lib/review';
import { getPlacementRecommendation, placementQuestions } from '../lib/placement';

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

});
