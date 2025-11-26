import { Table } from 'react-bootstrap';
import { LABELS } from '../../constants';

const SortIcon = ({ direction, isActive }) => {
  const baseStyle = {
    marginLeft: '8px',
    fontSize: '12px',
    opacity: isActive ? 1 : 0.5,
  };

  if (!direction) {
    return <span style={baseStyle}>↑↓</span>;
  }
  return direction === 'asc' ? (
    <span style={{ ...baseStyle, color: '#90EE90' }}>↑</span>
  ) : (
    <span style={{ ...baseStyle, color: '#FFB6C1' }}>↓</span>
  );
};

// Anchos mínimos para cada columna
const COLUMN_WIDTHS = {
  file: '150px',
  text: '200px',
  number: '120px',
  hex: '300px',
};

const SortableHeader = ({ label, column, sortConfig, onSort }) => {
  const isActive = sortConfig?.column === column;
  const direction = isActive ? sortConfig.direction : null;

  return (
    <th
      onClick={() => onSort(column)}
      style={{
        cursor: 'pointer',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        minWidth: COLUMN_WIDTHS[column] || '100px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>{label}</span>
        <SortIcon direction={direction} isActive={isActive} />
      </div>
    </th>
  );
};

const EmptyTable = ({
  message,
  sortConfig,
  onSort,
  hasFilter,
  onViewErrors,
  isError,
}) => (
  <Table bordered hover responsive>
    <thead className="table-dark">
      <tr>
        <SortableHeader
          label={LABELS.TABLE_HEADER_FILE}
          column="file"
          sortConfig={sortConfig}
          onSort={onSort}
        />
        <SortableHeader
          label={LABELS.TABLE_HEADER_TEXT}
          column="text"
          sortConfig={sortConfig}
          onSort={onSort}
        />
        <SortableHeader
          label={LABELS.TABLE_HEADER_NUMBER}
          column="number"
          sortConfig={sortConfig}
          onSort={onSort}
        />
        <SortableHeader
          label={LABELS.TABLE_HEADER_HEX}
          column="hex"
          sortConfig={sortConfig}
          onSort={onSort}
        />
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colSpan="4" className="text-center py-4">
          <div className={isError ? 'text-danger mb-2' : 'text-muted mb-2'}>
            {isError && '❌ '}
            {message}
          </div>
          {hasFilter && onViewErrors && (
            <button
              onClick={onViewErrors}
              className="btn btn-outline-primary btn-sm"
              type="button"
            >
              🔍 {LABELS.TABLE_VIEW_ERRORS}
            </button>
          )}
        </td>
      </tr>
    </tbody>
  </Table>
);

const FilesTableView = ({
  data,
  sortConfig,
  onSort,
  hasFilter,
  searchError,
  onViewErrors,
}) => {
  // Si hay error de búsqueda (archivo no existe)
  if (searchError) {
    return (
      <EmptyTable
        message={searchError}
        sortConfig={sortConfig}
        onSort={onSort}
        hasFilter={false}
        onViewErrors={null}
        isError={true}
      />
    );
  }

  if (!data || data.length === 0) {
    const message = hasFilter ? LABELS.TABLE_FILE_EMPTY : LABELS.TABLE_EMPTY;
    return (
      <EmptyTable
        message={message}
        sortConfig={sortConfig}
        onSort={onSort}
        hasFilter={hasFilter}
        onViewErrors={onViewErrors}
      />
    );
  }

  return (
    <Table striped bordered hover responsive>
      <thead className="table-dark">
        <tr>
          <SortableHeader
            label={LABELS.TABLE_HEADER_FILE}
            column="file"
            sortConfig={sortConfig}
            onSort={onSort}
          />
          <SortableHeader
            label={LABELS.TABLE_HEADER_TEXT}
            column="text"
            sortConfig={sortConfig}
            onSort={onSort}
          />
          <SortableHeader
            label={LABELS.TABLE_HEADER_NUMBER}
            column="number"
            sortConfig={sortConfig}
            onSort={onSort}
          />
          <SortableHeader
            label={LABELS.TABLE_HEADER_HEX}
            column="hex"
            sortConfig={sortConfig}
            onSort={onSort}
          />
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={`${row.file}-${index}`}>
            <td>{row.file || '-'}</td>
            <td>{row.text || '-'}</td>
            <td>{row.number != null ? row.number.toLocaleString() : '-'}</td>
            <td className="font-monospace text-muted">{row.hex || '-'}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default FilesTableView;
