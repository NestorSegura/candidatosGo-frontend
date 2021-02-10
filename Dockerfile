# ---------- Base ----------
FROM node:12-alpine AS base

WORKDIR /app

# ---------- Builder ----------
FROM base AS builder

COPY . .

RUN npm install

RUN ls

RUN npm run build

#RUN npm prune --production # Remove dev dependencies

# ---------- Release ----------
FROM base AS release

COPY --from=builder /app/build ./build

COPY ./nodeserver.js build/nodeserver.js

USER node

EXPOSE 8080

CMD [ "node", "nodeserver.js" ]
