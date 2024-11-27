# The first FROM is now a stage called build-stage
FROM node:20 AS build-stage 

WORKDIR /usr/src/app

# Copy the whole application
COPY . .

# Set environment variables (e.g., for the backend URL)
ENV VITE_BACKEND_URL=http://localhost:8080/api

# Install dependencies
RUN npm ci

# Run tests
RUN npm test 

# If the tests fail, the build will fail, so proceed only if the tests pass

# The next stage is the production build
FROM build-stage AS production-stage

# Run the production build
RUN npm run build

# Now we switch to the Nginx image to serve the app
FROM nginx:1.25-alpine

# Copy the build output from the build stage to the Nginx container
COPY --from=production-stage /usr/src/app/dist /usr/share/nginx/html