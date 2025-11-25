# 🧰 Toolbox Challenge - Full Stack

Aplicación Full Stack desarrollada como solución al desafío técnico de Toolbox.

![Node.js](https://img.shields.io/badge/Node.js-14-green)
![React](https://img.shields.io/badge/React-19-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![StandardJS](https://img.shields.io/badge/code_style-standard-brightgreen.svg)

## 📋 Descripción

El proyecto consiste en:

- **Backend**: API REST con Node.js 14 + Express que consume un servicio externo, procesa archivos CSV y expone endpoints
- **Frontend**: Aplicación React + React Bootstrap que consume la API y muestra los datos en una tabla interactiva

---

## ✅ Requisitos Cumplidos

### API (Obligatorios)
- ✅ Endpoint `GET /files/data` con formato JSON especificado
- ✅ Node.js 14 + Express
- ✅ Tests con Mocha + Chai (`npm test`)
- ✅ Inicio con `npm start`
- ✅ Manejo de archivos vacíos y líneas con error
- ✅ Content-Type: application/json

### Frontend (Obligatorios)
- ✅ React + React Bootstrap
- ✅ Programación funcional con Hooks
- ✅ Webpack
- ✅ JavaScript ES6+ (sin TypeScript)

### Puntos Opcionales
- ✅ `GET /files/list` - Lista de archivos disponibles
- ✅ Filtro por `?fileName=` en el API
- ✅ StandardJS en el backend
- ✅ Filtrado por fileName en el frontend
- ✅ Docker / Docker Compose
- ⬜ Redux (se usó Context API como alternativa más simple)
- ⬜ Tests Jest en frontend

---

## 🚀 Quick Start

### Opción 1: Docker (Recomendado)

```bash
# Clonar el repositorio
git clone https://github.com/ivanpalachuk/toolbox-challenge.git
cd toolbox-challenge

# Levantar con Docker Compose
docker-compose up --build

# Acceder a la aplicación
# Frontend: http://localhost
# Backend:  http://localhost:3000
```

### Opción 2: Ejecución Manual

#### Requisitos previos

- Node.js 14+ (backend) / Node.js 16+ (frontend)
- npm

#### Backend

```bash
cd backend

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start

# Ejecutar tests
npm test

# Verificar estilo de código (StandardJS)
npm run lint
```

El servidor estará disponible en `http://localhost:3000`

#### Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start

# Build de producción
npm run build
```

La aplicación estará disponible en `http://localhost:3001`

---

## 📁 Estructura del Proyecto

```
toolbox-challenge/
├── docker-compose.yml           # Orquestador de servicios Docker
├── README.md
│
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── index.js                 # Servidor Express y endpoints
│   ├── package.json
│   └── test/
│       └── api.test.js          # Tests con Mocha + Chai
│
└── frontend/
    ├── Dockerfile               # Multi-stage build
    ├── .dockerignore
    ├── nginx.conf               # Configuración de Nginx
    ├── webpack.config.js
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js
        ├── index.js
        ├── constants/
        │   └── index.js         # Labels y configuración centralizada
        ├── context/
        │   └── FilesContext.jsx # Estado global con Context API
        ├── hooks/
        │   └── useDebounce.js   # Custom hook para debounce
        └── components/
            ├── containers/      # Componentes inteligentes (lógica)
            │   ├── FileFilterContainer.jsx
            │   └── FilesTableContainer.jsx
            └── ui/              # Componentes presentacionales
                ├── Header.jsx
                ├── Footer.jsx
                ├── FileFilterView.jsx
                ├── FilesTableView.jsx
                ├── AllFilesTableView.jsx
                └── FileDebugModal.jsx
```

---

## 🔌 API Endpoints

### `GET /files/data`

Retorna los datos procesados de todos los archivos CSV válidos.

**Response:**

```json
[
  {
    "file": "test1.csv",
    "lines": [
      {
        "text": "ejemplo",
        "number": 123,
        "hex": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4"
      }
    ]
  }
]
```

### `GET /files/data?fileName=test1.csv`

Filtra los datos por nombre de archivo específico.

**Response 200:** Igual al anterior pero filtrado  
**Response 404:** Si el archivo no existe

```json
{
  "error": "Archivo no encontrado",
  "message": "El archivo \"test1.csv\" no existe en el servidor"
}
```

### `GET /files/list`

Lista todos los archivos disponibles.

**Response:**

```json
{
  "files": ["test1.csv", "test2.csv", "test3.csv"]
}
```

### `GET /files/debug/:fileName`

Obtiene información detallada de validación de un archivo (líneas válidas/inválidas).

---

## ✨ Características

### Backend

- ✅ API REST con Express
- ✅ Consumo de API externa con módulo `https` nativo (sin axios)
- ✅ Validación y parseo de archivos CSV
- ✅ Manejo de errores (404 para archivos inexistentes)
- ✅ Tests unitarios con Mocha + Chai
- ✅ Estilo de código con StandardJS
- ✅ CORS habilitado

### Frontend

- ✅ React 19 con Hooks
- ✅ Estado global con **Context API** (sin Redux)
- ✅ Peticiones HTTP con `fetch` nativo (sin axios)
- ✅ Patrón **Container/Presentational** para componentes
- ✅ React Bootstrap para UI
- ✅ Búsqueda con **debounce** (800ms)
- ✅ Tabla con **columnas ordenables** (asc/desc)
- ✅ Dos modos de vista:
  - "Todos los archivos con datos"
  - "Todos los archivos" (incluye archivos con errores)
- ✅ Modal de debug para archivos con errores (lazy loading)
- ✅ Mensajes diferenciados: archivo vacío vs archivo inexistente
- ✅ Sin strings hardcodeados (todo en `constants/`)
- ✅ Webpack 5 con Hot Module Replacement

### DevOps

- ✅ Dockerización completa
- ✅ Multi-stage build para frontend (Node + Nginx)
- ✅ Docker Compose para orquestación
- ✅ Nginx como reverse proxy

---

## 🧪 Tests

### Ejecutar tests del backend

```bash
cd backend
npm test
```

**Tests incluidos:**

- ✅ `GET /files/data` retorna array de archivos con formato correcto
- ✅ `GET /files/data?fileName=xxx` filtra correctamente
- ✅ `GET /files/list` retorna lista de archivos

---

## 🐳 Docker

### Arquitectura

```
┌─────────────────────────────────────────┐
│            Docker Compose               │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────┐    ┌─────────────┐    │
│  │   Nginx     │───▶│   Node.js   │    │
│  │  (Frontend) │    │  (Backend)  │    │
│  │   :80       │    │   :3000     │    │
│  └─────────────┘    └─────────────┘    │
│         │                   │          │
│         └───────┬───────────┘          │
│                 │                       │
│        toolbox-network                  │
└─────────────────────────────────────────┘
```

### Comandos útiles

```bash
# Levantar servicios
docker-compose up --build

# Levantar en background
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Parar servicios
docker-compose down

# Reconstruir sin cache
docker-compose build --no-cache

# Ver containers corriendo
docker ps
```

---

## 📝 Decisiones Técnicas

| Decisión                            | Justificación                                                                    |
| ----------------------------------- | -------------------------------------------------------------------------------- |
| **`https` y `fetch` nativos**       | Sin dependencias externas para HTTP, código más liviano y sin axios             |
| **Context API** en lugar de Redux   | Menor complejidad para el scope del proyecto, sin boilerplate adicional          |
| **Patrón Container/Presentational** | Separación clara entre lógica y UI, mejor testeabilidad                          |
| **StandardJS**                      | Estilo consistente sin configuración, sin punto y coma                           |
| **Debounce en búsqueda**            | Evita requests excesivos mientras el usuario escribe                             |
| **Lazy loading del modal**          | Mejor performance inicial, carga solo cuando se necesita                         |
| **Multi-stage Docker build**        | Imágenes más pequeñas y seguras para producción                                  |
| **Nginx como proxy**                | Mejor performance para archivos estáticos + proxy al backend                     |

---

## 👤 Autor

**Ivan Palachuk**

- LinkedIn: [ivan-palachuk-frontend](https://www.linkedin.com/in/ivan-palachuk-frontend/)
- GitHub: [@ivanpalachuk](https://github.com/ivanpalachuk)

---

## 📄 Licencia

ISC
