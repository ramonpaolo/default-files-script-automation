FROM node:16.20-alpine

WORKDIR /app

EXPOSE 3000

CMD ["yarn", "dev"]