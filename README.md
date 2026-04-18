## Pet Grooming Booking App
Pet Grooming Booking App helps pet owners easily schedule grooming services online, while giving admins tools to manage bookings and customer data.

---

## ✨ Features
- Role‑based authentication (customer/admin)
- Secure login with JWT + bcrypt
- Add pets or choose recorded pet details
- Create bookings linked to pets and services
- Admin dashboard for managing bookings
- Responsive UI built with TailwindCSS

---

## 🛠 Tech Stack

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)

- **Frontend:** React, Vite, TailwindCSS, Zustand  
- **Backend:** Node.js, Express, PostgreSQL  
- **Auth:** JWT with bcrypt password hashing  

---

## Setup Instruction
1. Clone the repo
   ```bash
   - git clone https://github.com/Halfian/pet-grooming.git
   - cd pet-grooming
2. Install dependencies
   - npm install
3. Configure environment variable
   Copy .env.example to .env and update values with your own credentials (PostgreSQL and JWT values).
4. Run in development
   npm start (starts backend + frontend concurrently)

---

## Live Demo
https://halfian.github.io/pet-grooming/

---

## Screenshot
- Admin Page
  ![Admin Page](./screenshots/admin-dashboard.png)
- Booking Form
  ![Booking Form](./screenshots/customer-booking-form1.png)
  ![Booking Form2](./screenshots/customer-booking-form2.png)

---

## Deployment
Frontend hosted on GitHub Pages, backend deployed with Neon + Vercel. CI/CD via GitHub Actions.

---

## Future Improvements
- Payment integration
- Email notifications for bookings
- Admin analytics dashboard