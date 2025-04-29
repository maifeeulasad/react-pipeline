FROM node:18.18.2-alpine3.17

COPY . .

RUN npm i -g pnpm

RUN pnpm i

RUN pnpm build

RUN npm i -g serve

EXPOSE 3010

CMD ["serve", "-l", "3010", "-s","build"]