FROM node:12.3.1-stretch
RUN mkdir -p /app
WORKDIR /app
RUN npm install -g pm2
RUN apt-get update && apt-get install vim -y
COPY package.json /app
COPY package-lock.json /app
RUN npm install -g