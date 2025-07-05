FROM node:23-alpine AS base
LABEL authors="tom"

# https://kariera.future-processing.pl/blog/dockerfile-good-practices-for-node-and-npm/
WORKDIR /usr/src/app
RUN chown node:node ./
USER node

# Defaults to production, docker-compose overrides this to development on build and run.
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Install dependencies first, as they change less often than code.
COPY package.json package-lock.json* ./
RUN npm ci && npm cache clean --force
COPY . .

RUN npm run build

CMD ["npm", "start"]