#!/bin/bash

# Install dependencies
npx tailwindcss -i ./source/resource/qxapp/css/app.css -o ./source/resource/qxapp.css

# Build the project
echo "Cleaning..."
npx qx clean
echo "Cleaning done."

# Start the application
npx qx compile --watch
