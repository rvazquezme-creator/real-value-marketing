# Real Value Marketing – Website & Serverless WebApp

Landing page and lead generation web application connected to Odoo CRM using a **serverless backend on AWS**.

This project is designed for B2B companies and business owners who want a clean,
high-converting website with a professional, scalable, and low-cost CRM integration.

---

## 🌐 Project Overview

**Project name:**  
Real Value Marketing Website and WebApp

**Objective:**  
High-conversion landing page + lead generation system connected to Odoo CRM via AWS Lambda.

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
- AWS API Gateway (HTTP API)
- Serverless Framework
- Odoo JSON-RPC 2.0 API
- **No persistent servers**
- **Pay-per-use (near-zero idle cost)**

---

## 📁 Project Structure

This repository is a **monorepo** containing both frontend and backend:

```
real-value-marketing/
├── frontend/                # React + Vite frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── .env
│
├── backend/                 # Serverless AWS backend
│   ├── src/
│   │   ├── handler.js       # Lambda entrypoint
│   │   ├── odooClient.js    # Odoo JSON-RPC client
│   │   ├── validators.js    # Payload validation
│   │   └── responses.js    # HTTP & CORS helpers
│   ├── serverless.yml       # AWS infrastructure definition
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

### Newsletter
- Placeholder form
- Ready for future integration

### Blog
- Static / mock data
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
```

> AWS credentials are **not committed** and should be configured via:
> - Environment variables (development only), or
> - AWS CLI profiles (recommended for production)

---

### Frontend (`/frontend/.env`)
```env
VITE_API_URL=https://your-api-gateway-url
```

Example (local development):
```env
VITE_API_URL=http://localhost:5173
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

### Backend (Local Lambda Invocation)
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

This deploys:
- AWS Lambda function
- API Gateway HTTP endpoint
- CloudWatch logs

Example endpoint:
```
POST https://xxxx.execute-api.us-east-1.amazonaws.com/leads
```

---

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
- Add environment variable:
  ```
  VITE_API_URL=https://your-api-gateway-url
  ```

---

## 🔐 Security Notes

- Frontend never communicates directly with Odoo
- All Odoo credentials live only in AWS Lambda
- CORS is enforced at API Gateway level
- No long-running servers
- `.env` files are excluded from version control

---

## 📦 Repository Status

- Repository visibility: **Private / Client-owned**
- Infrastructure: **AWS account owned by client**
- All credentials and sensitive data are excluded

---

## 📌 Notes

This architecture is designed to be:
- Cost-efficient
- Scalable
- Easy to migrate between AWS accounts
- Production-ready for B2B lead generation

---

## 📄 License

This project is client-owned and not intended for redistribution.
