import React, { useState } from 'react';
import axios from 'axios';
import Button from '../Button';

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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);
    
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
      
      setTitle(''); 
      setDescription(''); 
      setGithubLink(''); 
      setCompetencies(''); 
      setCategory('perso'); 
      setImage(null);
      setSuccess(true);
      
      if (onAdded) onAdded();
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'ajout du projet');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Ajouter un nouveau projet
      </h3>

      <div>
        <label className={labelClass}>
          Titre <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Ex: Portfolio personnel"
          className={inputClass}
          required
        />
      </div>

      <div>
        <label className={labelClass}>
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Décrivez votre projet en quelques lignes..."
          className={`${inputClass} min-h-[100px] resize-y`}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            Lien GitHub
          </label>
          <input
            type="url"
            value={github_link}
            onChange={e => setGithubLink(e.target.value)}
            placeholder="https://github.com/..."
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
            <option value="perso">Projet personnel</option>
            <option value="ecole">École / Formation</option>
            <option value="pro">Professionnel</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>
          Compétences
        </label>
        <input
          type="text"
          value={competencies}
          onChange={e => setCompetencies(e.target.value)}
          placeholder="React, Node.js, MongoDB (séparées par virgule)"
          className={inputClass}
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Séparez les compétences par des virgules
        </p>
      </div>

      <div>
        <label className={labelClass}>
          Image du projet
        </label>
        <div className="mt-1 flex items-center gap-4">
          <label className="flex-1 cursor-pointer">
            <div className="px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-600 dark:hover:border-primary-400 transition-colors text-center">
              <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {image ? image.name : 'Cliquez pour sélectionner une image'}
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={e => setImage(e.target.files[0])}
              className="hidden"
            />
          </label>
          {image && (
            <button
              type="button"
              onClick={() => setImage(null)}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Retirer
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
          <p className="text-sm text-red-800 dark:text-red-400">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
          <p className="text-sm text-green-800 dark:text-green-400">✓ Projet ajouté avec succès !</p>
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
              Ajouter le projet
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default AddProjectForm;
