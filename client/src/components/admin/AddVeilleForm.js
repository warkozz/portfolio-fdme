import React, { useState } from 'react';
import axios from 'axios';

const API_URL = '/portfolio-fdme/server/api';

const AddVeilleForm = ({ onAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('automatique');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      const csrfRes = await axios.get(`${API_URL}/get_csrf.php`, { withCredentials: true });
      const csrf_token = csrfRes.data.csrf_token;
      const body = new URLSearchParams();
      body.append('title', title);
      body.append('content', content);
      body.append('url', url);
      body.append('category', category);
      body.append('csrf_token', csrf_token);
      await axios.post(`${API_URL}/add_veille.php`, body, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      setTitle(''); setContent(''); setUrl(''); setCategory('automatique');
      setSuccess(true);
      if (onAdded) onAdded();
    } catch {
      setError('Erreur lors de l\'ajout');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre" className="border p-2" required />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Contenu" className="border p-2" required />
      <input value={url} onChange={e => setUrl(e.target.value)} placeholder="URL (optionnel)" className="border p-2" />
      <select value={category} onChange={e => setCategory(e.target.value)} className="border p-2">
        <option value="automatique">Veille automatique</option>
        <option value="forum">Forums et communautés</option>
      </select>
      <button type="submit" className="bg-green-600 text-white p-2 rounded">Ajouter</button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">Ajouté !</div>}
    </form>
  );
};

export default AddVeilleForm;
