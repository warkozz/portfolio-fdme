import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import axios from 'axios';

const API_URL = '/portfolio-fdme/server/api';

const CATEGORY_LABELS = {
  pro: 'Projet Professionnel',
  ecole: 'Projet Scolaire',
  perso: 'Projet Personnel',
};

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/get_projects.php`)
      .then(res => {
        const projects = Array.isArray(res.data) ? res.data : (res.data.projects || []);
        setProject(projects.find(p => String(p.id) === String(id)));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <Layout>
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    </Layout>
  );

  if (!project) return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <p className="text-gray-500 dark:text-gray-400 text-lg">Projet introuvable.</p>
        <Link to="/projects" className="text-sm text-primary-600 hover:underline">← Retour aux projets</Link>
      </div>
    </Layout>
  );

  const tags = project.competencies ? project.competencies.split(',').map(t => t.trim()).filter(Boolean) : [];
  const createdYear = project.created_at ? new Date(project.created_at).getFullYear() : null;
  const categoryLabel = CATEGORY_LABELS[project.category] || null;
  // Image src depuis la DB (base64) ou fallback legacy
  // Image src depuis la DB (base64), fallback legacy ou assets publics
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

  return (
    <Layout containerSize="default">
      {/* Lien retour */}
      <div className="mb-6">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Retour aux projets
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">

        {/* Bandeau header avec dégradé */}
        <div className="bg-gradient-to-br from-primary-600 to-violet-600 px-8 py-10 text-white">
          {/* Catégorie + année */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {categoryLabel && (
              <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                {categoryLabel}
              </span>
            )}
            {createdYear && (
              <span className="text-xs text-white/70">{createdYear}</span>
            )}
          </div>
          {/* Titre */}
          <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-5">
            {project.title}
          </h1>
          {/* Tags technologies */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/25"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Image hero */}
        <div className="w-full h-64 md:h-80 overflow-hidden bg-gray-100 dark:bg-gray-700">
          {imgSrc && !imgError ? (
            <img
              src={imgSrc}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <img
              src={`https://picsum.photos/seed/${project.id}/1200/400`}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Contenu */}
        <div className="p-6 md:p-10 flex flex-col gap-8">

          {/* À propos du projet */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-600">
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
              </svg>
              À propos du projet
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {project.description_long || project.description}
            </p>
          </div>

          {/* Boutons GitHub + Demo */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex flex-wrap gap-3">
            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 dark:bg-gray-700 text-white text-sm font-semibold hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200 shadow-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                Voir sur GitHub
              </a>
            )}
            {project.live_link && (
              <a
                href={project.live_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors duration-200 shadow-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                Voir le site
              </a>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
