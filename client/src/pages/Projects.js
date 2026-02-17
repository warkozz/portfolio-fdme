import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

// Base URL de l'API PHP (même que les composants admin)
const API_URL = '/portfolio-fdme/server/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/get_projects.php`)
      .then(res => {
        setProjects(Array.isArray(res.data) ? res.data : (res.data.projects || []));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filtrer les projets par catégorie
  const proProjects = projects.filter(p => p.category === 'pro');
  const ecoleProjects = projects.filter(p => p.category === 'ecole');
  const persoProjects = projects.filter(p => p.category === 'perso');

  const renderProject = (project) => (
    <div key={project.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 flex flex-col">
      <div className="mb-4">
        {project.image ? (
          <img src={project.image} alt={project.title} className="w-full h-36 object-cover rounded-lg" />
        ) : (
          <div className="w-full h-36 bg-primary-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <svg width="64" height="64" fill="none" viewBox="0 0 24 24">
              <rect width="24" height="24" rx="6" fill="#6366F1" />
              <path d="M7 8h10v8H7V8z" fill="#fff" />
            </svg>
          </div>
        )}
      </div>
      <h2 className="font-bold text-xl mb-1 text-gray-900 dark:text-white">{project.title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {project.competencies && project.competencies.split(',').filter(Boolean).map((tech, idx) => (
          <span key={idx} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs px-2 py-1 rounded-md">
            {tech.trim()}
          </span>
        ))}
      </div>
      {project.github_link && (
        <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline text-sm mt-auto">
          Voir sur GitHub
        </a>
      )}
    </div>
  );

  return (
    <Layout>
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white">Mes Projets</h1>
      {loading ? (
        <div className="text-center text-gray-500">Chargement...</div>
      ) : projects.length === 0 ? (
        <div className="text-center text-gray-500">Aucun projet disponible.</div>
      ) : (
        <>
          {/* Section Projets Professionnels */}
          {proProjects.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Projets Professionnels</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Projets réalisés dans un cadre professionnel (entreprises, alternance, stages).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {proProjects.map(renderProject)}
              </div>
            </section>
          )}

          {/* Section Projets Scolaires */}
          {ecoleProjects.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Projets Scolaires</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Projets réalisés dans le cadre de ma formation (BTS SIO SLAM, PPE, travaux pratiques).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {ecoleProjects.map(renderProject)}
              </div>
            </section>
          )}

          {/* Section Projets Personnels */}
          {persoProjects.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Projets Personnels</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Projets développés sur mon temps libre pour explorer de nouvelles technologies et approfondir mes compétences.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {persoProjects.map(renderProject)}
              </div>
            </section>
          )}
        </>
      )}
    </Layout>
  );
};

export default Projects;