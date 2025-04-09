FROM node:22.14.0

RUN apt-get update && apt-get install -qq -y --no-install-recommends

ENV INSTALL_PATH /barber-shop-ui

RUN mkdir -p $INSTALL_PATH

WORKDIR $INSTALL_PATH

COPY package*.json ./

RUN yarn global add @angular/cli@19.2.5

RUN yarn install

COPY . .