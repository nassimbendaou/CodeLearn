import { z } from 'zod';

export const placementQuestions = [
  { id: 'variables', topic: 'JavaScript', prompt: 'Quelle déclaration empêche de réassigner une variable ?', choices: ['let', 'const', 'var', 'value'], answer: 1 },
  { id: 'array', topic: 'JavaScript', prompt: 'Quelle méthode crée un nouveau tableau transformé ?', choices: ['push', 'map', 'pop', 'shift'], answer: 1 },
  { id: 'react', topic: 'React', prompt: 'Quel hook stocke un état dans un composant ?', choices: ['useState', 'useFetch', 'useLoop', 'useStyle'], answer: 0 },
  { id: 'http', topic: 'Web', prompt: 'Quel statut HTTP correspond à une ressource introuvable ?', choices: ['200', '201', '404', '500'], answer: 2 },
  { id: 'git', topic: 'Git', prompt: 'Quelle commande affiche les fichiers modifiés ?', choices: ['git status', 'git push', 'git clone', 'git init'], answer: 0 },
  { id: 'testing', topic: 'Qualité', prompt: 'Pourquoi écrire un test unitaire ?', choices: ['Pour changer les couleurs', 'Pour vérifier un comportement', 'Pour publier une app', 'Pour créer une branche'], answer: 1 },
];

export const placementSchema = z.object({ score: z.number().int().min(0).max(placementQuestions.length), level: z.number().int().min(1).max(5), label: z.string(), pathId: z.string() });

export function getPlacementRecommendation(answers) {
  const score = placementQuestions.reduce((total, question, index) => total + (answers[index] === question.answer ? 1 : 0), 0);
  const profile = score <= 2 ? { level: 1, label: 'Fondations', pathId: 'js' } : score <= 4 ? { level: 3, label: 'Intermédiaire', pathId: 'react' } : { level: 5, label: 'Avancé', pathId: 'react' };
  return placementSchema.parse({ score, ...profile });
}
