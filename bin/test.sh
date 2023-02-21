#!/bin/bash

cd "${0%/*}" && \
cd .. && \
docker-compose run --rm \
-u "$(id -u):$(id -g)" \
jig bash -c "yarn install; gulp --color test $1"
