FROM node:16.20-alpine

WORKDIR /app

EXPOSE 3000

COPY ./ ./

RUN yarn

CMD ["yarn", "test:prod"]