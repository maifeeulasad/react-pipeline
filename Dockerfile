FROM node:18.18.2-alpine3.17

COPY . .

RUN yarn

RUN yarn build

RUN npm i -g serve

EXPOSE 3010

CMD ["serve", "-l", "3010", "-s","build"]