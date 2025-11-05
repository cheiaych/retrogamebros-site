FROM node:22 AS build

WORKDIR /app

COPY React/package*.json ./React/
RUN cd ./React && npm install

COPY React ./React
RUN cd ./React && npm run build


FROM node:22

WORKDIR ./app

COPY Express/package*.json ./Express/
RUN cd Express && npm install

COPY Express ./Express

COPY --from=build /app/React/build ./React/build

EXPOSE 8080
CMD ["node", "Express/index.js"]