FROM node:14-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

RUN chown -R node.node /app

COPY . .
