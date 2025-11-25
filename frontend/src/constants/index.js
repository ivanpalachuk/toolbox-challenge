export const LABELS = {
    // Header
    APP_TITLE: 'React Test App',
    APP_SUBTITLE: 'Toolbox Challenge - Full Stack',

    // Loading
    LOADING_TEXT: 'Cargando datos...',
    LOADING_SR: 'Cargando...',

    // Errors
    ERROR_TITLE: 'Error',
    ERROR_LOADING_DATA: 'Error al cargar los datos. Asegúrate de que el backend esté corriendo.',
    ERROR_CONTEXT: 'useFiles debe ser usado dentro de FilesProvider',
    ERROR_FILE_NOT_FOUND: 'El archivo buscado no existe en el servidor',

    // Filter
    FILTER_LABEL: 'Filtrar por archivo:',
    FILTER_SEARCH_LABEL: 'Buscar archivo:',
    FILTER_SEARCH_PLACEHOLDER: 'Escribí el nombre del archivo...',
    FILTER_PLACEHOLDER: 'Seleccionar archivo específico',
    FILTER_ARIA_LABEL: 'Seleccionar archivo',
    FILTER_CLEAR_BUTTON: 'Limpiar Filtro',

    // View modes
    VIEW_MODE_LABEL: 'Vista:',
    VIEW_MODE_WITH_DATA: 'Todos los archivos con datos',
    VIEW_MODE_ALL: 'Todos los archivos',

    // Table
    TABLE_EMPTY: 'No hay datos disponibles',
    TABLE_FILE_EMPTY: 'Este archivo no cumple con los requisitos para ser visualizado',
    TABLE_VIEW_ERRORS: 'Ver detalles',
    TABLE_HEADER_FILE: 'File Name',
    TABLE_HEADER_TEXT: 'Text',
    TABLE_HEADER_NUMBER: 'Number',
    TABLE_HEADER_HEX: 'Hex',
    TABLE_HEADER_DETAIL: 'Detalle',
    TABLE_HEADER_STATUS: 'Estado',
    TABLE_STATUS_OK: '✓ OK',
    TABLE_STATUS_ERROR: '⚠️ Con errores',
    TABLE_LINES_COUNT: 'líneas',

    // Sort
    SORT_ASC: 'asc',
    SORT_DESC: 'desc',
    SORT_NONE: null,

    // Debug Modal
    DEBUG_MODAL_TITLE: 'Detalles de validación',
    DEBUG_MODAL_CLOSE: 'Cerrar',
    DEBUG_MODAL_LOADING: 'Cargando detalles...',
    DEBUG_MODAL_ERROR: 'Error al cargar los detalles',
    DEBUG_VALID_LINES: 'Líneas válidas',
    DEBUG_INVALID_LINES: 'Líneas inválidas',
    DEBUG_TOTAL_LINES: 'Total de líneas',
    DEBUG_LINE_NUMBER: 'Línea',
    DEBUG_CONTENT: 'Contenido',
    DEBUG_ERRORS: 'Errores',

    // Footer
    FOOTER_NAME: 'Ivan Palachuk',
    FOOTER_PHONE: '+54 9 223 155-251836',
    FOOTER_LINKEDIN_URL: 'https://www.linkedin.com/in/ivan-palachuk-frontend/',
};

// En producción (Docker) usa /api, en desarrollo usa localhost:3000
const isProd = typeof window !== 'undefined' && window.location.port !== '3001';

export const API_CONFIG = {
    BASE_URL: isProd ? '/api' : 'http://localhost:3000',
    ENDPOINTS: {
        FILES_DATA: '/files/data',
        FILES_LIST: '/files/list',
        FILES_DEBUG: '/files/debug',
    },
};
