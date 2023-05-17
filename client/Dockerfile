FROM node:16.17.1 AS PRODUCTION
RUN mkdir -p /usr/src/client

WORKDIR /usr/src/client

COPY package.json .
COPY package-lock.json .
ENV NODE_ENV=PRODUCTION
RUN npm install -f

COPY . .


CMD [ "sh","-c","npm run start" ]