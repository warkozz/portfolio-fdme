import { useEffect } from 'react';

const SITE_NAME = 'Portfolio Rayane';

/**
 * Met à jour <title> et les meta description/og dynamiquement.
 * @param {string} title       - Titre de la page (sans le nom du site)
 * @param {string} description - Description pour les moteurs de recherche
 */
const usePageMeta = (title, description = '') => {
  useEffect(() => {
    // Title
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description || `${title} – ${SITE_NAME}`);

    // OG title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title ? `${title} | ${SITE_NAME}` : SITE_NAME);

    // OG description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description || `${title} – ${SITE_NAME}`);

    return () => {
      document.title = SITE_NAME;
    };
  }, [title, description]);
};

export default usePageMeta;
