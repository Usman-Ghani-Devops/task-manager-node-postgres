  # Task Manager Node PostgreSQL
  
  A containerized **Task Management** web application built with **Node.js**, **Express.js**, **EJS**, and **PostgreSQL**. This project was developed as part of a Docker containerization assignment, where the application was containerized incrementally by following Docker best practices through multiple stages.
  
  The project demonstrates how to package an application into Docker containers, optimize container images, orchestrate multiple services with Docker Compose, persist database data using Docker volumes, monitor container health, and deploy a production-ready multi-container application behind an Nginx reverse proxy.
  
  ---
  
  ## Project Objectives
  
  This project demonstrates the following Docker concepts:
  
  - Writing Dockerfiles
  - Building Docker images
  - Running containers
  - Multi-stage Docker builds
  - Image optimization
  - Running containers as non-root users
  - Using `.dockerignore`
  - Docker Compose
  - Multi-container applications
  - Docker networking
  - Environment variables
  - PostgreSQL containerization
  - Persistent Docker volumes
  - Database initialization scripts
  - Health checks
  - Docker Hub image publishing
  - Nginx Reverse Proxy
  
  ---
  
  ## Features
  
  - Create new tasks
  - View all tasks
  - Update existing tasks
  - Delete tasks
  - PostgreSQL database integration
  - Server-side rendering using EJS
  - Dockerized application
  - Multi-stage Docker build
  - Optimized production image
  - Non-root container execution
  - Docker Compose orchestration
  - Persistent database storage
  - PostgreSQL health monitoring
  - Nginx Reverse Proxy
  - Docker Hub deployment
  
  ---
  
  ## Tech Stack
  
  ### Backend
  
  - Node.js
  - Express.js
  
  ### Frontend
  
  - EJS
  - HTML
  - CSS
  
  ### Database
  
  - PostgreSQL 17
  
  ### DevOps & Containerization
  
  - Docker
  - Docker Compose
  - Nginx
  - Docker Hub
  
  ---
  
  ## Project Structure
  
  ```text
  task-manager-node-postgres/
  │
  ├── database/
  │   └── init.sql
  │
  ├── nginx/
  │   └── nginx.conf
  │
  ├── src/
  │   ├── config/
  │   ├── controllers/
  │   ├── models/
  │   ├── routes/
  │   ├── views/
  │   └── app.js
  │
  ├── .dockerignore
  ├── .env
  ├── compose.yml
  ├── Dockerfile
  ├── package.json
  ├── package-lock.json
  └── README.md
  ```
  
  ---
  
  ## Architecture
  
  ```text
                   Browser
                       │
                       ▼
                Nginx Reverse Proxy
                       │
                       ▼
              Node.js Express App
                       │
                       ▼
                 PostgreSQL Database
                       │
                       ▼
              Docker Named Volume
  ```
  
  ---
  
  ## Prerequisites
  
  Before running this project, ensure the following software is installed:
  
  - Docker Engine
  - Docker Compose
  - Git
  
  Verify the installation:
  
  ```bash
  docker --version
  docker compose version
  git --version
  ```
  
  ---
  
  ## Clone the Repository
  
  ```bash
  git clone https://github.com/Usman-Ghani-Devops/task-manager-node-postgres.git
  
  cd task-manager-node-postgres
  ```
  
  ---
  
  ## Environment Variables
  
  Create a `.env` file in the project root.
  
  ```env
  PORT=3000
  
  DB_HOST=postgres-db
  DB_PORT=5432
  DB_NAME=taskdb
  DB_USER=postgres
  DB_PASSWORD=postgres
  
  POSTGRES_DB=taskdb
  POSTGRES_USER=postgres
  POSTGRES_PASSWORD=postgres
  ```
  
  These variables are used by both the application container and the PostgreSQL container to establish a database connection without hardcoding sensitive configuration values.
  
  ---
  
  ## Development Roadmap
  
  The project was completed incrementally through the following stages:
  
  - **Stage 0** — Project Setup
  - **Stage 1** — First Docker Container
  - **Stage 2** — Image Optimization
  - **Stage 3** — Docker Compose & PostgreSQL
  - **Stage 4** — Persistent Storage & Health Checks
  - **Stage 5** — Docker Hub & Nginx Reverse Proxy
  
  Each stage is documented in detail in the following sections.
  
  ---
  
  # Stage 0 — Project Setup
  
  The first stage focused on preparing the repository for containerization by organizing the project structure and adding the necessary configuration files.
  
  ## Tasks Completed
  
  - Created the Git repository
  - Added the Node.js Task Manager application
  - Added a `.gitignore` file
  - Added a `.dockerignore` file
  - Created the initial `README.md`
  - Verified the application runs correctly before containerization
  
  ## .gitignore
  
  The `.gitignore` file prevents unnecessary files from being tracked by Git.
  
  Example:
  
  ```gitignore
  node_modules/
  .env
  ```
  
  ## .dockerignore
  
  The `.dockerignore` file reduces the Docker build context by excluding files that are not required inside the image.
  
  Example:
  
  ```dockerignore
  node_modules
  .git
  .gitignore
  README.md
  .env
  Dockerfile
  compose.yml
  ```
  
  ### Why use `.dockerignore`?
  
  Using `.dockerignore` provides several benefits:
  
  - Reduces Docker build context
  - Speeds up image builds
  - Improves Docker layer caching
  - Prevents unnecessary files from being copied into the image
  - Produces smaller images
  
  ---
  
  # Stage 1 — Containerize the Application
  
  In this stage, the application was containerized using Docker. A Dockerfile was created, the image was built, and the application was successfully executed inside a Docker container.
  
  ---
  
  
  # Build the Docker Image
  
  Build the Docker image using:
  
  ```bash
  docker build -t task-manager:v1 .
  ```
  
  Verify the image:
  
  ```bash
  docker images
  ```
  
  Example output:
  
  ```text
  REPOSITORY          TAG       IMAGE ID
  task-manager        v1        xxxxxxxxxxxx
  ```
  
  ---
  
  # Run the Container
  
  Run the application:
  
  ```bash
  docker run -d \
  --name task-manager-container \
  -p 3000:3000 \
  task-manager:v1
  ```
  
  
  # Verify the Running Container
  
  List running containers:
  
  ```bash
  docker ps
  ```
  
  Expected output:
  
  ```text
  CONTAINER ID    IMAGE            STATUS
  xxxxxxxxxxx     task-manager:v1  Up
  ```
  
  ---
  
  # Verify Application
  
  Open the application in a web browser:
  
  ```text
  http://localhost:3000
  ```
  
  Or verify using curl:
  
  ```bash
  curl http://localhost:3000
  ```
  
  If the application returns the HTML page successfully, the container has been built and deployed correctly.
  
  ---
  
  
  ## Stage 1 Summary
  
  At the end of Stage 1, the application was successfully containerized using Docker.
  
  ### Achievements
  
  - Created the first Dockerfile
  - Built a Docker image
  - Started the application inside a container
  - Published the application using port mapping
  - Verified the application using both a web browser and `curl`
  - Documented all build and run commands
  
  ---
  
  # Stage 2 — Optimize the Docker Image
  
  The initial Docker image successfully containerized the application but contained unnecessary files and development dependencies. In this stage, the Dockerfile was redesigned following Docker best practices to create a smaller, more secure, and production-ready image.
  
  ---
  
  ## Objectives
  
  - Implement a multi-stage Docker build
  - Reduce the final image size
  - Install only production dependencies
  - Run the application as a non-root user
  - Improve Docker layer caching
  
  
  ---
  
  
  # Improvements Made
  
  ## Multi-stage Build
  
  Instead of using a single stage, the Dockerfile was divided into two stages.
  
  ### Builder Stage
  
  Responsible for:
  
  - Installing dependencies
  - Preparing the application files
  
  ### Production Stage
  
  Responsible for:
  
  - Copying only the required files
  - Running the application
  
  This removes unnecessary files from the final image.
  
  ---
  
  ## Small Base Image
  
  Instead of using the default Node.js image, a slim image was selected.
  
  ```dockerfile
  FROM node:22-slim
  ```
  
  Benefits:
  
  - Smaller image size
  - Reduced attack surface
  - Faster download time
  - Faster deployment
  
  ---
  
  ## Production Dependencies Only
  
  Instead of:
  
  ```dockerfile
  npm install
  ```
  
  the optimized Dockerfile uses
  
  ```dockerfile
  npm install --omit=dev
  ```
  
  This excludes development dependencies
  
  Only the packages required to run the application are included in the production image.
  
  ---
  
  ## Non-root User
  
  The application runs as
  
  ```dockerfile
  USER node
  ```
  
  ```
  
  Running containers as a non-root user is considered a Docker security best practice because it reduces the impact of potential container compromises.
  
  ---
  
  ## Docker Layer Caching
  
  The dependency files are copied before the application source code.
  
  ```dockerfile
  COPY package*.json ./
  
  RUN npm install --omit=dev
  
  COPY . .
  ```
  
  This improves build performance.
  
  If only the application code changes, Docker can reuse the cached dependency layer instead of reinstalling all packages.
  
  ---
  
  
  ## npm Cache Cleanup
  
  After installing dependencies, the npm cache is removed.
  
  ```dockerfile
  npm cache clean --force
  ```
  
  Removing the npm cache helps reduce the image size by eliminating temporary installation files that are no longer needed.
  
  ---
  
  # Image Size Comparison
  
  
  | Docker Image | Size |
  |--------------|------|
  | Before Optimization | 412 MB |
  | After Optimization | 81 MB |
  
  ---
  
  # Why Did the Image Size Decrease?
  
  Several optimizations contributed to the reduction in image size:
  
  - Multi-stage builds removed unnecessary build files.
  - Only production dependencies were installed.
  - Development packages were excluded.
  - The npm cache was cleaned.
  - The slim Node.js base image reduced the operating system footprint.
  - Only the required application files were copied into the final image.
  
  ---
  
  # Build the Optimized Image
  
  ```bash
  docker build -t task-manager:v2 .
  ```
  
  ---
  
  # Verify the Image
  
  ```bash
  docker images
  ```
  
  Example:
  
  ```text
  REPOSITORY      TAG      SIZE
  task-manager    v2       81MB
  ```
  
  ---
  
  # Run the Optimized Container
  
  ```bash
  docker run -d \
  --name task-manager-container \
  -p 3000:3000 \
  task-manager:v2
  ```
  
  ---
  
  # Verify the Application
  
  Open the application:
  
  ```
  http://localhost:3000
  ```
  
  Or use:
  
  ```bash
  curl http://localhost:3000
  ```
  
  ---
  
  # Stage 2 Summary
  
  At the end of Stage 2, the Docker image became significantly smaller, faster to build, and more secure.
  
  ### Achievements
  
  - Implemented a multi-stage Docker build
  - Used a slim base image
  - Installed only production dependencies
  - Improved Docker layer caching
  - Removed npm cache
  - Executed the application as a non-root user
  - Reduced the overall image size
  - Created a production-ready Docker image
  
  ---
  
  # Stage 3 — Multi-Container Application with Docker Compose
  
  After successfully containerizing the application, the next step was to run both the application and PostgreSQL database together using Docker Compose.
  
  Docker Compose simplifies the deployment of multi-container applications by defining all services in a single configuration file.
  
  ---
  
  ## Objectives
  
  - Add a PostgreSQL database container
  - Run multiple containers with a single command
  - Create an isolated Docker network
  - Configure the application using environment variables
  - Ensure the application starts after the database
  
  ---
  
  
  # Services
  
  The Compose file consists of two services.
  
  ## Application Service
  
  The application service is responsible for running the Node.js Task Manager application.
  
  Features:
  
  - Builds the image using the Dockerfile
  - Connects to the Docker network
  
  ---
  
  ## Database Service
  
  The PostgreSQL service provides persistent storage for the application.
  
  Features:
  
  - Uses the official PostgreSQL image
  - Initializes the database using `init.sql`
  - Shares the same Docker network as the application
  
  ---
  
  # Docker Network
  
  Both containers are connected using a custom Docker bridge network.
  
  ```text
  Task-Manager-network
  
  ┌───────────────┐
  │ Node.js App   │
  └───────┬───────┘
          │
          │
  ┌───────▼───────┐
  │ PostgreSQL    │
  └───────────────┘
  ```
  
  Docker automatically creates DNS entries for every service.
  
  The application connects to PostgreSQL using
  
  ```text
  DB_HOST=postgres-db
  ```
  
  instead of using an IP address.
  
  ---
  
  # Starting the Stack
  
  Build and start all services:
  
  ```bash
  docker compose up 
  ```
  
  Docker Compose automatically:
  
  - Builds the application image
  - Downloads PostgreSQL
  - Creates the Docker network
  - Starts PostgreSQL
  - Starts the application
  
  ---
  
  # Verify Running Services
  
  ```bash
  docker compose ps
  ```
  
  Example:
  
  ```text
  NAME            STATUS
  Task-Manager    Up
  postgres-db     Up 
  ```
  
  ---
  
  
  # Stage 3 Summary
  
  At the end of Stage 3, the application and PostgreSQL database were successfully deployed as a multi-container application using Docker Compose.
  
  ### Achievements
  
  - Added PostgreSQL
  - Created a Docker Compose configuration
  - Connected services using a Docker network
  - Configured the application using environment variables
  - Used Docker DNS for service discovery
  - Started multiple containers using a single command
  
  ---
  
  # Stage 4 — Persistence, Configuration & Health Checks
  
  Stage 4 focused on making the application more production-ready by adding persistent storage, externalizing configuration, and monitoring container health.
  
  ---
  
  ## Objectives
  
  - Persist PostgreSQL data
  - Initialize the database automatically
  - Move configuration into a `.env` file
  - Add container health checks
  - Ensure the application waits until PostgreSQL is ready
  
  ---
  
  # Persistent Storage
  
  A named Docker volume was added.
  
  ```yaml
  volumes:
    - Task-Manager-Volume:/var/lib/postgresql/data
  ```
  
  ---
  
  ## Why use a Docker Volume?
  
  Without a volume:
  
  ```text
  Delete Container
         ↓
  Database Lost
  ```
  
  With a volume:
  
  ```text
  Delete Container
         ↓
  Volume
         ↓
  Database Preserved
  ```
  
  This ensures that data survives:
  
  - Container recreation
  - Docker Compose down/up
  - Image rebuilds
  
  ---
  
  # Database Initialization
  
  The SQL initialization script is mounted into PostgreSQL.
  
  ```yaml
  volumes:
    - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
  ```
  
  When PostgreSQL starts for the first time, it automatically executes:
  
  ```
  database/init.sql
  ```
  
  This creates the required database tables without any manual intervention.
  
  ---
  
  # Health Check
  
  A PostgreSQL health check was added.
  
  ```yaml
  healthcheck:
    test: ["CMD-SHELL","pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"]
    interval: 10s
    timeout: 5s
    retries: 5
    start_period: 10s
  ```
  
  The health check continuously verifies that PostgreSQL is ready to accept connections.
  
  ---
  
  # depends_on
  
  The application depends on PostgreSQL.
  
  ```yaml
  depends_on:
    db:
      condition: service_healthy
  ```
  
  Instead of starting immediately, Docker Compose waits until PostgreSQL reports a healthy status.
  
  Startup sequence:
  
  ```text
  PostgreSQL
        │
  Health Check
        │
  Healthy
        │
  Application Starts
  ```
  
  ---
  
  # Verify Persistence
  
  1. Start the application.
  
  ```bash
  docker compose up -d
  ```
  
  2. Create a few tasks.
  
  3. Stop the stack.
  
  ```bash
  docker compose down
  ```
  
  4. Start the stack again.
  
  ```bash
  docker compose up -d
  ```
  
  The previously created tasks remain available because the database is stored in a persistent Docker volume.
  
  ---
  
  # Verify Health
  
  Check service status:
  
  ```bash
  docker compose ps
  ```
  
  Example:
  
  ```text
  NAME            STATUS
  Task-Manager    Up
  postgres-db     Up (healthy)
  ```
  
  The `(healthy)` status confirms that PostgreSQL passed its health check.
  
  ---
  
  # Stage 4 Summary
  
  At the end of Stage 4, the application became significantly more reliable and production-ready.
  
  ### Achievements
  
  - Added a named Docker volume
  - Enabled persistent PostgreSQL storage
  - Automated database initialization
  - Externalized configuration using a `.env` file
  - Added PostgreSQL health checks
  - Configured service dependencies using `depends_on`
  - Ensured the application starts only after the database is healthy
  
  ---
  
  # Stage 5 — Deploy the Application
  
  The final stage focused on preparing the application for deployment by publishing the Docker image to Docker Hub and placing an Nginx reverse proxy in front of the application.
  
  ---
  
  ## Objectives
  
  - Tag the application image
  - Push the image to Docker Hub
  - Configure an Nginx reverse proxy
  - Deploy the complete stack using Docker Compose
  - Document the deployment process
  
  ---
  
  # Docker Hub
  
  
  ## Login to Docker Hub
  
  ```bash
  docker login
  ```
  
  ---
  
  ## Push the Image
  
  ```bash
  docker push <dockerhub-username>/task-manager:v1
  ```
  
  ---
  
  ## Verify
  
  Visit your Docker Hub repository and confirm that the image has been uploaded successfully.
  
  ---
  
  # Nginx Reverse Proxy
  
  Instead of exposing the Node.js application directly to users, an Nginx container is placed in front of the application.
  
  ```
  Browser
       │
       ▼
   Nginx (Port 80)
       │
       ▼
  Node.js App
       │
       ▼
   PostgreSQL
  ```
  
  Benefits of using Nginx:
  
  - Acts as a reverse proxy
  - Handles incoming client requests
  - Forwards requests to the application
  - Hides the application container from clients
  - Provides a production-ready architecture
  - Can be extended later for SSL, caching, and load balancing
  
  ---
  
  # Nginx Configuration
  
  ```nginx
  events {}
  
  http {
  
      server {
  
          listen 80;
  
          location / {
  
              proxy_pass http://app:3000;
  
              proxy_http_version 1.1;
  
              proxy_set_header Host $host;
              proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
              proxy_set_header X-Forwarded-Proto $scheme;
  
          }
  
      }
  
  }
  ```
  
  ---
  
  # Docker Compose Architecture
  
  ```
                   Browser
                       │
                       ▼
                Nginx (Port 80)
                       │
                       ▼
              Node.js Application
                       │
                       ▼
               PostgreSQL Database
                       │
                       ▼
              Docker Named Volume
  ```
  
  ---
  
  # Deploy From Scratch
  
  ### 1. Clone the Repository
  
  ```bash
  git clone https://github.com/Usman-Ghani-Devops/task-manager-node-postgres.git
  
  cd task-manager-node-postgres
  ```
  
  ---
  
  ### 2. Create the Environment File
  
  Create a `.env` file in the project root.
  
  ```env
  PORT=3000
  
  DB_HOST=postgres-db
  DB_PORT=5432
  DB_NAME=taskdb
  DB_USER=postgres
  DB_PASSWORD=postgres
  
  POSTGRES_DB=taskdb
  POSTGRES_USER=postgres
  POSTGRES_PASSWORD=postgres
  ```
  
  ---
  
  ### 3. Start the Complete Stack
  
  ```bash
  docker compose up -d
  ```
  
  Docker Compose will automatically:
  
  - Build the application image
  - Start PostgreSQL
  - Initialize the database
  - Wait until PostgreSQL becomes healthy
  - Start the Node.js application
  - Start the Nginx reverse proxy
  
  ---
  
  ### 4. Verify Running Containers
  
  ```bash
  docker compose ps
  ```
  
  Expected output:
  
  ```text
  NAME            STATUS
  Task-Manager    Up
  postgres-db     Up (healthy)
  nginx           Up
  ```
  
  ---
  
  ### 5. Access the Application
  
  Open your browser:
  
  ```
  http://localhost
  ```
  
  Since Nginx is listening on port **80**, all requests are forwarded to the Node.js application running inside the Docker network.
  
  ---
  
  # Useful Docker Compose Commands
  
  Start:
  
  ```bash
  docker compose up -d
  ```
  
  Stop:
  
  ```bash
  docker compose down
  ```
  
  Rebuild:
  
  ```bash
  docker compose up --build
  ```
  
  Restart:
  
  ```bash
  docker compose restart
  ```
  
  View logs:
  
  ```bash
  docker compose logs
  ```
  
  Application logs:
  
  ```bash
  docker compose logs app
  ```
  
  Database logs:
  
  ```bash
  docker compose logs db
  ```
  
  Nginx logs:
  
  ```bash
  docker compose logs nginx
  ```
  
  ---
  # DevOps Automation

In addition to containerizing the application, this project includes a lightweight DevOps automation system built using Python. The automation follows the **Single Responsibility Principle (SRP)**, where each script performs one well-defined task. Instead of combining monitoring, analysis, notification, and deployment into a single script, the system is divided into multiple independent components.

This modular architecture makes the project easier to understand, maintain, test, and extend. Each component can be developed independently without affecting the others.

The automation workflow is shown below.

```text
                Project Files
                      │
                      ▼
               monitor.py
                      │
        Detects file system changes
                      │
                      ▼
              log/monitor.log
                      │
                      ▼
                agent.py
                      │
       Reads and analyzes logs
                      │
      Generates project report
                      │
      Sends email notification
                      
```

The current implementation includes:

* `monitor.py`
* `agent.py`

---

# monitor.py — File System Monitor

The purpose of `monitor.py` is to continuously monitor the project directory and detect changes made to project files.

It acts as the observer of the automation pipeline.

Unlike deployment or notification scripts, the monitor does not make decisions, send emails, build Docker images, or communicate with cloud services. Its only responsibility is to detect changes and record them inside a log file.

This keeps the monitoring process lightweight, reliable, and easy to maintain.

## Responsibilities

The monitor performs the following tasks:

* Watches the project directory continuously
* Detects newly created files
* Detects modified files
* Detects deleted files
* Records every event in `log/monitor.log`
* Adds timestamps to every log entry
* Maintains a complete history of file system activity

Example log entries:

```text
2026-07-14 17:30:12 INFO New file: routes/auth.js
2026-07-14 17:31:45 INFO Modified: src/app.js
2026-07-14 17:32:10 INFO Modified: Dockerfile
2026-07-14 17:33:58 INFO Delete file: temp.txt
```

Each log entry contains:

* Timestamp
* Log level
* Event type
* File name

The monitor intentionally performs **no additional processing**.

It does **not**:

* Analyze changes
* Generate reports
* Send notifications
* Build Docker images

Its only responsibility is to produce `monitor.log`.


## Running Manually

Run the monitor using:

```bash
python3 monitor.py
```

Stop the program with:

```text
Ctrl + C
```

---

# Running as a Systemd Service

## Step 1: Create Service File

Create the service file:

```bash
sudo nano /etc/systemd/system/project-monitor.service
```

Paste:

```ini
[Unit]
Description=Project File Monitor
After=network.target

[Service]
Type=simple
User=YOUR_USERNAME
WorkingDirectory=/home/YOUR_USERNAME/docker/task-manager-node-postgres
ExecStart=/usr/bin/python3 /home/YOUR_USERNAME/docker/task-manager-node-postgres/monitor.py
Restart=always

[Install]
WantedBy=multi-user.target
```

Replace:

- `YOUR_USERNAME` with your Linux username.
---

## Step 2: Reload systemd

```bash
sudo systemctl daemon-reload
```

---

## Step 3: Enable Service

Start automatically after every boot:

```bash
sudo systemctl enable project-monitor
```

---

## Step 4: Start Service

```bash
sudo systemctl start project-monitor
```

---

## Step 5: Verify Status

```bash
sudo systemctl status project-monitor
```

Expected:

```text
Active: active (running)
```

---


## Enable on boot:

```bash
sudo systemctl enable project-monitor
```

# agent.py — Change Analysis & Notification Agent

While `monitor.py` records file system events, `agent.py` is responsible for understanding those events and notifying the developer.

The agent reads the monitoring log, extracts file changes, categorizes them, analyzes their impact, generates recommendations, prepares a project report, and sends that report to the developer through email.

Unlike the monitor, the agent performs decision-making based on the recorded events.

## Responsibilities

The agent currently performs the following tasks:

* Reads `log/monitor.log`
* Parses monitoring logs
* Categorizes file changes
* Detects important project modifications
* Generates recommendations
* Creates a project analysis report
* Sends an email notification to the configured recipient

---

# Log Analysis

After reading the monitoring log, the agent categorizes every detected event.

For example:

```text
2026-07-14 17:30:12 INFO Modified: Dockerfile
2026-07-14 17:31:45 INFO Modified: package.json
2026-07-14 17:32:18 INFO Modified: src/app.js
2026-07-14 17:33:20 INFO New file: routes/auth.js
```

The agent automatically separates these events into categories.

### Modified Files

```text
Dockerfile
package.json
src/app.js
```

### New Files

```text
routes/auth.js
```

### Deleted Files

```text
None
```

Organizing changes into categories allows the agent to understand the overall impact of recent modifications.

---

# Change Detection

The agent currently detects three important categories of project changes.

## Docker Configuration Changes

Whenever the `Dockerfile` is modified, the agent recognizes that the Docker image may no longer represent the latest version of the application.

Recommendation:

```text
Rebuild Docker image
```

---

## Dependency Changes

Whenever dependency files such as `package.json` are modified, the agent determines that application dependencies have changed.

Recommendation:

```text
Install updated dependencies
```

---

## Source Code Changes

Whenever JavaScript source files are modified, the agent recognizes that the application's behavior may have changed.

Recommendation:

```text
Run application tests
```

---

# Email Notification

After analyzing the project, the agent automatically generates a summary report and sends it to the configured email address.

The email contains:

* Summary of detected changes
* Modified files
* New files
* Deleted files
* Project analysis
* Deployment recommendations

This allows developers to stay informed about project changes without manually checking log files.

---

# Configuring Email Notifications

Email credentials are stored separately from the application configuration by using a dedicated `.agent.env` file.

Keeping agent configuration separate from the application's `.env` file improves security and follows good configuration management practices.

Create a file named:

```text
.agent.env
```

inside the project root.

Example:

```env
EMAIL_SENDER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
EMAIL_RECEIVER=recipient-email@gmail.com
```

The agent loads these values automatically using the `python-dotenv` package.

> **Important:** Gmail does **not** allow using your normal account password. You must create a **Google App Password** and use it as `EMAIL_PASSWORD`.

---

# Installing Python Dependencies

The automation scripts require a few Python packages.

It is recommended to use a Python virtual environment.

### Create a virtual environment

```bash
python3 -m venv .venv
```

### Activate the virtual environment

Linux/macOS

```bash
source .venv/bin/activate
```

Windows

```powershell
.venv\Scripts\activate
```

### Install required packages

```bash
pip install python-dotenv
```

---

# Running the Automation

The monitor continuously watches the project directory and records file changes.

To analyze the recorded changes and send an email notification:

```bash
python agent.py
```

The agent will:

1. Read `monitor.log`
2. Analyze detected changes
3. Generate a project report
4. Send the report to the configured email address

---

# Why Separate monitor.py and agent.py?

Although monitoring and analysis could be implemented inside a single script, separating these responsibilities provides several benefits.

* Cleaner architecture
* Easier maintenance
* Better scalability
* Independent testing
* Simpler debugging
* Ability to replace the notification system without modifying the monitor
* Ability to integrate future deployment automation without affecting existing components

This design closely resembles how production monitoring and automation systems are structured.

---

# Future Automation Roadmap

The current implementation forms the foundation of a complete DevOps automation pipeline.

Future improvements include:

* AI-powered change analysis
* Automatic Docker image building
* Docker image tagging
* CI/CD pipeline integration
  
  # Future Project Improvements
  
  The project can be enhanced by adding:
  
  - HTTPS with Let's Encrypt
  - Multi-stage production deployments
  - CI/CD pipeline using GitHub Actions
  - Kubernetes deployment
  - Redis caching
  - Horizontal scaling with multiple application containers
  
  ---
  
  # Learning Outcomes
  
  Through this project, the following Docker concepts were implemented and practiced:
  
  - Docker images
  - Docker containers
  - Dockerfiles
  - Multi-stage builds
  - Docker layer caching
  - Non-root containers
  - Image optimization
  - Docker Compose
  - Docker networking
  - Environment variables
  - PostgreSQL containerization
  - Named volumes
  - Health checks
  - Service dependencies
  - Docker Hub
  - Nginx reverse proxy
  
  ---
  
  # Author
  
  **Usman Ghani**
  
  BS Software Engineering  
  
  
  ---
  
  # License
  
  This project was developed for educational purposes as part of a Docker containerization assignment.
