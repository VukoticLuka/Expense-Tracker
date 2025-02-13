#!/bin/bash

cd "$(dirname "$0")"

if [ ! -d "node_modules" ]; then
    # Promeni direktorijum na backend
    echo "Installing npm dependencies..."
    npm install
else
    echo "Dependencies are already installed."
fi

echo "Starting Express application with Nodemon..."

echo "Express app is running and will automatically restart on file changes."

# Run nodemon on src/index.js (assuming your entry file is src/index.js)
npm run start:dev
