import { useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/constants';

/**
 * Hook pour obtenir un token CSRF
 * Utilisé dans tous les formulaires et actions admin
 */
export const useCSRF = () => {
  const getToken = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/get_csrf.php`, { withCredentials: true });
      return res.data.csrf_token;
    } catch (error) {
      throw new Error('Erreur lors de la récupération du token CSRF');
    }
  }, []);

  return getToken;
};
