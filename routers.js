const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const billRoutes = require('./routes/bill');
const budgetRoutes = require('./routes/budget');
const assetsRoutes = require('./routes/assets');

app.use('/auth', authRoutes);
app.use('/bill', billRoutes);
app.use('/budgets', budgetRoutes);
app.use('/assets', assetsRoutes);

module.exports = app;
  