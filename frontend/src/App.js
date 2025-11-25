import React from 'react';
import { Container, Alert, Spinner } from 'react-bootstrap';
import { FilesProvider, useFiles } from './context/FilesContext';
import { Header, Footer } from './components/ui';
import { FileFilterContainer, FilesTableContainer } from './components/containers';

const AppContent = () => {
  const { data, loading, error } = useFiles();

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner 
          animation="border" 
          role="status" 
          style={{ color: 'rgb(150, 47, 58)' }}
        >
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <p className="mt-3 text-muted">Cargando datos...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <FileFilterContainer />
      <FilesTableContainer />
    </Container>
  );
};

function App() {
  return (
    <FilesProvider>
      <div className="min-vh-100 bg-light d-flex flex-column">
        <Header />
        <AppContent />
        <Footer />
      </div>
    </FilesProvider>
  );
}

export default App;
