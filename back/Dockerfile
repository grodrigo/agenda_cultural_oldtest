FROM node:11-alpine

## add required dependencies
RUN apk add --no-cache make g++ build-base linux-headers python \
    && yarn global add loopback-cli \
    && apk del make g++ build-base linux-headers python

WORKDIR /usr/src/app
COPY package.json .

RUN yarn
