FROM node:18-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

FROM deps AS build
COPY . .
# Generate Prisma client (safe even if TypeORM still present)
RUN npx prisma generate || echo "Prisma generate skipped"
RUN npm run build

FROM node:18-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY package.json ./

# Set database URL via compose environment
ENV PORT=3001

# Run migrations (ignore if prisma not configured), then start
CMD sh -c "npx prisma migrate deploy || echo 'No Prisma migrations'; node dist/main.js"
