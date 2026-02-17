import React, { useState } from 'react';
import axios from 'axios';
import Button from '../Button';

const API_URL = '/portfolio-fdme/server/api';

const AddVeilleForm = ({ onAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('automatique');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);
    
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
      
      setTitle(''); 
      setContent(''); 
      setUrl(''); 
      setCategory('automatique');
      setSuccess(true);
      
      if (onAdded) onAdded();
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'ajout de l\'article');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Ajouter un nouvel article de veille
      </h3>

      <div>
        <label className={labelClass}>
          Titre <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Ex: Les nouveautés de React 19"
          className={inputClass}
          required
        />
      </div>

      <div>
        <label className={labelClass}>
          Contenu <span className="text-red-500">*</span>
        </label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Décrivez le contenu de votre veille..."
          className={`${inputClass} min-h-[120px] resize-y`}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            URL de l'article
          </label>
          <input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Catégorie <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className={inputClass}
          >
            <option value="automatique">Veille automatique</option>
            <option value="forum">Forums et communautés</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
          <p className="text-sm text-red-800 dark:text-red-400">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
          <p className="text-sm text-green-800 dark:text-green-400">✓ Article ajouté avec succès !</p>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Ajout en cours...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Ajouter l'article
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default AddVeilleForm;
