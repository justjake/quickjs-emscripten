#!/bin/bash

# Navigate to the repo root
cd "$(git rev-parse --show-toplevel)"

# Check if the current folder is the repo root
if [ ! -f "package.json" ]; then
    echo "Error: This script must be run from the root of the quickjs-emscripten repository"
    exit 1
fi

# Run commands in the repo root
yarn
yarn build
yarn tarball

# Update submodules
git submodule update --init --recursive

# Navigate to the submodule and run commands
cd quickjs-emscripten-sync
yarn
yarn build
yarn pack --filename ../build/quickjs-emscripten-sync.tgz

# Navigate to the 'arena-sync' folder on repo root level and run build
cd "$(git rev-parse --show-toplevel)"
cd sync-arena
npm install
npm run build

echo 'Build output should be in sync-arena/dist'
