#!/bin/bash

cd "${0%/*}" && \
cd .. && \
docker compose run --rm \
jig bash -c 'yarn install'
