import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';

// Base URL de l'API PHP (même que les composants admin)
const API_URL = '/portfolio-fdme/server/api';

const Projects = () => {
  usePageMeta('Projets', 'Découvrez les projets web et logiciels réalisés par Rayane Hakim.');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { hash } = useLocation();

  useEffect(() => {
    axios.get(`${API_URL}/get_projects.php`)
      .then(res => {
        setProjects(Array.isArray(res.data) ? res.data : (res.data.projects || []));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Scroll to anchor after projects have loaded
  useEffect(() => {
    if (!loading && hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
      }
    }
  }, [loading, hash]);

  // Filtrer les projets par catégorie
  const proProjects = projects.filter(p => p.category === 'pro');
  const ecoleProjects = projects.filter(p => p.category === 'ecole');
  const persoProjects = projects.filter(p => p.category === 'perso');

  const renderProject = (project) => (
    <div key={project.id} id={`project-${project.id}`} className="scroll-mt-24 h-full">
      <ProjectCard project={project} />
    </div>
  );

  return (
    <Layout containerSize="default">
      <PageTitle title="Mes Projets" />
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