# Backend Dockerfile
FROM node:14-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias de producción
RUN npm install --only=production

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "index.js"]
