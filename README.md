# Real Value Marketing – Website & Serverless WebApp

Landing page and lead generation web application connected to Odoo CRM using a **serverless backend on AWS**.

This project is designed for B2B companies and business owners who want a clean,
high‑converting website with a professional, scalable, and low‑cost CRM integration.

---

## 🌐 Project Overview

**Project name:**  
Real Value Marketing Website and WebApp

**Objective:**  
High‑conversion landing page + lead generation system connected to Odoo CRM via AWS Lambda.

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

### Backend (Serverless)
- Node.js 18
- AWS Lambda
- AWS API Gateway (**HTTP API**)
- Serverless Framework (v4)
- Odoo JSON‑RPC 2.0 API
- **No persistent servers**
- **Pay‑per‑use (near‑zero idle cost)**

---

## 📁 Project Structure

This repository is a **monorepo** containing both frontend and backend.

### Full structure

```
real-value-marketing/
├── backend
│   ├── event.json                 # Sample event for local Lambda testing
│   ├── package.json
│   ├── package-lock.json
│   ├── serverless.yml             # AWS infrastructure definition
│   └── src
│       ├── handler.js             # Lambda entrypoint
│       ├── odooClient.js          # Odoo JSON-RPC client
│       ├── responses.js           # HTTP + CORS helpers
│       └── validators.js          # Payload validation
│
├── frontend
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── cropped_circle_image.svg
│   │   ├── favicon.svg
│   │   ├── robots.txt
│   │   └── vite.svg
│   ├── src
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── main.tsx
│   │   ├── index.css
│   │   ├── assets
│   │   │   ├── icons
│   │   │   ├── images
│   │   │   └── logos
│   │   ├── components
│   │   │   ├── layout
│   │   │   ├── marketing
│   │   │   └── ui
│   │   ├── data
│   │   │   ├── blogPosts.ts
│   │   │   ├── faq.ts
│   │   │   └── services.ts
│   │   ├── hooks
│   │   │   ├── useScrollReveal.ts
│   │   │   └── useScrollToTop.ts
│   │   ├── pages
│   │   │   ├── Home.tsx
│   │   │   ├── BookCall.tsx
│   │   │   ├── Newsletter.tsx
│   │   │   └── Blog
│   │   ├── router
│   │   │   └── AppRouter.tsx
│   │   ├── styles
│   │   │   ├── globals.css
│   │   │   └── variables.css
│   │   ├── types
│   │   │   ├── blog.ts
│   │   │   └── forms.ts
│   │   └── utils
│   │       └── validators.ts
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── vercel.json
│   └── vite.config.ts
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
- Clear CTA‑focused design

### Book a Call (Lead Generation)
- Form with inline validation UX
- Sends data to AWS Lambda via API Gateway
- Creates CRM leads in Odoo

### Odoo CRM Integration
When a user submits the **Book a Call** form:

1. Searches for an existing company or contact
2. If not found:
   - Creates a company (parent partner)
   - Creates a contact linked to that company
3. Creates a CRM lead linked to the contact

This prevents duplicate contacts and keeps CRM data clean and structured.

---

## 🛡️ Anti‑Spam & Reliability

This project relies on **AWS‑native protections**, without paid services:

- AWS Lambda **account‑level concurrency limits** cap parallel executions
- Burst or bot traffic is automatically rejected by AWS
- Protects Odoo from overload
- No API keys, no WAF, no additional cost

This provides **implicit rate limiting**, ideal for B2B lead forms.

---

## ⚙️ Environment Variables

### Backend (`/backend/.env`)
```env
ODOO_URL=https://your-odoo-instance.odoo.com
ODOO_DB=your_database_name
ODOO_USER=your_user_email
ODOO_PASSWORD=your_password
```

> AWS credentials are **not committed** and should be configured via AWS CLI profiles or temporary environment variables.

### Frontend (`/frontend/.env`)
```env
VITE_API_URL=https://your-api-gateway-url
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

### Backend (local Lambda invoke)
```bash
cd backend
npm install
npx serverless invoke local -f createLead -p event.json
```

---

## 🚀 Deployment

### Backend (AWS – Serverless)
```bash
cd backend
npx serverless deploy
```

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
- Environment variable:
  ```
  VITE_API_URL=https://your-api-gateway-url
  ```

---

## 🔐 Security Notes

- Frontend never communicates directly with Odoo
- All Odoo credentials live only in AWS Lambda
- CORS enforced at API Gateway
- No long‑running servers
- `.env` files excluded from version control

---

## 📦 Repository Status

- Repository visibility: **Private / Client‑owned**
- Infrastructure: **AWS account owned by client**
- All credentials and sensitive data are excluded

---

## 📄 License

This project is client‑owned and not intended for redistribution.
