# Real Value Marketing – Website & WebApp

Landing page and lead generation web application connected to Odoo CRM.

This project is designed for B2B companies and business owners who want a clean,
high-converting website with a professional CRM integration.

---

## 🌐 Project Overview

**Project name:**  
Real Value Marketing Website and WebApp

**Objective:**  
Landing page + lead generation system connected to Odoo CRM.

**Target audience:**  
Business owners / B2B companies

**Domain:**  
https://realvaluemarketing.com

---

## 🧱 Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Custom CSS (no UI frameworks)
- Deployed on **Vercel**

### Backend
- Node.js
- Express
- Odoo JSON-RPC 2.0 API
- Deployed on **Railway**

---

## 📁 Project Structure

This repository is a **monorepo** containing both frontend and backend:

```
real-value-marketing/
├── frontend/        # React + Vite frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── .env
│
├── backend/         # Node.js + Express API
│   ├── server.js
│   ├── odooClient.js
│   ├── package.json
│   └── .env
│
├── README.md
└── .gitignore
```

Each folder is an **independent Node.js project** with its own dependencies.

---

## ✨ Main Features

### Website
- Modern, responsive landing page
- Animated UI and smooth scrolling
- Clear CTA-focused design

### Book a Call (Lead Generation)
- Form with inline validation UX
- Sends data to backend API
- Creates CRM leads in Odoo

### Odoo CRM Integration
When a user submits the Book a Call form:
1. Searches for an existing contact by email
2. If not found:
   - Creates a company (parent)
   - Creates a contact linked to that company
3. Creates a CRM lead linked to the contact

This prevents duplicate contacts and keeps CRM data clean.

### Newsletter
- Placeholder form for now
- Ready for future integration

### Blog
- Static / mock data for now
- Ready for future CMS or API integration

> ⚠️ All current data is **test data only**.

---

## ⚙️ Environment Variables

### Backend (`/backend/.env`)
```env
ODOO_URL=https://your-odoo-instance.odoo.com
ODOO_DB=your_database_name
ODOO_USER=your_user_email
ODOO_PASSWORD=your_password
FRONTEND_ORIGIN=https://realvaluemarketing.com
FRONTEND_ORIGIN_WWW=https://www.realvaluemarketing.com
```

---

### Frontend (`/frontend/.env`)
```env
VITE_API_URL=https://your-backend-url
```

Example (local development):
```env
VITE_API_URL=http://localhost:3001
```

---

## 🧪 Local Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Runs on:
```
http://localhost:5173
```

---

### Backend
```bash
cd backend
npm install
node server.js
```

Runs on:
```
http://localhost:3001
```

---

## 🚀 Deployment

### Frontend (Vercel)
- Import GitHub repository
- Set **Root Directory** to `frontend`
- Build command:
  ```
  npm run build
  ```
- Output directory:
  ```
  dist
  ```
- Add environment variables in Vercel:
  ```
  VITE_API_URL=https://your-backend-url
  ```

---

### Backend (Railway)
- Import the same GitHub repository
- Set **Root Directory** to `backend`
- Start command:
  ```
  node server.js
  ```
- Add backend environment variables in Railway dashboard

---

## 🔐 Security Notes

- Secrets are stored only in backend `.env`
- Frontend never communicates directly with Odoo
- CORS is configured for frontend → backend communication
- `.env` files are excluded from version control

---

## 📦 Repository Status

- Repository visibility: **Public**
- Project ownership: **Client-owned**
- All credentials and sensitive data are excluded

---

## 📌 Notes

- Newsletter and blog currently use placeholder data
- Ready for future expansion:
  - CMS integration
  - Marketing automation
  - Advanced CRM workflows
  - Analytics & tracking

---

## 📄 License

This project is client-owned and not intended for redistribution.
