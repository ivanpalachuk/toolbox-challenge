const express = require('express')
const https = require('https')

const app = express()
const PORT = process.env.PORT || 3000

const API_BASE_URL = 'https://echo-serv.tbxnet.com/v1/secret'
const API_KEY = 'Bearer aSuperSecretKey'

// Middleware para CORS y Cache
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  // Deshabilitar cache para que siempre devuelva 200
  res.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.header('Pragma', 'no-cache')
  res.header('Expires', '0')
  next()
})

// Helper para hacer peticiones HTTPS (reemplaza axios)
function httpsGet (url, headers = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url)
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers
    }

    const req = https.request(options, (res) => {
      let data = ''

      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        // Si el status no es 2xx, rechazar
        if (res.statusCode < 200 || res.statusCode >= 300) {
          resolve({ status: res.statusCode, data: null })
          return
        }

        try {
          // Intentar parsear como JSON, si falla devolver texto plano
          const parsed = JSON.parse(data)
          resolve({ status: res.statusCode, data: parsed })
        } catch {
          resolve({ status: res.statusCode, data })
        }
      })
    })

    req.on('error', (error) => {
      reject(error)
    })

    req.end()
  })
}

// Función para obtener la lista de archivos
async function getFilesList () {
  try {
    const response = await httpsGet(`${API_BASE_URL}/files`, {
      authorization: API_KEY
    })
    return response.data.files || []
  } catch (error) {
    console.error('Error fetching files list:', error.message)
    throw error
  }
}

// Función para descargar un archivo
async function downloadFile (fileName) {
  try {
    const response = await httpsGet(`${API_BASE_URL}/file/${fileName}`, {
      authorization: API_KEY
    })
    return response.data
  } catch (error) {
    console.error(`Error downloading file ${fileName}:`, error.message)
    return null
  }
}

// Función para parsear y validar CSV
function parseCSV (csvContent, fileName) {
  const lines = csvContent.split('\n')
  const validLines = []

  // Saltar el header (primera línea)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const columns = line.split(',')

    // Validar que tenga 4 columnas: file, text, number, hex
    if (columns.length === 4) {
      const [, text, number, hex] = columns

      // Validar que number sea un número y hex tenga 32 caracteres
      if (text && !isNaN(number) && hex && hex.length === 32) {
        validLines.push({
          text,
          number: parseInt(number, 10),
          hex
        })
      }
    }
  }

  return validLines
}

// Función para parsear CSV con detalles de errores (para debug)
function parseCSVWithErrors (csvContent, fileName) {
  const lines = csvContent.split('\n')
  const validLines = []
  const invalidLines = []

  // Obtener header
  const header = lines[0]?.trim() || ''

  // Saltar el header (primera línea)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const columns = line.split(',')
    const lineNumber = i + 1
    const errors = []

    // Validar cantidad de columnas
    if (columns.length !== 4) {
      errors.push(`Esperadas 4 columnas, encontradas ${columns.length}`)
    } else {
      const [, text, number, hex] = columns

      // Validar text
      if (!text) {
        errors.push('Campo "text" está vacío')
      }

      // Validar number
      if (isNaN(number) || number === '') {
        errors.push(`Campo "number" no es un número válido: "${number}"`)
      }

      // Validar hex
      if (!hex) {
        errors.push('Campo "hex" está vacío')
      } else if (hex.length !== 32) {
        errors.push(`Campo "hex" debe tener 32 caracteres, tiene ${hex.length}`)
      }

      // Si no hay errores, es válida
      if (errors.length === 0) {
        validLines.push({
          text,
          number: parseInt(number, 10),
          hex
        })
        continue
      }
    }

    // Agregar línea inválida con sus errores
    invalidLines.push({
      lineNumber,
      content: line,
      errors
    })
  }

  return {
    header,
    totalLines: lines.length - 1, // Sin contar header
    validCount: validLines.length,
    invalidCount: invalidLines.length,
    validLines,
    invalidLines
  }
}

// Endpoint GET /files/data
app.get('/files/data', async (req, res) => {
  try {
    const { fileName } = req.query

    // Obtener lista de archivos
    const filesList = await getFilesList()

    // Si se busca un archivo específico, verificar que exista
    if (fileName) {
      const fileExists = filesList.includes(fileName)
      if (!fileExists) {
        return res.status(404).json({
          error: 'Archivo no encontrado',
          message: `El archivo "${fileName}" no existe en el servidor`
        })
      }
    }

    // Filtrar por fileName si se proporciona
    const filesToProcess = fileName
      ? filesList.filter(f => f === fileName)
      : filesList

    const results = []

    // Procesar cada archivo
    for (const file of filesToProcess) {
      const content = await downloadFile(file)

      if (content) {
        const lines = parseCSV(content, file)

        // Solo agregar archivos con líneas válidas
        if (lines.length > 0) {
          results.push({
            file,
            lines
          })
        }
      }
    }

    res.json(results)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Endpoint GET /files/list (punto opcional)
app.get('/files/list', async (req, res) => {
  try {
    const filesList = await getFilesList()
    res.json({ files: filesList })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Endpoint GET /files/debug/:fileName - Muestra errores de validación
app.get('/files/debug/:fileName', async (req, res) => {
  try {
    const { fileName } = req.params

    const content = await downloadFile(fileName)

    if (!content) {
      return res.status(404).json({
        error: 'Archivo no encontrado o error al descargarlo',
        fileName
      })
    }

    const result = parseCSVWithErrors(content, fileName)

    res.json({
      fileName,
      ...result
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Iniciar servidor solo si no estamos en modo test
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

module.exports = app
