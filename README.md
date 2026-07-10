# Task Manager Node PostgreSQL

A simple Task Management web application built with **Node.js**, **Express.js**, **EJS**, and **PostgreSQL**.

This project is developed as part of a Docker containerization assignment where the application is containerized incrementally while learning Docker fundamentals, optimization techniques, and production deployment practices.

---

# Project Objectives

The goals of this project are:

* Build a simple CRUD Task Manager application.
* Store task data in PostgreSQL.
* Learn Docker by containerizing the application step by step.
* Follow Docker best practices.
* Optimize Docker images.
* Run multi-container applications using Docker Compose.

---

# Features

* Create a new task
* View all tasks
* Edit existing tasks
* Delete tasks
* Store tasks in PostgreSQL
* Server-side rendering using EJS
* Dockerized Node.js application
* Optimized production Docker image

---

# Technology Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| PostgreSQL | Database |
| EJS | Template engine |
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |

---

# Project Structure

```text
task-manager-node-postgres/
│
├── database/
│   └── init.sql
│
├── public/
│   ├── css/
│   ├── images/
│   └── js/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── taskController.js
│   │
│   ├── middleware/
│   │
│   ├── models/
│   │   └── taskModel.js
│   │
│   ├── routes/
│   │   └── taskRoutes.js
│   │
│   ├── views/
│   │   ├── layouts/
│   │   ├── partials/
│   │   ├── add-task.ejs
│   │   ├── edit-task.ejs
│   │   └── index.ejs
│   │
│   ├── app.js
│   └── server.js
│
├── .dockerignore
├── .gitignore
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md
```

---

# Prerequisites

Install the following tools:

* Docker
* Git
* Node.js (only for local development)

---

# Stage 0 – Project Setup

## Completed Tasks

* Created GitHub repository.
* Created Express.js application.
* Configured PostgreSQL database.
* Implemented CRUD operations.
* Added EJS templates.
* Created MVC project structure.
* Added `.gitignore`.
* Added `.dockerignore`.
* Added project documentation.

---

# Running Application Locally

Install dependencies:

```bash
npm install
```

Start application:

```bash
npm run dev
```

Application runs at:

```text
http://localhost:3000
```

---

# Stage 1 – First Container

## Objective

Containerize the Node.js application by:

* Writing a Dockerfile.
* Building the Docker image.
* Running the application inside a container.
* Exposing the application through port mapping.
* Verifying the application using browser or curl.

---

# Dockerfile (Stage 1)

```dockerfile
FROM node:22

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
```

---

# Build Docker Image

```bash
docker build -t task-manager:v1 .
```

---

# Run Container

```bash
docker run -d \
--name frontend-container \
-p 3000:3000 \
task-manager:v1
```

---

# Verify Container

List running containers:

```bash
docker ps
```

View logs:

```bash
docker logs frontend-container
```

Access container:

```bash
docker exec -it frontend-container sh
```

Stop container:

```bash
docker stop frontend-container
```

Remove container:

```bash
docker rm frontend-container
```

---

# Verify Application

Browser:

```text
http://localhost:3000
```

Using curl:

```bash
curl http://localhost:3000
```

---

# Stage 2 – Optimize Docker Image

## Objective

The goal of Stage 2 was to optimize the Docker image by:

* Using a multi-stage Docker build.
* Using a smaller base image (`node:22-slim`).
* Installing only production dependencies.
* Running the application as a non-root user.
* Improving `.dockerignore`.
* Reducing image size.

---

# Optimized Dockerfile

```dockerfile
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
LABEL stage="production"

WORKDIR /app/

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/database ./database

EXPOSE 3000

USER node

CMD ["npm", "start"]
```

---

# Build Optimized Image

```bash
docker build -t task-manager:v3 .
```

---

# Image Size Comparison

Image sizes were checked using:

```bash
docker images
```

## Before Optimization

| Image | Size |
|------|------|
| task-manager:v1 | 1.65GB |

## After Optimization

| Image | Size |
|------|------|
| task-manager:v3 | 81MB |

---
# Optimization Improvements

## 1. Multi-stage Docker Build

A multi-stage Docker build was introduced to separate the image building process from the final production image.

The Dockerfile uses two stages:

### Builder Stage

```dockerfile
FROM node:${NODE_VERSION} AS builder
```

The builder stage:

* Installs application dependencies.
* Prepares the application files.
* Handles the build preparation process.

### Production Stage

```dockerfile
FROM node:${NODE_VERSION}
```

The production stage:

* Starts from a clean image.
* Copies only the required application files from the builder stage.
* Excludes unnecessary build files.

Example:

```dockerfile
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/database ./database
```

Benefits:

* Smaller final image.
* Less unnecessary data.
* Faster deployment.
* Better security.

---

## 2. Smaller Base Image

The original Dockerfile used:

```dockerfile
FROM node:22
```

The optimized Dockerfile uses:

```dockerfile
FROM node:22-slim
```

The `slim` image contains only the required operating system packages instead of the complete Debian distribution.

Benefits:

* Reduced image size.
* Faster image download.
* Faster container startup.
* Lower storage usage.

---

## 3. Install Production Dependencies Only

The optimized Dockerfile installs only production dependencies:

```bash
npm install --omit=dev
```

Instead of:

```bash
npm install
```

The difference:

| Installation | Includes |
|-------------|----------|
| npm install | Production + Development dependencies |
| npm install --omit=dev | Production dependencies only |

Development packages such as testing tools and build utilities are excluded from the final production image.

Benefits:

* Smaller image size.
* Reduced attack surface.
* Cleaner production environment.

---

## 4. Docker Layer Caching Optimization

The Dockerfile instructions are ordered to take advantage of Docker layer caching.

Optimized structure:

```dockerfile
WORKDIR /app/

COPY package*.json ./

RUN npm install --omit=dev && npm cache clean --force

COPY . .
```

Why this order?

Docker creates a new image layer for each instruction.

The dependency installation layer changes only when:

```text
package.json
package-lock.json
```

changes.

Application code changes do not force Docker to reinstall all dependencies.

Example:

Before optimization:

```dockerfile
COPY . .

RUN npm install
```

Every code change invalidates the cache and runs:

```bash
npm install
```

again.

After optimization:

```dockerfile
COPY package*.json ./

RUN npm install --omit=dev

COPY . .
```

Only dependency changes trigger a new installation.

Benefits:

* Faster rebuilds.
* Better use of Docker cache.
* Reduced build time during development.

---

## 5. Improved .dockerignore

The `.dockerignore` file prevents unnecessary files from being included in the Docker build context.

Example:

```text
node_modules
.git
.gitignore
Dockerfile
README.md
.env
npm-debug.log
coverage
```

Benefits:

* Smaller build context.
* Faster image builds.
* Prevents unnecessary files from entering the image.

---

## 6. Run Container as Non-root User

The application runs using:

```dockerfile
USER node
```

The official Node.js image provides a non-root user named `node`.

Benefits:

* Improved container security.
* Prevents applications from running with root privileges.
* Follows Docker production best practices.

---

## Final Result

After applying these optimizations:

| Optimization | Result |
|-------------|--------|
| Multi-stage build | Removed unnecessary files from final image |
| node:22-slim | Reduced base image size |
| Production dependencies only | Removed development packages |
| Layer caching | Faster rebuilds |
| .dockerignore | Reduced build context |
| Non-root user | Improved security |

The image size was reduced from:

**1.65GB → 81MB**

# Docker Commands Used

| Command | Purpose |
|---------|---------|
| docker build | Build Docker image |
| docker images | List Docker images |
| docker run | Create and start container |
| docker ps | Show running containers |
| docker logs | View container logs |
| docker exec | Access container |
| docker stop | Stop container |
| docker rm | Remove container |
| docker inspect | View container details |

---

# Completed Docker Concepts

By completing Stage 0, Stage 1, and Stage 2, the following concepts were learned:

* Docker images and containers
* Dockerfile instructions
* Container port mapping
* Docker build process
* Image layers and caching
* Multi-stage builds
* Image optimization techniques
* Production dependency installation
* `.dockerignore`
* Running containers as non-root users

---

# Upcoming Stages

## Stage 3 – Docker Compose

Planned:

* Add PostgreSQL database service.
* Create `docker-compose.yml`.
* Configure services.
* Connect application and database using Docker networking.
* Use environment variables.
* Add service dependency management.

---

## Stage 4 – Persistence, Configuration & Health

Planned:

* Add named volumes.
* Move secrets/configuration into `.env`.
* Add health checks.
* Verify database persistence.

---

## Stage 5 – Ship Application

Planned:

* Push Docker image to Docker Hub.
* Add Nginx reverse proxy.
* Document complete deployment process.
* Add "what I would improve with more time" section.

---

# Author

**Usman Ghani**

BS Software Engineering

Docker Learning Project