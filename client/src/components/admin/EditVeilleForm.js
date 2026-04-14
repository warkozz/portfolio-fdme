import React, { useState } from 'react';
import axios from 'axios';
import Button from '../Button';

const API_URL = '/portfolio-fdme/server/api';

const EditVeilleForm = ({ veille, onUpdated, onCancel }) => {
  const [title, setTitle] = useState(veille.title);
  const [content, setContent] = useState(veille.content);
  const [analysis, setAnalysis] = useState(veille.analysis || '');
  const [url, setUrl] = useState(veille.url || '');
  const [category, setCategory] = useState(veille.category || 'automatique');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const csrfRes = await axios.get(`${API_URL}/get_csrf.php`, { withCredentials: true });
      const csrf_token = csrfRes.data.csrf_token;
      const body = new URLSearchParams();
      body.append('id', String(veille.id));
      body.append('title', title);
      body.append('content', content);
      body.append('analysis', analysis);
      body.append('url', url);
      body.append('category', category);
      body.append('csrf_token', csrf_token);
      
      await axios.post(`${API_URL}/update_veille.php`, body, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      
      if (onUpdated) onUpdated();
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la modification");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Modifier l'article de veille
      </h3>

      <div>
        <label className={labelClass}>
          Titre <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
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
          className={`${inputClass} min-h-[120px] resize-y`}
          required
        />
      </div>

      <div>
        <label className={labelClass}>
          Analyse personnelle & lien avec mes projets
        </label>
        <textarea
          value={analysis}
          onChange={e => setAnalysis(e.target.value)}
          placeholder="Avantages / limites observés, lien direct avec un projet, votre avis..."
          className={`${inputClass} min-h-[120px] resize-y`}
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

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enregistrement...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Enregistrer
            </>
          )}
        </Button>
        <Button type="button" onClick={onCancel} variant="ghost">
          Annuler
        </Button>
      </div>
    </form>
  );
};

export default EditVeilleForm;
