#!/bin/bash
# Use system emcc if installed, otherwise use Docker.
if command -v emcc > /dev/null ; then
  if emcc --version | grep "$EMSDK_VERSION" > /dev/null ; then
    exec emcc "$@"
  fi
fi

exec docker run --rm -v "$(pwd):$(pwd)" -u "$(id -u):$(id -g)" -w "$(pwd)" "${EMSDK_DOCKER_IMAGE}" emcc "$@"