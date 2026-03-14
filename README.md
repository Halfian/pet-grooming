## Pet Grooming Booking App

A full‑stack web application for managing pet grooming services, built with React + Vite on the frontend and Node.js + Express + PostgreSQL on the backend.
Users can:

- Browse available grooming services
- Register/login with role‑based access (customer/admin)
- Add pets
- Create bookings linked to pets and services

## Tech Stack

- Frontend: React, Vite, TailwindCSS, Zustand
- Backend: Node.js, Express, PostgreSQL
- Auth: JWT with bcrypt password hashing

## Setup Instruction

1. Clone the repo
   - git clone https://github.com/<your-username>/pet-grooming.git
   - cd pet-grooming
2. Install dependencies
   - npm install
3. Configure environment variable
   Create .env with details
   - PGUSER=postgres
   - PGHOST=localhost
   - PGDATABASE=pet_grooming
   - PGPASSWORD=yourpassword
   - PGPORT=5432
   - JWT_SECRET=yourjwtsecret
4. Run in development
   npm start

## Screenshot

- Admin Page
  ![Admin Page](./screenshots/admin-dashboard.png)
- Booking Form
  ![Booking Form](./screenshots/customer-booking-form1.png)
  ![Booking Form2](./screenshots/customer-booking-form2.png)
