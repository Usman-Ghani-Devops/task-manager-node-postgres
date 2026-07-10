# Task Manager Node PostgreSQL

A simple Task Management web application built with **Node.js**, **Express.js**, **EJS**, and **PostgreSQL**. This project is being developed as part of a Docker containerization assignment, where the application is containerized incrementally while learning Docker fundamentals.

---

# Project Objectives

The goals of this project are to:

* Build a simple CRUD Task Manager application.
* Store task data in PostgreSQL.
* Learn Docker by containerizing the application step by step.
* Follow Docker best practices throughout multiple stages.

---

# Features

* Create a new task
* View all tasks
* Edit existing tasks
* Delete tasks
* Store tasks in PostgreSQL
* Server-side rendering using EJS
* Dockerized Node.js application

---

# Technology Stack

| Technology | Purpose             |
| ---------- | ------------------- |
| Node.js    | Runtime environment |
| Express.js | Web framework       |
| PostgreSQL | Database            |
| EJS        | Template engine     |
| Docker     | Containerization    |

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

Before running the project, install:

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
* Created project folder structure.
* Added `.gitignore`.
* Added `.dockerignore`.
* Added project documentation.

---

# Running the Application Locally

Install project dependencies:

```bash
npm install
```

Start the application:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

# Stage 1 – First Container

## Objective

Containerize the Node.js application by:

* Writing a Dockerfile.
* Building a Docker image.
* Running the application inside a Docker container.
* Exposing the application using port mapping.
* Verifying the application from a browser or using curl.

---

# Dockerfile

```dockerfile
FROM node:22

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
```

---

# Build the Docker Image

Navigate to the project directory and build the image.

```bash
docker build -t task-manager:v1 .
```

---

# Verify the Image

List available Docker images.

```bash
docker images
```

Expected output:

```text
REPOSITORY      TAG
task-manager    v1
```

---

# Run the Container

Run the application container.

```bash
docker run -d \
--name frontend-container \
-p 3000:3000 \
task-manager:v1
```

---

# Verify the Running Container

List running containers.

```bash
docker ps
```

---

# View Container Logs

```bash
docker logs frontend-container
```

---

# Access the Running Container

```bash
docker exec -it frontend-container sh
```

Exit the container:

```bash
exit
```

---

# Stop the Container

```bash
docker stop frontend-container
```

---

# Remove the Container

```bash
docker rm frontend-container
```

---

# Verify the Application

Open your browser and visit:

```text
http://localhost:3000
```

Or verify using curl:

```bash
curl http://localhost:3000
```

If the application responds successfully, the container has been built and is running correctly.

---

# Docker Commands Used

| Command         | Purpose                      |
| --------------- | ---------------------------- |
| `docker build`  | Build Docker image           |
| `docker images` | List Docker images           |
| `docker run`    | Create and start a container |
| `docker ps`     | Show running containers      |
| `docker logs`   | Display container logs       |
| `docker exec`   | Enter a running container    |
| `docker stop`   | Stop a container             |
| `docker rm`     | Remove a container           |

---

# Files Added for Docker

## Dockerfile

Defines how the Docker image is built.

## .dockerignore

Excludes unnecessary files (such as `node_modules`) from the Docker build context.

## .gitignore

Prevents unnecessary files from being committed to Git.

---

# Learning Outcomes

By completing Stage 0 and Stage 1, the following concepts were learned:

* Basic Express.js application structure
* PostgreSQL integration
* MVC project organization
* Docker images
* Docker containers
* Dockerfile instructions (`FROM`, `WORKDIR`, `COPY`, `RUN`, `EXPOSE`, `CMD`)
* Building Docker images
* Running containers
* Port mapping
* Viewing logs
* Accessing running containers
* Basic Docker workflow

---

# Future Work

Upcoming stages will focus on:

* Docker layer caching
* Optimizing image size
* Multi-stage builds
* Non-root containers
* Docker networking
* Docker Compose
* Persistent volumes
* Health checks
* Production deployment

---

# Author

**Usman Ghani**

BS Software Engineering

Docker Learning Project
