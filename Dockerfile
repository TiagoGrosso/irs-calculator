FROM node:18-alpine AS irs-calculator

WORKDIR /app

COPY . .

USER node:node

CMD ["node","build/index.js"]