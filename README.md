# SkillForge

SkillForge is a MERN platform that helps learners turn skills into business ideas through roadmaps, resources, mentor sessions, questions, reviews, and progress tracking.

## Stack

- React, Vite, Tailwind CSS, Redux Toolkit, Axios
- Node.js, Express, MongoDB, Mongoose
- JWT cookies and role-based access for learners, mentors, and admins
- Cloudinary for images, videos, PDFs, and resource media

## Setup

1. Install Node.js 20+ and make sure MongoDB is reachable.
2. Copy `backend/.env.example` to `backend/.env` and fill in the values.
3. Copy `frontend/skill-nest/.env.example` to `frontend/skill-nest/.env`.
4. Install dependencies and seed development data:

```powershell
cd backend
npm install
npm run seed
```

The seed replaces only records for the named `skillforge.test` demo accounts. Do not run it against a production database.

## Environment

Backend variables are documented in [backend/.env.example](backend/.env.example): `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, `PORT`, and the three Cloudinary credentials.

Frontend uses `VITE_API_URL`, for example `http://localhost:8000` locally or the deployed API origin in production.

## Run locally

```powershell
cd backend
npm run dev
```

```powershell
cd frontend/skill-nest
npm install
npm run dev
```

## Production

Build the frontend with `npm run build` inside `frontend/skill-nest`, deploy its `dist` directory, and set `VITE_API_URL` to the HTTPS backend origin at build time. Run the backend with `npm start`, set `NODE_ENV=production`, configure `CLIENT_URL` to the frontend origin, and use HTTPS so secure cookies work.

## Deployment Guide

The intended deployment topology is:

```text
Frontend: Vercel
Backend: Render
Database: MongoDB Atlas
Media: Cloudinary
```

### MongoDB Atlas

1. Create a MongoDB Atlas cluster and database user.
2. Add the Render outbound network access rule required by your Atlas security policy. For a quick test, Atlas can allow `0.0.0.0/0`, but restrict this in production where possible.
3. Copy the Atlas connection string into Render as `MONGO_URI`.

### Cloudinary

1. Create or open a Cloudinary account.
2. Copy the Cloud name, API Key, and API Secret into the Render environment as `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.
3. Do not add Cloudinary secrets to the frontend or commit them to Git.

### Render backend

Create a Web Service rooted at `backend`:

- Build command: `npm install`
- Start command: `npm start`
- Environment: `NODE_ENV=production`
- Required variables: `PORT` (Render supplies this automatically), `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

Set `CLIENT_URL` to the final Vercel HTTPS origin, for example `https://skillforge.vercel.app`. Render should expose the service over HTTPS so the production JWT cookie settings work.

### Vercel frontend

Import the `frontend/skill-nest` directory as the Vercel project:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`
- Environment variable: `VITE_API_URL=https://your-render-service.onrender.com`

Set `VITE_API_URL` before the Vercel build. The frontend contains no Cloudinary API secret or MongoDB credential.

### Post-deployment testing

1. Open `/api/test` on the Render service and confirm the backend responds.
2. Register and log in as a learner, mentor, and admin.
3. Confirm notifications load, unread counts update, and mark-read operations work.
4. Upload a business idea image, mentor/profile image, resource thumbnail, PDF, and video.
5. Confirm Cloudinary URLs are stored and media opens from the deployed frontend.
6. Test mentor approval, resource moderation, session confirmation, question answers, and report submission.
7. Test logout and refresh behavior for all three roles.

## Demo accounts

These are development-only accounts created by `npm run seed`:

- Admin: `admin@skillforge.test` / `Admin@12345`
- Mentors: `mentor1@skillforge.test`, `mentor2@skillforge.test`, `mentor3@skillforge.test` / `Test@12345`
- Learners: `learner1@skillforge.test` through `learner5@skillforge.test` / `Test@12345`

Never use these credentials in production.