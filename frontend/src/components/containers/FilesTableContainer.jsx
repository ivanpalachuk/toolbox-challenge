import { useState, useMemo, lazy, Suspense } from 'react';
import { useFiles } from '../../context/FilesContext';
import { FilesTableView, AllFilesTableView } from '../ui';

// Lazy load del modal de debug
const FileDebugModal = lazy(() => import('../ui/FileDebugModal'));

const FilesTableContainer = () => {
  const { data, filesList, selectedFile, viewMode, searchError } = useFiles();
  const [sortConfig, setSortConfig] = useState({
    column: null,
    direction: null,
  });
  const [showDebugModal, setShowDebugModal] = useState(false);
  const [debugFileName, setDebugFileName] = useState(null);

  // Aplanar los datos para ordenamiento (file + lines -> filas individuales)
  const flattenedData = useMemo(() => {
    if (!data) return [];
    return data.flatMap(file =>
      file.lines.map(line => ({
        file: file.file,
        text: line.text,
        number: line.number,
        hex: line.hex,
      }))
    );
  }, [data]);

  // Crear lista de todos los archivos con su estado
  const allFilesWithStatus = useMemo(() => {
    if (!filesList) return [];

    return filesList.map(fileName => {
      const fileData = data?.find(f => f.file === fileName);
      return {
        name: fileName,
        hasData: fileData && fileData.lines && fileData.lines.length > 0,
        linesCount: fileData?.lines?.length || 0,
      };
    });
  }, [filesList, data]);

  // Ordenar los datos según la configuración
  const sortedData = useMemo(() => {
    if (!sortConfig.column || !sortConfig.direction) {
      return flattenedData;
    }

    return [...flattenedData].sort((a, b) => {
      const aValue = a[sortConfig.column];
      const bValue = b[sortConfig.column];

      // Ordenamiento numérico para la columna number
      if (sortConfig.column === 'number') {
        return sortConfig.direction === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }

      // Ordenamiento alfabético para el resto
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();

      if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [flattenedData, sortConfig]);

  // Manejar click en header para ordenar
  const handleSort = column => {
    setSortConfig(prev => {
      if (prev.column === column) {
        if (prev.direction === 'asc') return { column, direction: 'desc' };
        if (prev.direction === 'desc') return { column: null, direction: null };
      }
      return { column, direction: 'asc' };
    });
  };

  const handleViewErrors = (fileName = selectedFile) => {
    setDebugFileName(fileName);
    setShowDebugModal(true);
  };

  const handleCloseDebugModal = () => {
    setShowDebugModal(false);
    setDebugFileName(null);
  };

  // Renderizar según el modo de vista
  if (viewMode === 'all') {
    return (
      <>
        <AllFilesTableView
          files={allFilesWithStatus}
          onViewDetails={handleViewErrors}
        />

        {showDebugModal && (
          <Suspense fallback={null}>
            <FileDebugModal
              show={showDebugModal}
              onHide={handleCloseDebugModal}
              fileName={debugFileName}
            />
          </Suspense>
        )}
      </>
    );
  }

  return (
    <>
      <FilesTableView
        data={sortedData}
        sortConfig={sortConfig}
        onSort={handleSort}
        hasFilter={!!selectedFile}
        searchError={searchError}
        onViewErrors={() => handleViewErrors(selectedFile)}
      />

      {showDebugModal && (
        <Suspense fallback={null}>
          <FileDebugModal
            show={showDebugModal}
            onHide={handleCloseDebugModal}
            fileName={debugFileName}
          />
        </Suspense>
      )}
    </>
  );
};

export default FilesTableContainer;
