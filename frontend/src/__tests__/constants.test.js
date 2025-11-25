import { LABELS, API_CONFIG } from '../constants';

describe('Constants', () => {
  describe('LABELS', () => {
    test('should have APP_TITLE defined', () => {
      expect(LABELS.APP_TITLE).toBeDefined();
      expect(typeof LABELS.APP_TITLE).toBe('string');
    });

    test('should have table headers defined', () => {
      expect(LABELS.TABLE_HEADER_FILE).toBeDefined();
      expect(LABELS.TABLE_HEADER_TEXT).toBeDefined();
      expect(LABELS.TABLE_HEADER_NUMBER).toBeDefined();
      expect(LABELS.TABLE_HEADER_HEX).toBeDefined();
    });

    test('should have error messages defined', () => {
      expect(LABELS.ERROR_TITLE).toBeDefined();
      expect(LABELS.ERROR_LOADING_DATA).toBeDefined();
      expect(LABELS.ERROR_FILE_NOT_FOUND).toBeDefined();
    });

    test('should have footer info defined', () => {
      expect(LABELS.FOOTER_NAME).toBe('Ivan Palachuk');
      expect(LABELS.FOOTER_LINKEDIN_URL).toContain('linkedin.com');
    });
  });

  describe('API_CONFIG', () => {
    test('should have BASE_URL defined', () => {
      expect(API_CONFIG.BASE_URL).toBeDefined();
    });

    test('should have ENDPOINTS defined', () => {
      expect(API_CONFIG.ENDPOINTS).toBeDefined();
      expect(API_CONFIG.ENDPOINTS.FILES_DATA).toBe('/files/data');
      expect(API_CONFIG.ENDPOINTS.FILES_LIST).toBe('/files/list');
      expect(API_CONFIG.ENDPOINTS.FILES_DEBUG).toBe('/files/debug');
    });
  });
});
