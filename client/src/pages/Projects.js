import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard';
import usePageMeta from '../hooks/usePageMeta';

const API_URL = '/portfolio-fdme/server/api';

const CATEGORIES = [
  {
    value: 'all',
    label: 'Tous',
    icon: '⊞',
    description: null,
  },
  {
    value: 'pro',
    label: 'Professionnels',
    icon: '💼',
    description: 'Réalisés en entreprise, alternance ou stage.',
    activeClass: 'bg-purple-600 text-white border-purple-600',
    dotClass: 'bg-purple-500',
    sectionClass: 'border-purple-200 dark:border-purple-800/50',
    headingClass: 'text-purple-700 dark:text-purple-400',
  },
  {
    value: 'ecole',
    label: 'Scolaires',
    icon: '🎓',
    description: 'Réalisés dans le cadre de ma formation BTS SIO SLAM.',
    activeClass: 'bg-green-600 text-white border-green-600',
    dotClass: 'bg-green-500',
    sectionClass: 'border-green-200 dark:border-green-800/50',
    headingClass: 'text-green-700 dark:text-green-400',
  },
  {
    value: 'perso',
    label: 'Personnels',
    icon: '🚀',
    description: 'Développés sur mon temps libre pour explorer de nouvelles technologies.',
    activeClass: 'bg-blue-600 text-white border-blue-600',
    dotClass: 'bg-blue-500',
    sectionClass: 'border-blue-200 dark:border-blue-800/50',
    headingClass: 'text-blue-700 dark:text-blue-400',
  },
];

const Projects = () => {
  usePageMeta('Projets', 'Découvrez les projets web et logiciels réalisés par Rayane Hakim.');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const { hash } = useLocation();

  useEffect(() => {
    axios.get(`${API_URL}/get_projects.php`)
      .then(res => {
        setProjects(Array.isArray(res.data) ? res.data : (res.data.projects || []));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading && hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
      }
    }
  }, [loading, hash]);

  const renderCard = (project) => (
    <div key={project.id} id={`project-${project.id}`} className="scroll-mt-24 h-full">
      <ProjectCard project={project} />
    </div>
  );

  // Vue "Tous" : sections groupées par catégorie
  const renderAllSections = () =>
    CATEGORIES.filter(c => c.value !== 'all').map(cat => {
      const items = projects.filter(p => p.category === cat.value);
      if (items.length === 0) return null;
      return (
        <section key={cat.value} className={`mb-14 pb-14 border-b last:border-0 last:mb-0 last:pb-0 ${cat.sectionClass} dark:border-opacity-40`}>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{cat.icon}</span>
            <h2 className={`text-2xl font-bold ${cat.headingClass}`}>
              {cat.label}
            </h2>
            <span className="ml-1 text-sm font-medium text-gray-400 dark:text-gray-500">
              {items.length} projet{items.length > 1 ? 's' : ''}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 ml-10">
            {cat.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(renderCard)}
          </div>
        </section>
      );
    });

  // Vue filtrée : grille plate
  const renderFiltered = () => {
    const cat = CATEGORIES.find(c => c.value === activeFilter);
    const items = projects.filter(p => p.category === activeFilter);
    return (
      <section>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{cat.icon}</span>
          <h2 className={`text-2xl font-bold ${cat.headingClass}`}>{cat.label}</h2>
          <span className="ml-1 text-sm font-medium text-gray-400 dark:text-gray-500">
            {items.length} projet{items.length > 1 ? 's' : ''}
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 ml-10">{cat.description}</p>
        {items.length === 0 ? (
          <p className="text-center text-gray-400 dark:text-gray-500 py-16">Aucun projet dans cette catégorie.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(renderCard)}
          </div>
        )}
      </section>
    );
  };

  return (
    <Layout containerSize="default">
      <PageTitle title="Mes Projets" />

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
        </div>
      ) : projects.length === 0 ? (
        <p className="text-center text-gray-500 py-16">Aucun projet disponible.</p>
      ) : (
        <>
          {/* Barre de filtres */}
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {CATEGORIES.map(cat => {
              const count = cat.value === 'all' ? projects.length : projects.filter(p => p.category === cat.value).length;
              const isActive = activeFilter === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveFilter(cat.value)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                    isActive
                      ? (cat.activeClass || 'bg-gray-800 text-white border-gray-800 dark:bg-white dark:text-gray-900 dark:border-white')
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                  <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full text-xs font-bold ${
                    isActive ? 'bg-white/25 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Contenu */}
          {activeFilter === 'all' ? renderAllSections() : renderFiltered()}
        </>
      )}
    </Layout>
  );
};

export default Projects;