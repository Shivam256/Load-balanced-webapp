FROM node:16.17.1 AS PRODUCTION

RUN mkdir -p /usr/src/server
WORKDIR /usr/src/server

ENV NODE_ENV=PRODUCTION

COPY package.json .
COPY package-lock.json .

RUN npm install -f

COPY . .
CMD [ "sh","-c","npm run start" ]