# Build stage
FROM node:16-alpine AS build

# Set the working directory to /app
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --production --frozen-lockfile

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN yarn build


# Production stage
FROM nginx:alpine

# Remove the default Nginx configuration file
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy the custom Nginx configuration file to the container
COPY docker/nginx.conf /etc/nginx/conf.d/

# Copy the production build files to the Nginx document root directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]