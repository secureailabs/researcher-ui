#!/bin/bash
set -e

cd /app

# create .env file
# REACT_APP_SAIL_API_SERVICE_URL=$REACT_APP_SAIL_API_SERVICE_URL 
# REACT_APP_SAIL_DATA_UPLOAD_SERVICE_URL=$REACT_APP_SAIL_DATA_UPLOAD_SERVICE_URL

# # create .env file and add env variables
# echo "REACT_APP_SAIL_API_SERVICE_URL=$REACT_APP_SAIL_API_SERVICE_URL" > .env
# echo "REACT_APP_SAIL_DATA_UPLOAD_SERVICE_URL=$REACT_APP_SAIL_DATA_UPLOAD_SERVICE_URL" >> .env

# cross-env REACT_APP_SAIL_API_SERVICE_URL=$REACT_APP_SAIL_API_SERVICE_URL REACT_APP_SAIL_DATA_UPLOAD_SERVICE_URL=$REACT_APP_SAIL_DATA_UPLOAD_SERVICE_URL yarn react-scripts build

yarn react-scripts build

nginx -g "daemon off;"