FROM node:22-bookworm-slim AS builder

WORKDIR /app

COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

RUN npm ci

COPY . .

RUN npm run build
RUN npx prisma generate --schema server/prisma/schema.prisma

FROM node:22-bookworm-slim AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/client/dist ./client/dist
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/prisma ./server/prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/client/package*.json ./client/
COPY --from=builder /app/server/package*.json ./server/

EXPOSE 4000

CMD ["sh", "-c", "npm run prisma:push --workspace server && npm run start --workspace server"]
