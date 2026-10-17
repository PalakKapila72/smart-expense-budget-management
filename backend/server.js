try {
  require('dotenv').config();
} catch (e) {
  // dotenv optional fallback
}

const express = require('express');
const cors = require('cors');
const { connectDB, getDbStatus } = require('./config/db');

const transactionRoutes = require('./routes/transactionRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    project: 'Smart Expense & Budget Management System',
    author: 'Palak Kapila',
    database: getDbStatus() ? 'MongoDB Connected' : 'In-Memory Fallback Mode',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/ai', aiRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Smart Expense & Budget Management Backend`);
  console.log(`🌐 Server running at: http://localhost:${PORT}`);
  console.log(`🩺 Health check at:  http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});
