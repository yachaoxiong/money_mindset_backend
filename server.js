const express = require('express');
const app = express();
const config = require('./config/db');
const routes = require('./routers');
const mongoose = require('mongoose');
const createError = require('http-errors');

  app.use(express.json());
  app.use(express.urlencoded({ extended: false}));
  
  app.use('/api', routes);

 
  //db connection
  mongoose.connect(config.db, { useNewUrlParser: true }, (err) => {
    if (err) {
      console.log('Error! ' + err);
    } else {
      console.log('Connected to mongodb');
    }
  });

app.get('/', (req, res) => {
    res.json("Hi, this is money mindset APIs!!");
  });

  app.use((req, res, next) => {
      next(createError(404));
  });


  // error handler
  app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  // render the error page
  res.status(statusCode);
    res.json({
        message: err.message,
      });
  });

  module.exports = app;
