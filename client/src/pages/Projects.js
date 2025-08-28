import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/server/api/get_projects.php')
      .then(res => {
        setProjects(res.data.projects || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <h1 className="text-4xl font-extrabold mb-8">Mes Projets</h1>
      {loading ? (
        <div className="text-center text-gray-500">Chargement...</div>
      ) : projects.length === 0 ? (
        <div className="text-center text-gray-500">Aucun projet disponible.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map(project => (
            <div key={project.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col">
              <div className="mb-4">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-32 object-cover rounded-lg" />
                ) : (
                  <div className="w-full h-32 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg width="64" height="64" fill="none" viewBox="0 0 24 24">
                      <rect width="24" height="24" rx="6" fill="#6366F1" />
                      <path d="M7 8h10v8H7V8z" fill="#fff" />
                    </svg>
                  </div>
                )}
              </div>
              <h2 className="font-bold text-xl mb-2">{project.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.competencies && project.competencies.split(',').map((tech, idx) => (
                  <span key={idx} className="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded">{tech.trim()}</span>
                ))}
              </div>
              {project.github_link && (
                <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm mt-auto">
                  Voir sur GitHub
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Projects;