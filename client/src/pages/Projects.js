import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../api/projects';
import ProjectCard from '../components/ProjectCard';
import Layout from '../components/Layout';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects()
      .then(data => setProjects(data))
      .catch(() => setError('Erreur lors du chargement des projets'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Projets</h1>
      {loading && <div>Chargement...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && projects.length === 0 && (
        <div className="text-gray-500">Aucun projet à afficher.</div>
      )}
      <div className="flex flex-wrap justify-center">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </Layout>
  );
};

export default Projects;
