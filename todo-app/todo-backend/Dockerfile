FROM node:latest
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci 

USER node

CMD npm run dev