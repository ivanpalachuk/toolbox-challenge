# Backend API - Toolbox Challenge

API REST desarrollada con Node.js + Express que consume datos de un API externa y los reformatea.

## Requisitos

- Node.js 14+
- npm

## Instalación

```bash
npm install
```

## Uso

### Iniciar el servidor

```bash
npm start
```

El servidor se iniciará en `http://localhost:3000`

### Ejecutar tests

```bash
npm test
```

## Endpoints

### GET /files/data

Obtiene y formatea los datos de todos los archivos CSV.

**Respuesta:**
```json
[
  {
    "file": "file1.csv",
    "lines": [
      {
        "text": "ejemplo",
        "number": 123,
        "hex": "70ad29aacf0b690b0467fe2b2767f765"
      }
    ]
  }
]
```

### GET /files/data?fileName=archivo.csv

Filtra los datos por un archivo específico.

### GET /files/list

Obtiene la lista de archivos disponibles.

**Respuesta:**
```json
{
  "files": ["file1.csv", "file2.csv", "file3.csv"]
}
```
