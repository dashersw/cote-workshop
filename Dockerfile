FROM node:7-alpine

WORKDIR /src
ADD package.json .
RUN npm install

ADD . .

