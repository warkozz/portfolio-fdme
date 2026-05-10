import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const [imgError, setImgError] = useState(false);
  const handleImgError = useCallback(() => setImgError(true), []);

  // Image since from DB (base64) or legacy upload path or public assets fallback
  const publicImageMap = {
    'Facture2Clins - SaaS de facturation pour artisans': '/admin2clins.png',
    'CodeAddict - Site freelance personnel': '/CodeAddict.png',
    'Logiciel Gestion Conseil de classe': '/conseil.png',
    'PPE MediaWiki - Installation et Documentation': '/MediaWiki.png',
    'Site vitrine professionnel pour une entreprise BTP spécialisée en rénovation de salles de sport': '/btpreno.png',
    'Développeur Mobile React - Protectiv Pint (Capgemini)': '/capgemini.png',
    'Développeur Web - AuditGen AI (Capgemini)': '/capgemini.png',
    'Développeur R&D Python/IA - AuditGen AI (Capgemini)': '/capgemini.png',
    'Application Web Zoo Arcadia': '/image.png',
    'Application Logiciel Gestion Five 5v5': '/web-5V5.png',
    'Football Manager 5V5 - Extension Web': '/web-5V5.png',
    'Software5V5': '/Software5V5.png'
  };

  const publicFallback = publicImageMap[project.title] || null;

  const imgSrc = project.image_base64
    ? `data:${project.image_mime || 'image/jpeg'};base64,${project.image_base64}`
    : (project.image ? `http://localhost/portfolio-fdme/server/upload/${project.image}` : publicFallback);

  const tags = project.competencies
    ? project.competencies.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 flex flex-col overflow-hidden h-full">

      {/* Image / placeholder */}
      {imgSrc && !imgError ? (
        <div className="h-44 overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
          <img
            src={imgSrc}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImgError}
          />
        </div>
      ) : (
        <div className="h-44 bg-gradient-to-br from-primary-50 to-violet-50 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center flex-shrink-0">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gray-300 dark:text-gray-600">
            <path d="M3.5 7.75A1.75 1.75 0 0 1 5.25 6h3.17c.46 0 .9.2 1.2.54l1.06 1.18c.33.37.81.58 1.32.58h4.5A1.75 1.75 0 0 1 18.25 10v6.25A1.75 1.75 0 0 1 16.5 18h-11A1.75 1.75 0 0 1 3.75 16.25V7.75Z"/>
          </svg>
        </div>
      )}

      {/* Contenu */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white text-base leading-snug mb-1">
            {project.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tags compétences */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300 border border-primary-100 dark:border-primary-800/50"
              >
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                +{tags.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Footer card : actions */}
        <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between gap-2">
          {project.github_link ? (
            <a
              href={project.github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              GitHub
            </a>
          ) : <span />}
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center px-3 py-1.5 rounded-lg bg-primary-600 text-white text-xs font-semibold hover:bg-primary-700 transition-colors duration-200 shadow-sm"
          >
            En savoir +
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

