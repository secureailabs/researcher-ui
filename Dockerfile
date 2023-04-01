# Use the official Node.js 18 image as the base image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package*.json yarn.lock ./

# Install the dependencies using Yarn
RUN yarn install

# Copy the remaining app files to the container
COPY . .

# Build the app for production
RUN yarn build

# Expose port 3000 for the web server
EXPOSE 3000

# Start the web server
CMD [ "yarn", "start" ]
