import React from 'react';

const ProjectCard = ({ project }) => (
  <div className="bg-white rounded shadow p-4 m-2 max-w-md">
    {project.image && (
      <img src={`http://localhost/portfolio-fdme/server/upload/${project.image}`} alt={project.title} className="w-full h-48 object-cover rounded mb-2" />
    )}
    <h3 className="text-xl font-bold mb-1">{project.title}</h3>
    <p className="mb-2">{project.description}</p>
    {project.github_link && (
      <a href={project.github_link} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Voir sur GitHub</a>
    )}
    {project.competencies && (
      <div className="mt-2 text-sm text-gray-600">{project.competencies}</div>
    )}
  </div>
);

export default ProjectCard;
