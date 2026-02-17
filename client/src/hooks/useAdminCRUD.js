import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/constants';

/**
 * Hook personnalisé pour gérer les opérations CRUD admin
 * @param {string} entityType - Type d'entité ('projects' ou 'veille')
 * @param {string} tableName - Nom de la table pour toggle_visibility ('projects' ou 'veille')
 */
export const useAdminCRUD = (entityType, tableName) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint = entityType === 'projects' ? 'get_all_projects.php' : 'get_all_veille.php';
      const res = await axios.get(`${API_URL}/${endpoint}`, { withCredentials: true });
      setItems(res.data);
      setError(null);
    } catch (err) {
      setError(`Erreur lors du chargement des ${entityType === 'projects' ? 'projets' : 'articles'}`);
    } finally {
      setLoading(false);
    }
  }, [entityType]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleDelete = useCallback(async (id) => {
    const confirmMessage = entityType === 'projects' 
      ? 'Êtes-vous sûr de vouloir supprimer ce projet ?' 
      : 'Êtes-vous sûr de vouloir supprimer cet article ?';
    
    if (!window.confirm(confirmMessage)) return;

    try {
      const csrfRes = await axios.get(`${API_URL}/get_csrf.php`, { withCredentials: true });
      const csrf_token = csrfRes.data.csrf_token;

      const body = new URLSearchParams();
      body.append('id', String(id));
      body.append('csrf_token', csrf_token);

      const endpoint = entityType === 'projects' ? 'delete_project.php' : 'delete_veille.php';
      await axios.post(
        `${API_URL}/${endpoint}`,
        body,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
      );

      fetchAll();
    } catch (error) {
      alert("Erreur lors de la suppression: " + (error.response?.data?.message || error.message));
    }
  }, [entityType, fetchAll]);

  const handleToggleVisibility = useCallback(async (id, visible) => {
    try {
      const csrfRes = await axios.get(`${API_URL}/get_csrf.php`, { withCredentials: true });
      const csrf_token = csrfRes.data.csrf_token;

      const body = new URLSearchParams();
      body.append('id', String(id));
      body.append('visible', String(visible ? 0 : 1));
      body.append('table', tableName);
      body.append('csrf_token', csrf_token);

      await axios.post(
        `${API_URL}/toggle_visibility.php`,
        body,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
      );

      fetchAll();
    } catch (err) {
      alert("Erreur lors du basculement de visibilité: " + (err.response?.data?.message || err.message));
    }
  }, [tableName, fetchAll]);

  return {
    items,
    loading,
    error,
    fetchAll,
    handleDelete,
    handleToggleVisibility
  };
};
