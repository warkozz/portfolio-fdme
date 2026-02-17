// Configuration de l'API
export const API_URL = '/portfolio-fdme/server/api';

// Classes CSS réutilisables pour les formulaires
export const FORM_CLASSES = {
  input: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors",
  textarea: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors resize-y",
  label: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
  requiredMark: "text-red-500",
  helperText: "mt-1 text-xs text-gray-500 dark:text-gray-400"
};

// Catégories
export const PROJECT_CATEGORIES = {
  perso: { label: 'Projet personnel', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
  ecole: { label: 'École / Formation', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
  pro: { label: 'Professionnel', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' }
};

export const VEILLE_CATEGORIES = {
  automatique: { label: 'Veille automatique', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400' },
  forum: { label: 'Forums et communautés', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' }
};

// Messages
export const MESSAGES = {
  deleteConfirm: {
    project: 'Êtes-vous sûr de vouloir supprimer ce projet ?',
    veille: 'Êtes-vous sûr de vouloir supprimer cet article ?'
  },
  errors: {
    loadProjects: 'Erreur lors du chargement des projets',
    loadVeille: 'Erreur lors du chargement de la veille',
    deleteError: 'Erreur lors de la suppression',
    toggleError: 'Erreur lors du basculement de visibilité',
    submitError: 'Erreur lors de la soumission'
  }
};
