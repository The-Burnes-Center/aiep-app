# Stage 1: Install dependencies
FROM node:22-alpine3.18 as base

WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

# Stage 2: Build the application
FROM base AS builder

WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .

ARG OPENAI_API_KEY
ARG ASTRA_DB_APPLICATION_TOKEN
ARG ASTRA_DB_ENDPOINT
ARG ASTRA_DB_NAMESPACE

ENV NEXT_PUBLIC_OPENAI_API_KEY=${OPENAI_API_KEY}
ENV NEXT_PUBLIC_ASTRA_DB_APPLICATION_TOKEN=${ASTRA_DB_APPLICATION_TOKEN}
ENV NEXT_PUBLIC_ASTRA_DB_ENDPOINT=${ASTRA_DB_ENDPOINT}
ENV NEXT_PUBLIC_ASTRA_DB_NAMESPACE=${ASTRA_DB_NAMESPACE}
ENV NODE_ENV=production

RUN yarn build

# Stage 3: Run the application
FROM base AS runtime

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/yarn.lock ./

EXPOSE 3000

CMD ["yarn", "start"]
