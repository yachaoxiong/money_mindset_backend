const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const billRoutes = require('./routes/bill');

app.use('/auth', authRoutes);
app.use('/bill', billRoutes);

module.exports = app;
