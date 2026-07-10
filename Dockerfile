ARG NODE_VERSION=22-slim

FROM node:${NODE_VERSION} AS builder

LABEL maintainer="Usman Ghani"
LABEL description="Task Manager application built with Node.js and PostgreSQL"
LABEL stage="builder"

WORKDIR /app/

COPY package*.json ./

RUN npm install --omit=dev && npm cache clean --force

COPY . .

FROM node:${NODE_VERSION}

LABEL maintainer="Usman Ghani"
LABEL description="Task Manager application built with Node.js and PostgreSQL"
LABEL stage="builder"

WORKDIR /app/

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src  
COPY --from=builder /app/database ./database
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000 
USER node
CMD ["npm", "start"]


