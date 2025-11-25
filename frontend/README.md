# Frontend - Toolbox Challenge

Aplicación React que consume el API del backend y muestra datos de archivos CSV procesados.

## 🎯 Características

- **React Context API** para gestión de estado global (sin Redux)
- **React Hooks** para lógica de componentes
- **React Bootstrap** para UI responsiva
- **Webpack** para bundling y desarrollo
- **Filtrado dinámico** por nombre de archivo
- **Componentes reutilizables** y código modular

## 📦 Instalación

```bash
npm install
```

## ▶️ Ejecución

### Modo Desarrollo

```bash
npm start
```

Esto iniciará webpack-dev-server en `http://localhost:3001` y abrirá automáticamente el navegador.

**Nota**: Asegúrate de que el backend esté corriendo en `http://localhost:3000` antes de iniciar el frontend.

### Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

## 🏗️ Arquitectura

### Context API

El proyecto usa **React Context API** en lugar de Redux para la gestión de estado:

```javascript
// FilesContext.js
export const FilesProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filesList, setFilesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState('');

  // ...lógica del provider
};

export const useFiles = () => {
  return useContext(FilesContext);
};
```

### Componentes

#### App.js

Componente principal que envuelve la aplicación con el `FilesProvider` y organiza la estructura general.

#### Header.js

Componente de presentación para el encabezado de la aplicación.

#### FileFilter.js

Componente que permite filtrar los datos por nombre de archivo. Usa el hook `useFiles()` para acceder al estado y las acciones del contexto.

#### FilesTable.js

Componente que renderiza la tabla de datos con formato Bootstrap.

### Hooks Personalizados

#### useFiles()

Hook personalizado que proporciona acceso al contexto de archivos:

```javascript
const {
  data, // Datos filtrados
  filesList, // Lista de archivos disponibles
  loading, // Estado de carga
  error, // Mensajes de error
  selectedFile, // Archivo seleccionado en el filtro
  setSelectedFile, // Función para cambiar el filtro
  refreshData, // Función para recargar datos
  clearFilter, // Función para limpiar el filtro
} = useFiles();
```

## 🔧 Configuración

### webpack.config.js

Configuración de Webpack con:

- Babel loader para JSX y ES6+
- CSS loader para estilos
- HtmlWebpackPlugin para generar index.html
- DevServer en puerto 3001 con hot reload

### .babelrc

Configuración de Babel con presets para React y ES6+.

## 📡 Conexión con el Backend

El frontend se conecta al backend en `http://localhost:3000`. Los endpoints utilizados son:

- `GET /files/data` - Obtiene todos los datos
- `GET /files/data?fileName=xxx` - Filtra por archivo
- `GET /files/list` - Lista archivos disponibles

## 🎨 Estilos

El proyecto usa **React Bootstrap** para componentes UI y **Bootstrap 5** para estilos base.

Los componentes utilizados incluyen:

- Container
- Table
- Form
- Button
- Alert
- Spinner

## 🚀 Próximas Mejoras

- [ ] Tests unitarios con Jest
- [ ] Tests de integración con React Testing Library
- [ ] Docker para containerización
- [ ] Variables de entorno para configuración del API URL
- [ ] Paginación de resultados
- [ ] Ordenamiento de columnas

## 📝 Notas Técnicas

- **React 19** con soporte completo de Hooks
- **Programación funcional** sin componentes de clase
- **Código modular** con separación de responsabilidades
- **ES6+** con import/export modules
- Sin TypeScript (según requisitos del challenge)
