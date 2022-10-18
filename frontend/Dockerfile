FROM node:latest

WORKDIR /app

COPY package*.json .

RUN npm ci

RUN chown -R node.node /app

COPY . .
