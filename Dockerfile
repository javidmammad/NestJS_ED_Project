FROM node:19-alpine3.15
WORKDIR /opt/app
ADD package.json package.json
RUN npm install
ADD . .
RUN yarn run build
RUN yarn prune --production
CMD ["node", "./dist/main.js"]