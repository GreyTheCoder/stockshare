# StockShare — Full‑Stack Trading Dashboard



StockShare is a full‑stack MERN project that simulates a trading platform and analytics dashboard. The codebase is split into three separate applications — a backend API, an admin/analytics dashboard, and a user‑facing frontend — so each piece can be developed and deployed independently. I built this to learn backend design for financial workflows, authenticated APIs, and production‑grade React dashboards.



Live deployments

- Backend: https://stockshare-backend.onrender.com/

- Dashboard (admin/analytics): https://stockshare-dashboard.netlify.app/

- Frontend (public/user entry): https://stockshare-frontend.netlify.app/



What this project does

- User authentication (local strategy) and session management

- Order creation and management (simulated trading flows)

- Holdings and positions tracking for accounts

- REST APIs powering both dashboard and frontend

- A responsive React dashboard for viewing holdings, positions, and orders



Repository layout

- /backend — Node.js + Express API, MongoDB (Mongoose)

- /dashboard — React app for analytics and admin workflows

- /frontend — React app for public users and signups



Backend (core responsibilities)

- Tech: Node.js, Express, MongoDB, Mongoose

- Auth: Passport.js (Local strategy) + express-session

- Models: Users, Orders, Holdings, Positions (with basic validation)

- API: REST endpoints consumed by the dashboard and frontend

- Middleware: CORS, body parsing, session handling

- Deployment: Render (production backend URL above)



Dashboard (admin / analytics)

- Built with React; consumes backend APIs directly

- Main views: holdings overview, positions list, orders management, user management (if enabled)

- Focused on real-time data display and quick operational workflows

- Hosted on Netlify



Frontend (public)

- React app handling signup/login and initial user flows

- Acts as the user entry point — after login it routes users to the dashboard where authenticated API calls happen

- Hosted on Netlify



Tech stack summary

- Backend: Node.js, Express, MongoDB, Mongoose, Passport.js, express-session

- Frontend & Dashboard: React (separate apps)

- Hosting: Render (backend), Netlify (frontend and dashboard)



Key features

- Local user authentication and session pers

https://github.com/user-attachments/assets/da1c2cc4-4fd2-4238-92fc-3a867ed0a7c9

istence

- Create/read/update order flows and holdings tracking

- Dashboard views for monitoring account state and orders

- Clear separation of concerns — one backend powering multiple frontends



Getting started (local dev)

1. Clone the repo

   git clone https://github.com/GreyTheCoder/stockshare.git

   cd StockShare



2. Backend

   cd backend

   npm install

   Create a `.env` with at least:

   ```

   MONGO_URI=your_mongodb_uri

   SESSION_SECRET=your_session_secret

   PORT=5000

   ```

   Start the backend:

   npm run dev   # or node index.js



3. Dashboard

   cd ../dashboard

   npm install

   Create `.env` (if needed) with the backend URL:

   ```

   REACT_APP_API_URL=http://localhost:5000

   ```

   Start:

   npm start



4. Frontend

   cd ../frontend

   npm install

   Create `.env`:

   ```

   REACT_APP_API_URL=http://localhost:5000

   ```

   Start:

   npm start



Notes

- Authentication relies on sessions — if you run the frontend and dashboard from different ports in dev, make sure your backend CORS and cookie settings allow cross‑origin requests as required.

- The platform simulates trading/orders and does not connect to real broker APIs by default. Orders and holdings are stored in MongoDB models for demonstration/testing.



API & data model (quick overview)

- /api/auth — signup, login, logout, session check

- /api/orders — create, update, list, cancel orders

- /api/holdings — view holdings for a user

- /api/positions — aggregated position data

(Endpoints and request/response shapes are in the backend routes; adjust to match your implementation.)



Security & production tips

- Keep SESSION_SECRET and MONGO_URI secret and out of the client code.

- Use HTTPS and secure cookie settings in production.

- Add rate limiting and input validation for public APIs.

- Consider token based auth (JWT) if you prefer stateless APIs for third‑party clients.



Roadmap / Improvements

- Real‑time updates with WebSockets for streaming position and order changes

- Simulated market engine for order matching and P/L calculation

- Role‑based access control (admin vs. regular user)

- Improved analytics and visualizations (charts, historical CSV export)

- Integration tests for end‑to‑end flows



Author

Gaurav Singh — Full Stack Developer (Node.js | Express | MongoDB)






