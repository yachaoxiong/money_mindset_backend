const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const billRoutes = require('./routes/bill');
const budgetRoutes = require('./routes/budget');
app.use('/auth', authRoutes);
app.use('/bill', billRoutes);
app.use('/budget', budgetRoutes);

module.exports = app;
