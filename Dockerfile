FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm run bundle

FROM node:18 AS production

RUN npm install -g serve json-server


WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/db/db.json ./db/db.json

EXPOSE 5000 3001

CMD ["sh", "-c", "serve -s dist -l 3001 & json-server --watch ./db/db.json --port 5000"]
