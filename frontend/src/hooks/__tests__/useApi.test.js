import { renderHook, act } from '@testing-library/react';
import useApi from '../../hooks/useApi';

// Mock de las constantes
jest.mock('../../constants', () => ({
  API_CONFIG: {
    BASE_URL: 'http://localhost:3000',
    ENDPOINTS: {
      FILES_DATA: '/files/data',
      FILES_LIST: '/files/list',
      FILES_DEBUG: '/files/debug',
    },
  },
}));

// Mock de fetch global
global.fetch = jest.fn();

describe('useApi Hook', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('should initialize with default values', () => {
    const { result } = renderHook(() => useApi());
    
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(typeof result.current.get).toBe('function');
    expect(typeof result.current.clearError).toBe('function');
  });

  test('should handle successful GET request', async () => {
    const mockData = { files: ['file1.csv', 'file2.csv'] };
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockData),
    });

    const { result } = renderHook(() => useApi());

    let response;
    await act(async () => {
      response = await result.current.get('/files/list');
    });

    expect(response.data).toEqual(mockData);
    expect(response.error).toBeNull();
    expect(response.status).toBe(200);
  });

  test('should handle GET request with params', async () => {
    const mockData = [{ file: 'test.csv', lines: [] }];
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockData),
    });

    const { result } = renderHook(() => useApi());

    await act(async () => {
      await result.current.get('/files/data', { params: { fileName: 'test.csv' } });
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('fileName=test.csv')
    );
  });

  test('should handle 404 error', async () => {
    const errorMessage = 'File not found';
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ message: errorMessage }),
    });

    const { result } = renderHook(() => useApi());

    let response;
    await act(async () => {
      response = await result.current.get('/files/data');
    });

    expect(response.data).toBeNull();
    expect(response.error).toBe(errorMessage);
    expect(response.status).toBe(404);
  });

  test('should handle network error', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useApi());

    let response;
    await act(async () => {
      response = await result.current.get('/files/data');
    });

    expect(response.data).toBeNull();
    expect(response.error).toBe('Network error');
    expect(result.current.error).toBe('Network error');
  });

  test('should clear error', async () => {
    fetch.mockRejectedValueOnce(new Error('Some error'));

    const { result } = renderHook(() => useApi());

    await act(async () => {
      await result.current.get('/files/data');
    });

    expect(result.current.error).toBe('Some error');

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });

  test('should ignore empty params', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve([]),
    });

    const { result } = renderHook(() => useApi());

    await act(async () => {
      await result.current.get('/files/data', { 
        params: { fileName: '', other: null, valid: 'test' } 
      });
    });

    const calledUrl = fetch.mock.calls[0][0];
    expect(calledUrl).not.toContain('fileName=');
    expect(calledUrl).not.toContain('other=');
    expect(calledUrl).toContain('valid=test');
  });
});
