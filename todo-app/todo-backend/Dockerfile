# Build from 
FROM node:23-alpine as build-stage
  
WORKDIR /usr/src/app

# Copy only necessary files for installation
COPY --chown=node:node package.json package-lock.json ./

# Install dependencies in a temporary directory
RUN npm ci --omit=dev --ignore-scripts --no-audit

USER node

CMD ["npm", "start"]