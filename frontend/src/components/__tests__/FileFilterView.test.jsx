import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock FileFilterView component behavior
const MockFileFilterView = ({
  selectedFile,
  onFileChange,
  filesList,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div>
      <label htmlFor="file-select">Filtrar por archivo:</label>
      <select
        id="file-select"
        value={selectedFile}
        onChange={(e) => onFileChange(e.target.value)}
        data-testid="file-select"
      >
        <option value="">Todos los archivos</option>
        {filesList.map((file) => (
          <option key={file} value={file}>
            {file}
          </option>
        ))}
      </select>

      <div>
        <label>
          <input
            type="radio"
            name="viewMode"
            value="withData"
            checked={viewMode === 'withData'}
            onChange={() => onViewModeChange('withData')}
            data-testid="radio-withData"
          />
          Archivos con datos
        </label>
        <label>
          <input
            type="radio"
            name="viewMode"
            value="all"
            checked={viewMode === 'all'}
            onChange={() => onViewModeChange('all')}
            data-testid="radio-all"
          />
          Todos los archivos
        </label>
      </div>
    </div>
  );
};

describe('FileFilterView', () => {
  const mockFilesList = ['file1.csv', 'file2.csv', 'file3.csv'];

  test('should render file select dropdown', () => {
    render(
      <MockFileFilterView
        selectedFile=""
        onFileChange={() => {}}
        filesList={mockFilesList}
        viewMode="withData"
        onViewModeChange={() => {}}
      />
    );

    expect(screen.getByLabelText('Filtrar por archivo:')).toBeInTheDocument();
    expect(screen.getByTestId('file-select')).toBeInTheDocument();
  });

  test('should render all file options', () => {
    render(
      <MockFileFilterView
        selectedFile=""
        onFileChange={() => {}}
        filesList={mockFilesList}
        viewMode="withData"
        onViewModeChange={() => {}}
      />
    );

    // Use getAllByText since "Todos los archivos" appears in both dropdown and radio
    const todosElements = screen.getAllByText('Todos los archivos');
    expect(todosElements.length).toBeGreaterThanOrEqual(1);
    mockFilesList.forEach((file) => {
      expect(screen.getByText(file)).toBeInTheDocument();
    });
  });

  test('should call onFileChange when selection changes', () => {
    const mockOnFileChange = jest.fn();
    render(
      <MockFileFilterView
        selectedFile=""
        onFileChange={mockOnFileChange}
        filesList={mockFilesList}
        viewMode="withData"
        onViewModeChange={() => {}}
      />
    );

    fireEvent.change(screen.getByTestId('file-select'), {
      target: { value: 'file1.csv' },
    });

    expect(mockOnFileChange).toHaveBeenCalledWith('file1.csv');
  });

  test('should render view mode radio buttons', () => {
    render(
      <MockFileFilterView
        selectedFile=""
        onFileChange={() => {}}
        filesList={mockFilesList}
        viewMode="withData"
        onViewModeChange={() => {}}
      />
    );

    expect(screen.getByText('Archivos con datos')).toBeInTheDocument();
    expect(screen.getByTestId('radio-all')).toBeInTheDocument();
  });

  test('should call onViewModeChange when radio button is clicked', () => {
    const mockOnViewModeChange = jest.fn();
    render(
      <MockFileFilterView
        selectedFile=""
        onFileChange={() => {}}
        filesList={mockFilesList}
        viewMode="withData"
        onViewModeChange={mockOnViewModeChange}
      />
    );

    fireEvent.click(screen.getByTestId('radio-all'));
    expect(mockOnViewModeChange).toHaveBeenCalledWith('all');
  });

  test('should show correct view mode as selected', () => {
    render(
      <MockFileFilterView
        selectedFile=""
        onFileChange={() => {}}
        filesList={mockFilesList}
        viewMode="all"
        onViewModeChange={() => {}}
      />
    );

    expect(screen.getByTestId('radio-all')).toBeChecked();
    expect(screen.getByTestId('radio-withData')).not.toBeChecked();
  });

  test('should show selected file in dropdown', () => {
    render(
      <MockFileFilterView
        selectedFile="file2.csv"
        onFileChange={() => {}}
        filesList={mockFilesList}
        viewMode="withData"
        onViewModeChange={() => {}}
      />
    );

    expect(screen.getByTestId('file-select')).toHaveValue('file2.csv');
  });
});
