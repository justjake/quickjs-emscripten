#!/bin/bash
# Use system emcc if installed, otherwise use Docker.
set -eo pipefail

if [[ -z "$EMSDK_USE_DOCKER" ]] && command -v emcc > /dev/null ; then
  if emcc --version | grep "$EMSDK_VERSION" > /dev/null ; then
    exec emcc "$@"
  fi
fi

DOCKER_ARGV=(
  run --rm -v "$(pwd):$(pwd)" -u "$(id -u):$(id -g)" -w "$(pwd)" "${EMSDK_DOCKER_IMAGE}" emcc "$@"
)
set -x
exec docker "${DOCKER_ARGV[@]}"