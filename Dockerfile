FROM node:10.10-alpine

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY _helpers _helpers
COPY controllers controllers
COPY models models
COPY routes routes
COPY config.json config.json
COPY server.js server.json

CMD [ "npm", "run", "start" ]