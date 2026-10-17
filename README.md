# 💰 Smart Expense & Budget Management System

> **Full-Stack MERN & AI Project** as featured in Palak Kapila's Developer Portfolio.  
> Built with **React.js, Node.js, Express.js, MongoDB, Google Gemini AI, and RESTful APIs**.

---

## 🌟 Executive Overview

**Smart Expense & Budget Management System** is an intelligent personal finance platform that goes beyond traditional expense logging. It combines real-time budget tracking with **Google Gemini AI** to deliver personalized financial insights, automatic transaction categorization, spending anomaly detection, and cash-flow health scoring.

### 📌 Resume Alignment
- **Feature 1:** Full-stack tracking of income and expenses, intelligent categorization of transactions, and proactive monthly budget management.
- **Feature 2:** Robust REST APIs with query filters, date slicing, and an interactive dashboard to monitor spending patterns and budget utilization.
- **Feature 3:** Integrated **Google Gemini AI** for smart financial advice, automated categorization of raw expense descriptions, and financial health scoring.

---

## 🚀 Instant Quick Start (No Setup Required!)

A ready-to-run interactive build is saved directly on your Desktop:
👉 Simply double-click **`Smart_Expense_Tracker.html`** on your Desktop to open the full dashboard in your web browser immediately!

---

## 📂 Project Directory Structure

```text
smart-expense-budget-management/
├── package.json                   # Root package script runner
├── README.md                      # Comprehensive project documentation
├── backend/
│   ├── package.json               # Backend dependencies (Express, Mongoose, @google/genai)
│   ├── server.js                  # Main Express entry point
│   ├── .env.example               # Environment variables template
│   ├── config/
│   │   └── db.js                  # Resilient MongoDB connector
│   ├── models/
│   │   ├── Transaction.js         # Mongoose schema for transactions
│   │   └── Budget.js              # Mongoose schema for monthly budgets
│   ├── routes/
│   │   ├── transactionRoutes.js   # CRUD & summary analytics APIs
│   │   ├── budgetRoutes.js        # Budget tracking & threshold APIs
│   │   └── aiRoutes.js            # Gemini AI advisory & categorization endpoints
│   ├── services/
│   │   └── geminiService.js       # Google Gemini 2.5 Flash SDK integration
│   └── data/
│       ├── memoryStore.js         # Fallback data store for zero-config testing
│       └── seedData.js            # MongoDB database seeder script
└── frontend/
    ├── package.json               # Frontend dependencies (React, Lucide-react, Vite)
    ├── vite.config.js             # Vite configuration with API proxy
    ├── index.html                 # HTML root template
    └── src/
        ├── main.jsx               # React DOM entry point
        ├── App.jsx                # Core application layout & tab state
        ├── index.css              # Custom styling, dark mode & glassmorphism
        ├── services/
        │   └── api.js             # API client with seamless offline fallback
        └── components/
            ├── Navbar.jsx         # Navigation bar & quick add button
            ├── DashboardOverview.jsx # Metric cards & recent transactions
            ├── TransactionList.jsx   # Search, filters, deletion & CSV export
            ├── BudgetManager.jsx     # Category limits, progress bars & alerts
            ├── AnalyticsCharts.jsx   # Visual breakdowns & cash-flow ratio bars
            ├── GeminiAiAdvisor.jsx   # AI health score & interactive chat
            └── AddTransactionModal.jsx # Modal with AI auto-categorization
```

---

## 🛠️ How to Run Full-Stack (Backend + Frontend)

```bash
# 1. Start Backend:
cd backend
npm install
npm start

# 2. Start Frontend:
cd ../frontend
npm install
npm run dev
```
Backend runs on `http://localhost:5000` and Frontend runs on `http://localhost:3000`.
