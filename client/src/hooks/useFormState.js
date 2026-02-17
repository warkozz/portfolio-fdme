import { useState } from 'react';

/**
 * Hook pour gérer l'état d'un formulaire
 * Gère loading, error, success et reset
 */
export const useFormState = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const startSubmit = () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
  };

  const submitSuccess = () => {
    setLoading(false);
    setSuccess(true);
    setError(null);
  };

  const submitError = (errorMessage) => {
    setLoading(false);
    setError(errorMessage);
    setSuccess(false);
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  };

  return {
    loading,
    error,
    success,
    startSubmit,
    submitSuccess,
    submitError,
    reset
  };
};
