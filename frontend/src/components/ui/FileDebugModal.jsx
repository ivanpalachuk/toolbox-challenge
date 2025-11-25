import { useState, useEffect } from 'react';
import { Modal, Button, Spinner, Alert, Table, Badge } from 'react-bootstrap';
import { LABELS, API_CONFIG } from '../../constants';
import { useApi } from '../../hooks';

const { ENDPOINTS } = API_CONFIG;

const FileDebugModal = ({ show, onHide, fileName }) => {
  const [debugData, setDebugData] = useState(null);
  const api = useApi();

  useEffect(() => {
    if (show && fileName) {
      fetchDebugData();
    }
  }, [show, fileName]);

  const fetchDebugData = async () => {
    const { data, error } = await api.get(`${ENDPOINTS.FILES_DEBUG}/${fileName}`);
    if (error) {
      console.error('Error fetching debug data:', error);
    } else {
      setDebugData(data);
    }
  };

  const handleClose = () => {
    setDebugData(null);
    api.clearError();
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {LABELS.DEBUG_MODAL_TITLE}: <code>{fileName}</code>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        {api.loading && (
          <div className="text-center py-4">
            <Spinner animation="border" style={{ color: 'rgb(150, 47, 58)' }} />
            <p className="mt-2 text-muted">{LABELS.DEBUG_MODAL_LOADING}</p>
          </div>
        )}

        {api.error && <Alert variant="danger">{LABELS.DEBUG_MODAL_ERROR}</Alert>}

        {debugData && !api.loading && (
          <>
            {/* Resumen */}
            <div className="d-flex gap-3 mb-4">
              <Badge bg="secondary" className="p-2">
                {LABELS.DEBUG_TOTAL_LINES}: {debugData.totalLines}
              </Badge>
              <Badge bg="success" className="p-2">
                {LABELS.DEBUG_VALID_LINES}: {debugData.validCount}
              </Badge>
              <Badge bg="danger" className="p-2">
                {LABELS.DEBUG_INVALID_LINES}: {debugData.invalidCount}
              </Badge>
            </div>

            {/* Header del archivo */}
            {debugData.header && (
              <div className="mb-3">
                <strong>Header:</strong>
                <code className="d-block bg-light p-2 rounded mt-1">
                  {debugData.header}
                </code>
              </div>
            )}

            {/* Líneas inválidas */}
            {debugData.invalidLines && debugData.invalidLines.length > 0 ? (
              <>
                <h6 className="text-danger mt-4 mb-3">
                  ⚠️ {LABELS.DEBUG_INVALID_LINES} ({debugData.invalidCount})
                </h6>
                <Table bordered size="sm" className="small">
                  <thead className="table-danger">
                    <tr>
                      <th style={{ width: '60px' }}>
                        {LABELS.DEBUG_LINE_NUMBER}
                      </th>
                      <th>{LABELS.DEBUG_CONTENT}</th>
                      <th>{LABELS.DEBUG_ERRORS}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {debugData.invalidLines.map((line, index) => (
                      <tr key={index}>
                        <td className="text-center">{line.lineNumber}</td>
                        <td>
                          <code className="text-break">
                            {line.content || '(vacío)'}
                          </code>
                        </td>
                        <td>
                          <ul className="mb-0 ps-3">
                            {line.errors.map((err, errIndex) => (
                              <li key={errIndex} className="text-danger">
                                {err}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            ) : (
              <Alert variant="info" className="mt-3">
                El archivo está vacío o no tiene contenido procesable.
              </Alert>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {LABELS.DEBUG_MODAL_CLOSE}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FileDebugModal;
