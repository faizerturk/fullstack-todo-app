# Fullstack Todo App

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.0.3-blue)
![React](https://img.shields.io/badge/React-18.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue)
![Jest](https://img.shields.io/badge/Jest-29.0.0-brightgreen)
![Docker](https://img.shields.io/badge/Docker-20.10.7-blue)

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architectural Decisions](#architectural-decisions)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Testing](#testing)
  - [Build](#build)
  - [Deployment](#deployment)
- [Test-Driven Development (TDD)](#test-driven-development-tdd)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Overview

The **Fullstack Todo App** is a modern, scalable application built with **Next.js** and **TypeScript**. It allows users to manage their daily tasks efficiently with features like user authentication, CRUD operations, and real-time updates. The backend is powered by **MongoDB** with **Mongoose**, ensuring robust data management. **Jest** is used for testing, and **Docker** along with **GitHub Actions** facilitates seamless CI/CD processes.

## Features

- **User Authentication:** Secure registration and login.
- **Task Management:** Create, read, update, and delete todo items.
- **Responsive Design:** Accessible on all devices.
- **Real-time Updates:** Instant feedback using React state management.
- **API Integration:** Robust API routes for data operations.
- **Comprehensive Testing:** Ensures reliability with Jest.
- **Automated Deployment:** Streamlined CI/CD with Docker and GitHub Actions.

## Technologies Used

- **Frontend:**

  - [Next.js](https://nextjs.org/) - React framework for server-side rendering.
  - [React](https://reactjs.org/) - JavaScript library for building user interfaces.
  - [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.

- **Backend:**

  - [Node.js](https://nodejs.org/) - JavaScript runtime.
  - [Express](https://expressjs.com/) - Web framework for Node.js.
  - [MongoDB](https://www.mongodb.com/) - NoSQL database.
  - [Mongoose](https://mongoosejs.com/) - MongoDB object modeling.

- **Testing:**

  - [Jest](https://jestjs.io/) - JavaScript testing framework.
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Testing utilities for React.
  - [jest-fetch-mock](https://github.com/jefflau/jest-fetch-mock) - Mocking `fetch` API.

- **Deployment & CI/CD:**
  - [Docker](https://www.docker.com/) - Containerization platform.
  - [GitHub Actions](https://github.com/features/actions) - Automate workflows.
  - [Docker Hub](https://hub.docker.com/) - Repository for Docker images.

## Architectural Decisions

### Next.js with TypeScript

Choosing **Next.js** offers server-side rendering, static site generation, and built-in API routes, enhancing performance and SEO. **TypeScript** ensures type safety, reducing runtime errors and improving developer experience.

### MongoDB with Mongoose

**MongoDB** provides a flexible schema design, ideal for handling varying data structures. **Mongoose** simplifies interactions with MongoDB, offering schema definitions and validation.

### Testing with Jest and React Testing Library

Implementing **Jest** and **React Testing Library** allows comprehensive testing of both backend and frontend components, ensuring application reliability and maintainability.

### CI/CD with Docker and GitHub Actions

Using **Docker** ensures consistency across development and production environments. **GitHub Actions** automates the build, test, and deployment processes, streamlining the development workflow.

### Path Aliasing

Configuring path aliases (`@/lib/mongoose`, `@/models/Todo`, etc.) improves code readability and maintainability by simplifying import statements.

## Getting Started

### Prerequisites

- **Node.js** (v14 or later)
- **npm** (v6 or later) or **Yarn**
- **Docker** (for deployment)
- **MongoDB** instance (local or cloud-based)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/faizerturk/fullstack-todo-app.git
   cd fullstack-todo-app
   ```

Install Dependencies:
Using npm:

       ```npm install   ```

Configure Environment Variables:
Create a .env.local file in the root directory and add the following:

MONGODB_URI=your_mongodb_connection_string

Development

Start the development server:

npm run dev

Deployment

The application is containerized using Docker and deployed via GitHub Actions. To deploy manually: 1. Build the Docker Image:
docker build -t faizerturk/todo-app:latest .

    	2.	Push to Docker Hub:
        docker push faizerturk/todo-app:latest

        	3.	Deploy to Server:

docker pull faizerturk/todo-app:latest
docker run -d -p 3000:3000 faizerturk/todo-app:latest

Contact

    •	Faize Ertürk
    •	Email: faizeozgon@gmail.com
    •	GitHub: faizerturk
    •	LinkedIn: linkedin.com/in/faizeerturk
