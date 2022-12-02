#!/bin/bash
# Use system emcc if installed, otherwise use Docker.
set -eo pipefail

exec emcc "$@"
