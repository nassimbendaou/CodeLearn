import { z } from 'zod';

export const learnerSchema = z.object({ name: z.string(), points: z.number(), level: z.number(), streak: z.number() });
export const postSchema = z.object({ id: z.string(), author: z.string(), handle: z.string(), body: z.string(), tags: z.array(z.string()), likes: z.number(), time: z.string() });

const dashboard = learnerSchema.parse({ name: 'Nassim', points: 2840, level: 8, streak: 6 });
const feed = z.array(postSchema).parse([
  { id: 'p1', author: 'Sofia Martin', handle: '@sofia.codes', body: 'J’ai enfin compris les closures grâce au mini défi du jour ✨', tags: ['JavaScript', 'progression'], likes: 24, time: 'Il y a 8 min' },
  { id: 'p2', author: 'Yanis El Idrissi', handle: '@yanis.dev', body: 'Qui rejoint la room React à 19h ? Objectif : battre le chrono.', tags: ['React', 'challenge'], likes: 12, time: 'Il y a 24 min' },
]);

export async function fetchDashboard() {
  await new Promise((resolve) => setTimeout(resolve, 180));
  return { learner: dashboard, feed, rooms: 128 };
}
