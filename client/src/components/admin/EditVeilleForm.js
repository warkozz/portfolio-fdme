import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost/portfolio-fdme/server/api';

const EditVeilleForm = ({ veille, onUpdated, onCancel }) => {
  const [title, setTitle] = useState(veille.title);
  const [content, setContent] = useState(veille.content);
  const [url, setUrl] = useState(veille.url || '');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const csrfRes = await axios.get(`${API_URL}/get_csrf.php`, { withCredentials: true });
      const csrf_token = csrfRes.data.csrf_token;
      await axios.post(`${API_URL}/update_veille.php`,
        { id: veille.id, title, content, url, csrf_token },
        { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      if (onUpdated) onUpdated();
    } catch {
      setError("Erreur lors de la modification");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-2 flex flex-col gap-2">
      <input value={title} onChange={e => setTitle(e.target.value)} className="border p-2" required />
      <textarea value={content} onChange={e => setContent(e.target.value)} className="border p-2" required />
      <input value={url} onChange={e => setUrl(e.target.value)} className="border p-2" />
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Enregistrer</button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white p-2 rounded">Annuler</button>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </form>
  );
};

export default EditVeilleForm;
