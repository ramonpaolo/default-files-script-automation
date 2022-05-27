FROM node:14.17-alpine AS appbuild

WORKDIR /app

COPY ./ ./

RUN yarn build

# ---------

FROM node:14.17-alpine

WORKDIR /app

EXPOSE 3000

COPY --from=appbuild /app/dist ./dist
COPY --from=appbuild /app/package.json /app/yarn.lock ./

RUN yarn install --production

USER node

CMD ["yarn", "start"]