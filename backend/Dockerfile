ARG NODE_IMAGE=node:20.20.1-alpine3.22

FROM ${NODE_IMAGE} AS build
WORKDIR /app/backend
# Avoid having NODE_ENV=production leak in here and skip devDependencies
ENV NODE_ENV=development
COPY backend/package*.json ./
RUN npm ci --include=dev
COPY backend ./
RUN ls -la node_modules/.bin/ | head -20 && node_modules/.bin/tsc --version
RUN npm run build
RUN npm prune --omit=dev

FROM ${NODE_IMAGE} AS runtime
WORKDIR /app/backend
ENV NODE_ENV=production
COPY --from=build /app/backend/dist dist
COPY --from=build /app/backend/package*.json ./
COPY --from=build /app/backend/node_modules node_modules
EXPOSE 3001
CMD ["node", "dist/index.js"]
