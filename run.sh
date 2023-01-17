#!/usr/bin/env bash

tree . -I node_modules

wkhtmltopdf

node --inspect=0.0.0.0:9229 ./dist/src/main.js
