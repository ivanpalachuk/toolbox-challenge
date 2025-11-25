import { Table, Button } from 'react-bootstrap';
import { LABELS } from '../../constants';

const AllFilesTableView = ({ files, onViewDetails }) => {
  if (!files || files.length === 0) {
    return (
      <Table bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th style={{ minWidth: '200px' }}>{LABELS.TABLE_HEADER_FILE}</th>
            <th style={{ minWidth: '150px' }}>{LABELS.TABLE_HEADER_STATUS}</th>
            <th style={{ minWidth: '100px' }}>{LABELS.TABLE_HEADER_DETAIL}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="3" className="text-center py-4 text-muted">
              {LABELS.TABLE_EMPTY}
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }

  return (
    <Table striped bordered hover responsive>
      <thead className="table-dark">
        <tr>
          <th style={{ minWidth: '200px' }}>{LABELS.TABLE_HEADER_FILE}</th>
          <th style={{ minWidth: '150px' }}>{LABELS.TABLE_HEADER_STATUS}</th>
          <th style={{ minWidth: '100px' }}>{LABELS.TABLE_HEADER_DETAIL}</th>
        </tr>
      </thead>
      <tbody>
        {files.map(file => {
          const hasError = !file.hasData;
          return (
            <tr key={file.name}>
              <td>{file.name}</td>
              <td>
                {hasError ? (
                  <span className="text-danger">
                    {LABELS.TABLE_STATUS_ERROR}
                  </span>
                ) : (
                  <span className="text-success">
                    {LABELS.TABLE_STATUS_OK} ({file.linesCount}{' '}
                    {LABELS.TABLE_LINES_COUNT})
                  </span>
                )}
              </td>
              <td className="text-center">
                {hasError && (
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => onViewDetails(file.name)}
                  >
                    🔍 {LABELS.TABLE_VIEW_ERRORS}
                  </Button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default AllFilesTableView;
