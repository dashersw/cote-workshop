FROM mhart/alpine-node:latest

ENV COTE_MULTICAST_ADDRESS=239.1.21.121

WORKDIR /src
ADD package.json .
RUN npm install

ADD . .

