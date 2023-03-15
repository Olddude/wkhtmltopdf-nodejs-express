#!/usr/bin/env bash

tree . -I node_modules

wkhtmltopdf
openssl req -x509 -config cert.conf -nodes -days 3650 -newkey rsa:4096 -keyout server.key -out server.crt

node --inspect=0.0.0.0:9229 ./dist/src/main.js
