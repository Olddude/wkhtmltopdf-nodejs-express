#!/usr/bin/env bash

yarn install
yarn clean

docker-compose down --rmi all
docker image rm wkhtmltopdf --force
docker image prune --force
docker container prune --force

tree . -I node_modules

docker-compose up