# Utiliza la imagen oficial de Node.js como base
FROM node:latest

# Establece el directorio de trabajo en /src
WORKDIR /src

# Copia los archivos necesarios al contenedor
COPY package*.json ./
COPY . .

# Instala las dependencias
RUN npm install

# Instala nodemon globalmente
RUN npm install -g nodemon

# Instala el CLI de Prisma globalmente
RUN npm install -g prisma

# Genera los artefactos de Prisma
RUN prisma generate

# Expone el puerto 3301
EXPOSE 3301

# Comando para iniciar la aplicación con nodemon
CMD ["nodemon", "app.ts"]
