# Utiliza la imagen oficial de Node.js como base
FROM node:latest

# Establece el directorio de trabajo en /src
WORKDIR /src

# Copia los archivos necesarios al contenedor
COPY package*.json ./
COPY . .

# Instala las dependencias
RUN npm install

# Instala el CLI de Prisma globalmente
RUN npm install -g prisma

# Genera los artefactos de Prisma
RUN prisma generate

# Expone el puerto 3301
EXPOSE 3301

RUN apt-get update && apt-get install -y curl

RUN curl -o logstash.tar.gz https://artifacts.elastic.co/downloads/logstash/logstash-8.13.4-linux-x86_64.tar.gz

RUN tar -xzf logstash.tar.gz

COPY start.sh .

CMD ["bash", "start.sh"]

# Comando para iniciar la aplicación con nodemon
