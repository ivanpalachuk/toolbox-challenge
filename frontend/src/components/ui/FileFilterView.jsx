import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { LABELS } from '../../constants';

const FileFilterView = ({
  searchTerm,
  selectedFile,
  filesList,
  viewMode,
  onSearchChange,
  onSelectChange,
  onViewModeChange,
  onClearFilter,
  isClearDisabled,
}) => (
  <div className="mb-4 p-3 bg-light rounded">
    <Row className="align-items-end g-3">
      {/* Selector de modo de vista */}
      <Col md={3}>
        <Form.Group>
          <Form.Label>{LABELS.VIEW_MODE_LABEL}</Form.Label>
          <Form.Select value={viewMode} onChange={onViewModeChange}>
            <option value="withData">{LABELS.VIEW_MODE_WITH_DATA}</option>
            <option value="all">{LABELS.VIEW_MODE_ALL}</option>
          </Form.Select>
        </Form.Group>
      </Col>

      {/* Campo de búsqueda */}
      <Col md={3}>
        <Form.Group>
          <Form.Label>{LABELS.FILTER_SEARCH_LABEL}</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              value={searchTerm}
              onChange={onSearchChange}
              placeholder={LABELS.FILTER_SEARCH_PLACEHOLDER}
            />
          </InputGroup>
        </Form.Group>
      </Col>

      {/* Selector dropdown */}
      <Col md={4}>
        <Form.Group>
          <Form.Label>{LABELS.FILTER_LABEL}</Form.Label>
          <Form.Select
            value={selectedFile}
            onChange={onSelectChange}
            aria-label={LABELS.FILTER_ARIA_LABEL}
          >
            <option value="">{LABELS.FILTER_PLACEHOLDER}</option>
            {filesList.map(file => (
              <option key={file} value={file}>
                {file}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>

      {/* Botón limpiar */}
      <Col md={2}>
        <Button
          variant="secondary"
          onClick={onClearFilter}
          disabled={isClearDisabled}
          className="w-100"
        >
          {LABELS.FILTER_CLEAR_BUTTON}
        </Button>
      </Col>
    </Row>
  </div>
);

export default FileFilterView;
