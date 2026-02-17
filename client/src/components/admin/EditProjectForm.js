import React, { useState } from 'react';
import axios from 'axios';

const API_URL = '/portfolio-fdme/server/api';

const EditProjectForm = ({ project, onUpdated, onCancel }) => {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [github_link, setGithubLink] = useState(project.github_link || '');
  const [competencies, setCompetencies] = useState(project.competencies || '');
  const [category, setCategory] = useState(project.category || 'perso');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const csrfRes = await axios.get(`${API_URL}/get_csrf.php`, { withCredentials: true });
      const csrf_token = csrfRes.data.csrf_token;
      const formData = new FormData();
      formData.append('id', project.id);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('github_link', github_link);
      formData.append('competencies', competencies);
      formData.append('category', category);
      formData.append('current_image', project.image || '');
      if (image) formData.append('image', image);
      formData.append('csrf_token', csrf_token);
      await axios.post(`${API_URL}/update_project.php`, formData, { withCredentials: true });
      if (onUpdated) onUpdated();
    } catch {
      setError("Erreur lors de la modification");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-2 flex flex-col gap-2">
      <input value={title} onChange={e => setTitle(e.target.value)} className="border p-2" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} className="border p-2" required />
      <input value={github_link} onChange={e => setGithubLink(e.target.value)} className="border p-2" />
      <input value={competencies} onChange={e => setCompetencies(e.target.value)} className="border p-2" />
      <select value={category} onChange={e => setCategory(e.target.value)} className="border p-2">
        <option value="perso">Projet personnel</option>
        <option value="ecole">École / Formation</option>
        <option value="pro">Professionnel</option>
      </select>
      <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} className="border p-2" />
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Enregistrer</button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white p-2 rounded">Annuler</button>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </form>
  );
};

export default EditProjectForm;
