<p align="center">
  <a href="https://nodejs.org/" target="blank">
    <img src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg" width="120" alt="Node.js Logo" />
  </a>
</p>
<p align="center">
  A scalable backend application built with 
  <a href="https://nodejs.org" target="_blank">Node.js</a>, 
  <a href="https://graphql.org/" target="_blank">GraphQL</a>, 
  <a href="https://www.prisma.io/" target="_blank">Prisma</a>, 
  <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a>, and 
  <a href="https://www.docker.com/" target="_blank">Docker</a>.
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/graphql" target="_blank">
    <img src="https://img.shields.io/npm/v/graphql.svg" alt="NPM Version" />
  </a>
  <a href="https://www.postgresql.org/" target="_blank">
    <img src="https://img.shields.io/badge/database-PostgreSQL-blue" alt="Database" />
  </a>
  <a href="https://www.docker.com/" target="_blank">
    <img src="https://img.shields.io/badge/container-Docker-blue" alt="Containerization" />
  </a>
  <a href="https://github.com/your-repo-name" target="_blank">
    <img src="https://img.shields.io/badge/license-MIT-brightgreen" alt="MIT License" />
  </a>
</p>

# Description
This project provides a backend server with a GraphQL API, set up with Prisma ORM to connect to a PostgreSQL database. The database is containerized using Docker for seamless environment setup and deployment.

## Prerequisites
- Docker and Docker Compose
- Node.js and npm (Node Package Manager)

###  Video Demo Link (Vimeo)
https://vimeo.com/1028583130/0ca1659b06?share=copy

## API COLLECTION
### Graphql
https://galactic-eclipse-830192.postman.co/workspace/2b579c65-95b4-44bf-a731-d6680799dad0/request/26285759-b3f0392f-0ce5-4dd7-97e0-58434a785bc4
### Websocket
https://galactic-eclipse-830192.postman.co/workspace/New-Team-Workspace~9cb9bfc7-99da-4006-b5ff-a9067fd4bd19/ws-socketio-request/672de4f97b7dd8a9609651b9

## Project Setup

### Step 1: Clone the Repositoy

https://github.com/Irfan2707/websocket-graphql-api.git

cd your-repository

### Step 2: Set Up PostgreSQL Database with Docker
## Pull PostgreSQL Docker image:

sudo docker pull postgres

### Run the PostgreSQL container:

- sudo systemctl start docker

- docker ps

- sudo docker exec -it 2f8d0beb3590 psql -U postgres

### Step 3: Run Database Migrations

### In a separate terminal, run:

npx prisma migrate deploy

### Step 4: Set Up Environment Variables

### Create a .env file and set your variables:

- DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/yourdatabase"
- JWT_SECRET="your_jwt_secret"

### Step 5: Start the Application

### Run the application:

- npm run build

- npm install

- npm start


### Available Commands

Run Migrations: npx prisma migrate deploy

- Generate Prisma Client: npx prisma generate
- Additional Resources
- Node.js Documentation
- GraphQL Documentation
- Prisma Documentation
- Docker Documentation








