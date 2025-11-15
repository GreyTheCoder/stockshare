StockShare – Full-Stack Trading Dashboard

StockShare is a full-stack MERN-based project consisting of three separate applications: a backend API, an admin/analytics dashboard, and a user-facing frontend. The system provides user authentication, order management, holdings tracking, and a responsive dashboard interface.

Project Structure

The repository contains three main folders:

1. Backend (Node.js + Express + MongoDB)

Handles all server-side functionality, including:

User authentication with Passport.js (Local Strategy)

Session management

MongoDB database integration using Mongoose

Holdings, Positions, Orders, and User models

REST APIs consumed by the dashboard and frontend

Tech Stack

Node.js

Express.js

MongoDB + Mongoose

Passport.js (Local Auth)

express-session

CORS

body-parser

Deployed On:
Render
Backend URL:
https://stockshare-backend.onrender.com/

2. Dashboard (React)

A React-based UI connected directly to the backend. It provides authenticated users with:

Holdings overview

Positions data

Orders data

User management operations (depending on your implementation)

Real-time display of API data from the backend

This dashboard is the core interface for interacting with the backend services.

Deployed On:
Netlify
Dashboard URL:
https://stockshare-dashboard.netlify.app/

3. Frontend (React)

A separate React application serving as the public-facing entry point for users.
Its flow is:

Users can sign up or log in from the frontend

Upon successful authentication, the user is redirected to the Dashboard, which communicates directly with the backend

The frontend acts as a gateway and user-access layer between the user and the dashboard.

Deployed On:
Netlify
Frontend URL:
https://stockshare-frontend.netlify.app/

Architecture Overview
Frontend (React)  --->  Dashboard (React)  --->  Backend API (Node + Express + MongoDB)
          |                       |                             |
Netlify Hosting            Netlify Hosting                  Render Hosting



