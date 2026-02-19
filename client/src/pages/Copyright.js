import React from 'react';
import Layout from '../components/Layout';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
      {title}
    </h2>
    <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-2">
      {children}
    </div>
  </div>
);

const Copyright = () => {
  const year = new Date().getFullYear();

  return (
    <Layout containerSize="narrow">
      <div className="py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M14.83 14.83A4 4 0 1 1 9.17 9.17"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mentions légales & Copyright</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Dernière mise à jour : Février {year}
          </p>
        </div>

        {/* Propriété intellectuelle */}
        <Section title="Propriété intellectuelle">
          <p>
            L'ensemble du contenu de ce portfolio — incluant, sans s'y limiter, le code source, les textes, la mise en page,
            les designs et les projets présentés — est la propriété exclusive de{' '}
            <span className="font-semibold text-gray-800 dark:text-gray-200">Rayane Hakim</span>.
          </p>
          <p>
            © {year} Rayane Hakim. Tous droits réservés.
          </p>
        </Section>

        {/* Licence MIT */}
        <Section title="Licence">
          <p>
            Le <span className="font-semibold text-gray-800 dark:text-gray-200">code source</span> de ce portfolio est distribué sous licence{' '}
            <a
              href="https://opensource.org/licenses/MIT"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 hover:underline font-semibold"
            >
              MIT
            </a>
            .
          </p>
          <div className="mt-3 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 font-mono text-xs leading-relaxed text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
            <p>MIT License</p>
            <p className="mt-1">Copyright (c) {new Date().getFullYear()} Rayane Hakim</p>
            <p className="mt-2">Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.</p>
            <p className="mt-2">The Software is provided "as is", without warranty of any kind.</p>
          </div>
          <p className="mt-2">
            Le contenu éditorial (projets, textes, visuels) reste la propriété exclusive de Rayane Hakim et n'est pas couvert par cette licence.
          </p>
        </Section>

        {/* Utilisation du contenu */}
        <Section title="Contenu éditorial">
          <p>Toute reproduction, distribution ou utilisation du contenu éditorial de ce site (textes, projets, visuels) est <span className="font-semibold text-gray-800 dark:text-gray-200">strictement interdite</span> sans autorisation écrite préalable.</p>
          <p>Les projets présentés peuvent être consultés à titre d'information, mais ne peuvent être réutilisés à des fins commerciales ou personnelles sans accord explicite.</p>
        </Section>

        {/* Technologies utilisées */}
        <Section title="Technologies utilisées">
          <p>Ce portfolio a été développé avec les technologies open-source suivantes :</p>
          <ul className="mt-2 space-y-1 list-none">
            {[
              { name: 'React', url: 'https://react.dev', desc: 'Framework JavaScript UI' },
              { name: 'Tailwind CSS', url: 'https://tailwindcss.com', desc: 'Framework CSS utilitaire' },
              { name: 'React Router', url: 'https://reactrouter.com', desc: 'Routage côté client' },
              { name: 'PHP', url: 'https://www.php.net', desc: 'Backend API' },
              { name: 'MySQL', url: 'https://www.mysql.com', desc: 'Base de données' },
            ].map(({ name, url, desc }) => (
              <li key={name} className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary-500 flex-shrink-0">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                >
                  {name}
                </a>
                <span className="text-gray-400 dark:text-gray-500">— {desc}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Données personnelles */}
        <Section title="Données personnelles">
          <p>Ce site ne collecte aucune donnée personnelle à titre commercial. Les seules informations pouvant être transmises (via le formulaire de contact) le sont à des fins exclusives de communication professionnelle.</p>
          <p>Aucun cookie de tracking, publicité ou analyse comportementale n'est utilisé.</p>
        </Section>

        {/* Contact */}
        <Section title="Contact">
          <p>Pour toute question relative au copyright ou à l'utilisation du contenu :</p>
          <a
            href="mailto:hakimrayane@hotmail.fr"
            className="inline-flex items-center gap-2 mt-2 text-primary-600 dark:text-primary-400 hover:underline font-medium"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M22 7l-10 7L2 7"/>
            </svg>
            hakimrayane@hotmail.fr
          </a>
        </Section>

        {/* Back link */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Retour à l'accueil
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Copyright;
