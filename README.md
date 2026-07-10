# Task Manager - Node.js, Express & PostgreSQL

A containerized Task Management web application built with **Node.js**, **Express**, and **PostgreSQL**. This project is being developed as part of a Docker containerization assignment and follows Docker best practices through incremental stages.

## Project Overview

The application allows users to manage their daily tasks by creating, updating, completing, and deleting tasks. The primary goal of this project is to demonstrate how to containerize a multi-service application using Docker and Docker Compose.

## Technologies

- Node.js
- Express.js
- PostgreSQL
- Docker
- Docker Compose
- Nginx (Stage 5)

## Project Goals

- Containerize a Node.js application
- Connect the application with PostgreSQL
- Optimize Docker images using multi-stage builds
- Persist database data using Docker volumes
- Configure services using environment variables
- Add health checks
- Deploy behind an Nginx reverse proxy
- Publish the application image to Docker Hub

## Project Structure

```
task-manager-node-postgres/
│
├── src/
├── public/
├── package.json
├── README.md
├── .gitignore
└── .dockerignore
```

## Development Roadmap

- [x] Stage 0 - Project Setup
- [ ] Stage 1 - Dockerize the Node.js Application
- [ ] Stage 2 - Optimize the Docker Image
- [ ] Stage 3 - Add PostgreSQL with Docker Compose
- [ ] Stage 4 - Persistence, Configuration & Health Checks
- [ ] Stage 5 - Nginx Reverse Proxy & Docker Hub

## Current Status

🚧 Stage 0 - Project Setup

## License

This project is developed for educational purposes.