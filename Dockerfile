FROM node:8

WORKDIR /src
ADD package.json .
RUN npm install

ADD . .

