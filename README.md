# Bitto Product Catalog

Initial MERN stack product catalog website for Bitto. This is a catalog and enquiry website, not a full e-commerce checkout system.

## Features

- React public website with home, products, product detail, about, and contact pages
- Search products by name
- Filter products by category
- Product cards with image, price, category, short description, and WhatsApp enquiry
- Product detail page with multiple images and full description
- Admin login with JWT
- Admin dashboard for category and product CRUD
- Local image uploads with Multer
- MongoDB models for admins, categories, and products

## Project Structure

```text
backend/
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    utils/
  uploads/
frontend/
  public/
  src/
    api/
    components/
    pages/
    utils/
```

## Setup

1. Install dependencies:

```bash
cd backend
npm install
cd ../frontend
npm install
```

2. Create environment files:

```bash
copy backend\.env.example backend\.env
copy frontend\.env.example frontend\.env
```

3. Update values in `backend/.env` and `frontend/.env`.

4. Seed the first admin:

```bash
cd backend
npm run seed:admin
```

5. Start the backend:

```bash
cd backend
npm run dev
```

6. Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

Default URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Admin login: `http://localhost:5173/admin/login`

## Notes

- Replace `VITE_WHATSAPP_NUMBER` with Bitto's WhatsApp number.
- The initial image upload uses local `backend/uploads`. For production hosting, swap this for Cloudinary or S3-style storage.
- Change `JWT_SECRET` and admin password before deployment.
