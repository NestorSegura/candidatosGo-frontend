FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN ls -l
RUN npm install
COPY . .
RUN ls -l
RUN npm run build
COPY ./nodeserver.js dist/nodeserver.js
WORKDIR /usr/src/app/dist
EXPOSE 8080
CMD [ "node", "nodeserver.js" ]
