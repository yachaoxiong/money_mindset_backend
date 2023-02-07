const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');

app.use('/auth', authRoutes);


module.exports = app;
