import React from 'react';

/**
 * Composant de titre de page unifié pour toutes les pages
 * @param {string} title - Le texte du titre
 * @param {string} subtitle - Sous-titre optionnel
 * @param {string} variant - Style variant: 'default', 'large', 'gradient'
 * @param {string} className - Classes CSS additionnelles
 */
const PageTitle = ({ 
  title, 
  subtitle, 
  variant = 'default',
  className = '' 
}) => {
  const baseClasses = 'text-4xl font-extrabold mb-8 tracking-tight';
  
  const colorClasses = variant === 'gradient' 
    ? 'bg-gradient-to-r from-primary-600 to-violet-500 bg-clip-text text-transparent'
    : 'text-gray-900 dark:text-white';
  
  const titleClasses = `${baseClasses} ${colorClasses} ${className}`.trim();
  
  if (!subtitle) {
    return (
      <h1 className={titleClasses}>
        {title}
      </h1>
    );
  }
  
  return (
    <>
      <h1 className={titleClasses}>
        {title}
      </h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {subtitle}
      </p>
    </>
  );
};

export default PageTitle;
