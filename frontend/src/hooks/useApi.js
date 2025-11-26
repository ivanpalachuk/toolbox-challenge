import { useState, useCallback } from 'react';
import { API_CONFIG } from '../constants';

/**
 * Hook personalizado para manejar llamadas a la API
 * Centraliza la lógica de fetch, loading y manejo de errores
 */
const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { BASE_URL } = API_CONFIG;

  /**
   * Realiza una petición GET a la API
   * @param {string} endpoint - Endpoint de la API (ej: '/files/data')
   * @param {Object} options - Opciones adicionales
   * @param {Object} options.params - Query params para agregar a la URL
   * @param {boolean} options.throwOnError - Si true, lanza error en lugar de setear estado
   * @returns {Promise<{data: any, error: string|null}>}
   */
  const get = useCallback(async (endpoint, options = {}) => {
    const { params = {}, throwOnError = false } = options;
    
    setLoading(true);
    setError(null);

    try {
      // Construir URL con query params
      let url;
      const fullUrl = `${BASE_URL}${endpoint}`;
      
      // Si BASE_URL es relativa (empieza con /), construir URL manualmente
      if (BASE_URL.startsWith('/')) {
        url = new URL(fullUrl, window.location.origin);
      } else {
        url = new URL(fullUrl);
      }
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          url.searchParams.append(key, value);
        }
      });

      const response = await fetch(url.toString());

      // Manejar errores HTTP
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Error ${response.status}`;
        
        if (throwOnError) {
          throw new Error(errorMessage);
        }
        
        setError(errorMessage);
        return { data: null, error: errorMessage, status: response.status };
      }

      const data = await response.json();
      return { data, error: null, status: response.status };

    } catch (err) {
      const errorMessage = err.message || 'Error de conexión';
      
      if (throwOnError) {
        throw err;
      }
      
      setError(errorMessage);
      return { data: null, error: errorMessage, status: null };

    } finally {
      setLoading(false);
    }
  }, [BASE_URL]);

  /**
   * Limpia el estado de error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    get,
    clearError,
  };
};

export default useApi;
