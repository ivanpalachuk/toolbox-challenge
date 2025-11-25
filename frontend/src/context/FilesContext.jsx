import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LABELS, API_CONFIG } from '../constants';
import { useApi } from '../hooks';

const FilesContext = createContext();

export const useFiles = () => {
  const context = useContext(FilesContext);
  if (!context) {
    throw new Error(LABELS.ERROR_CONTEXT);
  }
  return context;
};

export const FilesProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filesList, setFilesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [selectedFile, setSelectedFile] = useState('');
  const [viewMode, setViewMode] = useState('withData');

  const { ENDPOINTS } = API_CONFIG;
  const api = useApi();

  // Obtener lista de archivos disponibles
  const fetchFilesList = useCallback(async () => {
    const { data: result } = await api.get(ENDPOINTS.FILES_LIST);
    if (result?.files) {
      setFilesList(result.files);
    }
  }, [api, ENDPOINTS.FILES_LIST]);

  // Obtener datos de archivos (todos o filtrados)
  const fetchData = useCallback(async (fileName = '') => {
    setLoading(true);
    setError(null);
    setSearchError(null);

    const params = fileName ? { fileName } : {};
    const { data: result, error: apiError, status } = await api.get(ENDPOINTS.FILES_DATA, { params });

    if (status === 404) {
      setSearchError(apiError || LABELS.ERROR_FILE_NOT_FOUND);
      setData([]);
    } else if (apiError) {
      setError(LABELS.ERROR_LOADING_DATA);
    } else {
      setData(result || []);
    }

    setLoading(false);
  }, [api, ENDPOINTS.FILES_DATA]);

  // Cargar datos iniciales
  useEffect(() => {
    fetchFilesList();
    fetchData();
  }, []);

  // Recargar datos cuando cambia el filtro
  useEffect(() => {
    if (!loading) {
      fetchData(selectedFile);
    }
  }, [selectedFile]);

  const value = {
    data,
    filesList,
    loading,
    error,
    searchError,
    selectedFile,
    setSelectedFile,
    viewMode,
    setViewMode,
    refreshData: () => fetchData(selectedFile),
    clearFilter: () => setSelectedFile(''),
  };

  return (
    <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
  );
};
