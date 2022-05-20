const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Controllers
const { globalErrorHandler } = require('./controllers/errors.controller');

//Routes
const { usersRouter } = require('./routes/users.routes');
const { repairsRouter } = require('./routes/repairs.routes');

//Init express app
const app = express();

// Enable CORS
app.use(cors());

//Enable incoming JSON data
app.use(express.json());

const limiter = rateLimit({
  max: 1000,
  windowMs: 1 * 60 * 60 * 1000,
  message: 'Too many requests from this IP',
});
app.use(limiter);

//Endpoints

//http://localhost:5000/api/v1/users
app.use('/api/v1/users', usersRouter);

//http://localhost:5000/api/v1/repairs
app.use('/api/v1/repairs', repairsRouter);

// Global error handler
app.use('*', globalErrorHandler);

module.exports = { app };