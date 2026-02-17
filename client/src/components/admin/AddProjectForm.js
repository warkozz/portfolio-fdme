import React, { useState } from 'react';
import axios from 'axios';

const API_URL = '/portfolio-fdme/server/api';

const AddProjectForm = ({ onAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [github_link, setGithubLink] = useState('');
  const [competencies, setCompetencies] = useState('');
  const [category, setCategory] = useState('perso');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      const csrfRes = await axios.get(`${API_URL}/get_csrf.php`, { withCredentials: true });
      const csrf_token = csrfRes.data.csrf_token;
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('github_link', github_link);
      formData.append('competencies', competencies);
      formData.append('category', category);
      if (image) formData.append('image', image);
      formData.append('csrf_token', csrf_token);
      await axios.post(`${API_URL}/add_project.php`, formData, { withCredentials: true });
      setTitle(''); setDescription(''); setGithubLink(''); setCompetencies(''); setCategory('perso'); setImage(null);
      setSuccess(true);
      if (onAdded) onAdded();
    } catch (err) {
      setError('Erreur lors de l\'ajout');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2" encType="multipart/form-data">
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre" className="border p-2" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="border p-2" required />
      <input value={github_link} onChange={e => setGithubLink(e.target.value)} placeholder="Lien GitHub (optionnel)" className="border p-2" />
      <input value={competencies} onChange={e => setCompetencies(e.target.value)} placeholder="Compétences (séparées par virgule)" className="border p-2" />
      <select value={category} onChange={e => setCategory(e.target.value)} className="border p-2">
        <option value="perso">Projet personnel</option>
        <option value="ecole">École / Formation</option>
        <option value="pro">Professionnel</option>
      </select>
      <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} className="border p-2" />
      <button type="submit" className="bg-green-600 text-white p-2 rounded">Ajouter</button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">Ajouté !</div>}
    </form>
  );
};

export default AddProjectForm;
