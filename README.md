# MERN Stack Application

This is a basic MERN (MongoDB, Express.js, React.js, Node.js) stack application using Vite for the frontend.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mern-app
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `server/` - Backend code (Express.js + MongoDB)
- `client/` - Frontend code (React.js + Vite)

## Features

- Basic Express.js server setup
- MongoDB connection
- React frontend with Vite
- React Router for navigation
- CORS enabled for API access
- Vite development server with hot module replacement 