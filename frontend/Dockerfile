FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
ENV VITE_API_URL http://localhost/api
RUN npm run build
