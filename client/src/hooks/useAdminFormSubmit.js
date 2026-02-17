import { useState } from 'react';
import axios from 'axios';
import { useCSRF } from './useCSRF';
import { useFormState } from './useFormState';
import { API_URL } from '../utils/constants';

/**
 * Hook pour gérer la soumission d'un formulaire admin
 * Gère automatiquement CSRF, loading, error, success
 * 
 * @param {string} endpoint - Endpoint de l'API (ex: 'add_project.php')
 * @param {Function} onSuccess - Callback appelé en cas de succès
 * @param {boolean} useFormData - Si true, utilise FormData, sinon URLSearchParams
 */
export const useAdminFormSubmit = (endpoint, onSuccess, useFormData = false) => {
  const getCSRF = useCSRF();
  const formState = useFormState();

  const submit = async (data) => {
    formState.startSubmit();

    try {
      const csrf_token = await getCSRF();
      
      // Créer le body selon le format
      let body;
      if (useFormData) {
        body = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            body.append(key, value);
          }
        });
        body.append('csrf_token', csrf_token);
      } else {
        body = new URLSearchParams();
        Object.entries(data).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            body.append(key, String(value));
          }
        });
        body.append('csrf_token', csrf_token);
      }

      // Envoyer la requête
      const config = {
        withCredentials: true
      };
      
      if (!useFormData) {
        config.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
      }

      await axios.post(`${API_URL}/${endpoint}`, body, config);
      
      formState.submitSuccess();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Erreur lors de la soumission';
      formState.submitError(errorMessage);
    }
  };

  return {
    submit,
    ...formState
  };
};
