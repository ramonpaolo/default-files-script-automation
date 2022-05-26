FROM node:14.17-alpine

WORKDIR /app

EXPOSE 3000

COPY ./package.json ./yarn.lock ./

RUN yarn install

COPY ./ ./

RUN yarn build

CMD ["yarn", "start"]