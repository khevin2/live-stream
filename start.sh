#!/bin/bash

# Set the path to the directory containing the npm binary
NPM_DIR="/home/ubuntu/.nvm/versions/node/v18.15.0/bin"

export PATH=$PATH:$NPM_DIR

# Install dependencies
npm ci

# Start the app
npm start