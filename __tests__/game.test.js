import { nextRound, pointsForAnswer, rankPlayers } from '../lib/game';

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
});
