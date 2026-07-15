# Bitto Product Catalog

## Live Demo

-   **Website:** https://minimalhost.online
-   **Frontend:** Vercel
-   **Backend API:** https://bitu-website.onrender.com
-   **Database:** MongoDB Atlas

------------------------------------------------------------------------

# Project Overview

Bitto Product Catalog is a full-stack MERN application for managing and
displaying products online. It provides an admin dashboard for
product/category management and a customer-facing catalog.

## Tech Stack

### Frontend

-   React.js
-   Vite
-   Axios
-   React Router DOM
-   Lucide Icons

### Backend

-   Node.js
-   Express.js
-   JWT Authentication
-   Multer
-   Morgan
-   CORS

### Database

-   MongoDB Atlas
-   Mongoose

### Deployment

-   Git & GitHub
-   Render
-   Vercel
-   Hostinger DNS

------------------------------------------------------------------------

# Features

-   Admin Login
-   JWT Authentication
-   Product Management (CRUD)
-   Category Management
-   Image Upload
-   Responsive UI
-   Product Detail Page
-   WhatsApp Integration
-   Cloud Deployment
-   Custom Domain

------------------------------------------------------------------------

# Project Structure

``` text
bitto_website/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── uploads/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── .env
│
└── README.md
```

------------------------------------------------------------------------

# Installation

## Clone Repository

``` bash
git clone <repository-url>
cd bitto_website
```

## Backend

``` bash
cd backend
npm install
npm run dev
```

Backend runs on:

``` text
http://localhost:5000
```

## Frontend

``` bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

``` text
http://localhost:5173
```

------------------------------------------------------------------------

# Environment Variables

## Backend (.env)

``` env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET
CLIENT_URL=http://localhost:5173
```

## Frontend (.env)

``` env
VITE_API_URL=http://localhost:5000
```

------------------------------------------------------------------------

# Deployment

## Backend

-   GitHub → Render
-   Environment Variables configured
-   MongoDB Atlas connected

## Frontend

-   GitHub → Vercel
-   Root Directory: `frontend`
-   Framework: Vite
-   Build Command: `npm run build`
-   Output Directory: `dist`
-   Environment Variable:
    -   `VITE_API_URL=https://bitu-website.onrender.com`

## Custom Domain

Provider: Hostinger

DNS:

  Type    Name   Value
  ------- ------ -----------------------
  A       @      Vercel provided value
  CNAME   www    cname.vercel-dns.com

------------------------------------------------------------------------

# API Endpoints

## Authentication

-   POST `/api/auth/login`

## Categories

-   GET `/api/categories`
-   POST `/api/categories`
-   PUT `/api/categories/:id`
-   DELETE `/api/categories/:id`

## Products

-   GET `/api/products`
-   GET `/api/products/:id`
-   POST `/api/products`
-   PUT `/api/products/:id`
-   DELETE `/api/products/:id`

------------------------------------------------------------------------

# Challenges Solved

-   MongoDB Atlas authentication
-   DNS resolution issues
-   Git submodule issue (frontend)
-   Render environment variables
-   Vercel root directory configuration
-   Custom domain DNS configuration
-   Production API configuration

------------------------------------------------------------------------

# Future Improvements

-   Search & Filters
-   Wishlist
-   Payment Gateway
-   User Accounts
-   Reviews & Ratings
-   Cloudinary Image Upload
-   Email Notifications

------------------------------------------------------------------------

# Author

**Developer:** Shreyansh Singh

Built using the MERN Stack with React, Node.js, Express.js, MongoDB
Atlas, Render, Vercel and Hostinger.
