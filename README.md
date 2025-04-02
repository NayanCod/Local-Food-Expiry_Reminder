Here is the live hosted url of the site : [click to visit](https://local-food-expiry-reminder-frontend.onrender.com)

# Local items expiry reminder - Local Setup Guide

This guide will walk you through setting up and running the **Local food expiry reminder** API locally on your machine.

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

You can check if you have Node.js and npm installed by running the following commands:

```bash
node -v
npm -v
```

## Steps to run locally

- **Clone the repository**
```bash
git clone https://github.com/NayanCod/Quiz-App.git
```
## Backend Setup
- **Navigate to the backend Directory**
```bash
cd backend
```

- **Setup the Environment variables**
Create a .env file in the backend directory:
```bash
touch .env
```
Add the following environment variables to the .env file:
```bash
PORT=
MONGO_URL=
JWT_SECRET=
```

- **Install Dependencies**
```bash
npm install
```
If you encounter any errors during the installation, use the following command to install the dependencies with legacy peer dependencies:
```bash
npm install --legacy-peer-deps
````


- **Start the development Server**
```bash
npm run dev
```


This will Run your backend server locally at http://localhost:8080

