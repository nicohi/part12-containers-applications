FROM node:20 AS build-stage
WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

FROM base as test
RUN npm ci
COPY . .
CMD ["CI=true", "npm", "run", "test"]

FROM nginx:1.20-alpine
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
