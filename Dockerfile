FROM node:19-alpine3.15
WORKDIR /opt/app
ADD package.json package.json
RUN yarn install
ADD . .
RUN yarn run build
CMD ["node", "./dist/main.js"]