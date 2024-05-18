# Utiliza la imagen oficial de Node.js como base
FROM node:21.7-alpine3.18

# Establece el directorio de trabajo en /src
WORKDIR /src

# Copia los archivos necesarios al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación al contenedor
COPY . .

# Instala nodemon globalmente
RUN npm install -g nodemon

# Expone el puerto 3301
EXPOSE 3301

# Comando para iniciar la aplicación con nodemon cuando se ejecute el contenedor
CMD ["nodemon", "app.ts"]
