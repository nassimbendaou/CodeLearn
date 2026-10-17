import { z } from 'zod';

export const skillProgressSchema = z.array(z.string()).max(20);

const skillNodes = [
  { id: 'js-basics', pathId: 'js', title: 'Fondations JavaScript', description: 'Variables, conditions et tableaux', color: '#F7C948', icon: 'logo-javascript', requiredLevel: 1 },
  { id: 'js-functions', pathId: 'js', title: 'Fonctions et logique', description: 'Décomposer un problème en petites étapes', color: '#F7C948', icon: 'git-branch-outline', requiredLevel: 1 },
  { id: 'web-api', pathId: 'js', title: 'Web et API', description: 'HTTP, données et erreurs', color: '#78D7AF', icon: 'cloud-outline', requiredLevel: 2 },
  { id: 'react-state', pathId: 'react', title: 'État React', description: 'Interfaces réactives et composants', color: '#69D7FF', icon: 'phone-portrait-outline', requiredLevel: 3 },
  { id: 'quality', pathId: 'react', title: 'Qualité et tests', description: 'Tests, accessibilité et refactorisation', color: '#C69CFF', icon: 'shield-checkmark-outline', requiredLevel: 4 },
  { id: 'architecture', pathId: 'react', title: 'Architecture produit', description: 'Structurer une application qui grandit', color: '#AE8CFF', icon: 'layers-outline', requiredLevel: 5 },
];

export function getAdaptivePlan(placement, completed = []) {
  const done = new Set(completed);
  return skillNodes.map((node, index) => {
    const previousDone = index === 0 || done.has(skillNodes[index - 1].id);
    const unlocked = previousDone && (node.requiredLevel <= placement.level || completed.length >= node.requiredLevel);
    return { ...node, completed: done.has(node.id), unlocked, progress: done.has(node.id) ? 100 : unlocked ? 12 : 0 };
  });
}

export function getNextSkill(plan) {
  return plan.find((node) => node.unlocked && !node.completed) ?? plan.find((node) => !node.completed) ?? plan[plan.length - 1];
}
