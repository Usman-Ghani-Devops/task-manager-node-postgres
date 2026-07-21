ARG NODE_VERSION=22--alpine
FROM node:${NODE_VERSION} AS builder

LABEL maintainer="Usman Ghani"
LABEL description="Task Manager application built with Node.js and PostgreSQL"
LABEL stage="builder"

WORKDIR /app/

COPY package*.json ./


RUN npm install -g npm@latest \
    && npm ci --omit=dev


RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends curl \
    && apt-get autoremove -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY . .

FROM node:${NODE_VERSION}

LABEL maintainer="Usman Ghani"
LABEL description="Task Manager application built with Node.js and PostgreSQL"
LABEL stage="runtime"

WORKDIR /app/

COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/src ./src  
COPY --from=builder --chown=node:node /app/database ./database
COPY --from=builder --chown=node:node /app/node_modules ./node_modules

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends curl \
    && apt-get autoremove -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*


EXPOSE 3000 
USER node
CMD ["npm", "start"]


