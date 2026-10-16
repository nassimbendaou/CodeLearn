export const questions = [
  {
    id: 'async',
    topic: 'JavaScript',
    prompt: 'Quelle valeur produit `Promise.resolve(3)` ?',
    choices: ['Une Promise résolue avec 3', 'Le nombre 3 immédiatement', 'Une erreur', 'Une chaîne "3"'],
    answer: 0,
    explanation: 'Promise.resolve enveloppe la valeur dans une Promise résolue.',
  },
  {
    id: 'http',
    topic: 'Web',
    prompt: 'Quel code HTTP indique la création réussie d’une ressource ?',
    choices: ['200', '201', '204', '304'],
    answer: 1,
    explanation: '201 Created confirme que le serveur a créé la ressource.',
  },
  {
    id: 'sql',
    topic: 'Data',
    prompt: 'Quelle clause limite le nombre de lignes retournées en SQL ?',
    choices: ['GROUP BY', 'HAVING', 'LIMIT', 'ORDER BY'],
    answer: 2,
    explanation: 'LIMIT réduit le nombre de lignes dans le résultat.',
  },
  {
    id: 'array-map',
    topic: 'JavaScript',
    prompt: 'Quelle méthode transforme chaque élément d’un tableau sans modifier le tableau initial ?',
    choices: ['map', 'push', 'find', 'sort'],
    answer: 0,
    explanation: 'map crée un nouveau tableau en appliquant une fonction à chaque élément.',
  },
  {
    id: 'react-state',
    topic: 'React',
    prompt: 'Quel hook mémorise une valeur qui change dans un composant fonctionnel ?',
    choices: ['useEffect', 'useState', 'useMemo', 'useRef'],
    answer: 1,
    explanation: 'useState stocke une valeur et déclenche un nouveau rendu lorsqu’elle change.',
  },
  {
    id: 'accessibility',
    topic: 'Web',
    prompt: 'Quel élément HTML décrit le contenu principal d’une page ?',
    choices: ['div', 'section', 'main', 'span'],
    answer: 2,
    explanation: 'La balise main identifie le contenu central et améliore la navigation assistée.',
  },
  {
    id: 'complexity',
    topic: 'Algorithmique',
    prompt: 'Quelle complexité décrit une recherche binaire dans une liste triée ?',
    choices: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    answer: 1,
    explanation: 'Chaque comparaison élimine la moitié de la liste, ce qui donne O(log n).',
  },
  {
    id: 'api',
    topic: 'API',
    prompt: 'Quel verbe HTTP est adapté pour modifier partiellement une ressource ?',
    choices: ['GET', 'POST', 'PATCH', 'DELETE'],
    answer: 2,
    explanation: 'PATCH applique une modification partielle à une ressource existante.',
  },
];

export function pointsForAnswer({ correct, secondsLeft, streak = 0 }) {
  if (!correct) return 0;
  return 100 + Math.max(0, secondsLeft) * 4 + Math.min(streak, 5) * 20;
}

export function rankPlayers(players) {
  return [...players].sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));
}

export function nextRound(state, choice) {
  const question = questions[state.questionIndex];
  const correct = choice === question.answer;
  const gained = pointsForAnswer({ correct, secondsLeft: state.secondsLeft, streak: correct ? state.streak : 0 });
  return {
    ...state,
    points: state.points + gained,
    streak: correct ? state.streak + 1 : 0,
    answered: true,
    lastAnswer: { correct, gained, explanation: question.explanation },
  };
}
