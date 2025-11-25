import { useState, useEffect } from 'react';
import { useFiles } from '../../context/FilesContext';
import { useDebounce } from '../../hooks/useDebounce';
import { FileFilterView } from '../ui';

const DEBOUNCE_DELAY = 800;

const FileFilterContainer = () => {
  const {
    filesList,
    selectedFile,
    setSelectedFile,
    viewMode,
    setViewMode,
    clearFilter,
  } = useFiles();
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const matchedFile = filesList.find(file =>
        file.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setSelectedFile(matchedFile || debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, filesList, setSelectedFile]);

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleSelectChange = e => {
    setSelectedFile(e.target.value);
    setSearchTerm('');
  };

  const handleViewModeChange = e => {
    setViewMode(e.target.value);
    // Limpiar el filtro al cambiar de modo
    clearFilter();
    setSearchTerm('');
  };

  const handleClearFilter = () => {
    clearFilter();
    setSearchTerm('');
  };

  return (
    <FileFilterView
      searchTerm={searchTerm}
      selectedFile={selectedFile}
      filesList={filesList}
      viewMode={viewMode}
      onSearchChange={handleSearchChange}
      onSelectChange={handleSelectChange}
      onViewModeChange={handleViewModeChange}
      onClearFilter={handleClearFilter}
      isClearDisabled={!selectedFile && !searchTerm}
    />
  );
};

export default FileFilterContainer;
