FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .
RUN npm ci

ENV MONGO_URL=
ENV REDIS_URL=

USER node
CMD npm start
