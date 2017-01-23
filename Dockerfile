FROM node:7

WORKDIR /src
ADD package.json .
RUN npm install

ADD . .

