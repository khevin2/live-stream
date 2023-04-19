#!/bin/bash

# Install dependencies
/home/ubuntu/.nvm/versions/node/v18.15.0/bin/npm ci

# Start the app
/home/ubuntu/.nvm/versions/node/v18.15.0/bin/pm2 restart index.js