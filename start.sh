#!/bin/bash

# Install dependencies
npm ci

# Start the app
pm2 restart index.js