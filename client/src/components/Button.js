import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Composant Button unifié pour tous les boutons du site
 * @param {string} variant - Style du bouton: 'primary', 'secondary', 'ghost'
 * @param {string} size - Taille: 'sm', 'md', 'lg'
 * @param {string} as - Type d'élément: 'button', 'link', 'a'
 * @param {string} to - Chemin pour Link (react-router)
 * @param {string} href - URL pour <a>
 * @param {boolean} disabled - Bouton désactivé
 * @param {React.ReactNode} children - Contenu du bouton
 * @param {string} className - Classes additionnelles
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  as = 'button',
  to,
  href,
  disabled = false,
  children,
  className = '',
  ...props
}) => {
  // Classes de base communes à tous les boutons
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500';

  // Variantes de couleurs
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-soft hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed',
    secondary: 'border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800',
    ghost: 'bg-gray-700 text-white hover:bg-gray-800',
    link: 'text-gray-900 dark:text-white' // Pour les cas où le bouton agit comme un lien sans style de bouton
  };

  // Tailles
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  // Rendre selon le type d'élément
  if (as === 'link' && to) {
    return (
      <Link to={to} className={buttonClasses} {...props}>
        {children}
      </Link>
    );
  }

  if (as === 'a' && href) {
    return (
      <a href={href} className={buttonClasses} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={buttonClasses} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
