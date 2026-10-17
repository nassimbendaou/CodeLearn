const coreQuestions = [
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
  { id: 'closure', topic: 'JavaScript', prompt: 'Une closure permet à une fonction interne de…', choices: ['Accéder à son contexte extérieur', 'Effacer une variable', 'Créer une classe', 'Bloquer une Promise'], answer: 0, explanation: 'Une closure conserve l’accès aux variables du contexte qui a créé la fonction.' },
  { id: 'immutable', topic: 'JavaScript', prompt: 'Quelle expression ajoute 4 à un tableau sans le modifier ?', choices: ['items.push(4)', '[...items, 4]', 'items[items.length] = 4', 'items.concat() puis pop'], answer: 1, explanation: 'L’opérateur spread crée un nouveau tableau et préserve la valeur initiale.' },
  { id: 'effect', topic: 'React', prompt: 'Quel hook synchronise un composant avec une API ou un abonnement ?', choices: ['useCallback', 'useEffect', 'useId', 'useContext'], answer: 1, explanation: 'useEffect sert à synchroniser un composant avec un système externe.' },
  { id: 'key', topic: 'React', prompt: 'Pourquoi chaque élément d’une liste React doit avoir une key stable ?', choices: ['Pour changer la couleur', 'Pour identifier chaque élément entre les rendus', 'Pour rendre le code plus court', 'Pour créer un état global'], answer: 1, explanation: 'La key aide React à conserver correctement les éléments lors des mises à jour.' },
  { id: 'git-branch', topic: 'Git', prompt: 'Quelle commande crée puis bascule sur une branche ?', choices: ['git merge', 'git switch -c', 'git status', 'git reset'], answer: 1, explanation: 'git switch -c nom-de-branche crée une branche et s’y place.' },
  { id: 'git-commit', topic: 'Git', prompt: 'Que doit contenir un bon message de commit ?', choices: ['Une phrase vague', 'Un mot de passe', 'Une action claire et concise', 'Tous les fichiers du projet'], answer: 2, explanation: 'Un message clair explique le changement et rend l’historique utile.' },
  { id: 'css-flex', topic: 'CSS', prompt: 'Quelle propriété aligne les enfants sur l’axe principal avec Flexbox ?', choices: ['align-items', 'justify-content', 'position', 'z-index'], answer: 1, explanation: 'justify-content contrôle la distribution sur l’axe principal.' },
  { id: 'css-grid', topic: 'CSS', prompt: 'Quelle unité CSS partage l’espace disponible dans une grille ?', choices: ['px', 'em', 'fr', '%'], answer: 2, explanation: 'fr représente une fraction de l’espace libre de la grille.' },
  { id: 'testing', topic: 'Tests', prompt: 'Quel test vérifie un comportement utilisateur attendu ?', choices: ['Un test de compilation uniquement', 'Un test unitaire ciblé', 'Un commentaire', 'Un commit vide'], answer: 1, explanation: 'Un test unitaire cible une règle ou un comportement précis et reproductible.' },
  { id: 'security', topic: 'Sécurité', prompt: 'Où stocker une clé secrète côté application ?', choices: ['Dans le dépôt Git', 'Dans un fichier .env ignoré', 'Dans un commentaire', 'Dans le nom de la branche'], answer: 1, explanation: 'Une variable d’environnement évite de publier un secret dans le code.' },
  { id: 'database-index', topic: 'Data', prompt: 'Quel mécanisme accélère souvent une recherche sur une colonne ?', choices: ['Un index', 'Un console.log', 'Un bouton', 'Un cache navigateur uniquement'], answer: 0, explanation: 'Un index réduit le travail de recherche du moteur de base de données.' },
  { id: 'cache', topic: 'Performance', prompt: 'Quel en-tête HTTP permet une validation de cache efficace ?', choices: ['Content-Type', 'ETag', 'Origin', 'Accept'], answer: 1, explanation: 'ETag permet au client de vérifier si une ressource a changé.' },
  { id: 'a11y-button', topic: 'Accessibilité', prompt: 'Quel contrôle convient pour déclencher une action ?', choices: ['Un div cliquable', 'Un bouton', 'Un span', 'Un h1'], answer: 1, explanation: 'Un bouton expose correctement son rôle et son interaction aux technologies d’assistance.' },
  { id: 'error-boundary', topic: 'Qualité', prompt: 'Quelle pratique aide à comprendre une erreur en production ?', choices: ['Supprimer les logs', 'Capturer le contexte et l’erreur', 'Ignorer le bug', 'Dupliquer le code'], answer: 1, explanation: 'Un rapport contenant le contexte permet de diagnostiquer et corriger plus vite.' },
  { id: 'architecture', topic: 'Architecture', prompt: 'Quel principe réduit le couplage entre deux modules ?', choices: ['Responsabilité unique', 'Variables globales', 'Copier-coller', 'Dépendances circulaires'], answer: 0, explanation: 'Une responsabilité claire limite les dépendances et facilite les évolutions.' },
  { id: 'rest', topic: 'API', prompt: 'Quelle réponse HTTP indique qu’une requête n’est pas autorisée ?', choices: ['201', '401', '404', '500'], answer: 1, explanation: '401 indique qu’une authentification est requise ou invalide.' },
];

const learningContexts = [
  'Dans une application de réservation', 'Pour le tableau de bord d’une équipe', 'Dans une boutique en ligne', 'Pour une application de santé',
  'Dans un outil de gestion de projets', 'Pour une messagerie mobile', 'Dans une plateforme d’apprentissage', 'Pour un site de voyage',
  'Dans une application bancaire', 'Pour un espace administrateur', 'Dans une application de livraison', 'Pour un réseau social',
  'Dans une application de musique', 'Pour une marketplace', 'Dans un outil de support client', 'Pour une application de sport',
];

export function buildQuestionBank(total = 10_000) {
  return Array.from({ length: total }, (_, index) => {
    const base = coreQuestions[index % coreQuestions.length];
    const tier = Math.floor(index / coreQuestions.length) + 1;
    const context = learningContexts[Math.floor(index / coreQuestions.length) % learningContexts.length];
    return {
      ...base,
      id: `${base.id}-${tier}`,
      difficulty: Math.min(5, Math.ceil(tier / 80)),
      prompt: tier === 1 ? base.prompt : `${context} · niveau ${tier} : ${base.prompt}`,
    };
  });
}

export const questions = buildQuestionBank();

export function createChallengeRound(count = 10, start = 0) {
  return Array.from({ length: count }, (_, index) => questions[(start + index * 37) % questions.length]);
}

export function pointsForAnswer({ correct, secondsLeft, streak = 0 }) {
  if (!correct) return 0;
  return 100 + Math.max(0, secondsLeft) * 4 + Math.min(streak, 5) * 20;
}

export function rankPlayers(players) {
  return [...players].sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));
}

export function nextRound(state, choice, bank = questions) {
  const question = bank[state.questionIndex];
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
