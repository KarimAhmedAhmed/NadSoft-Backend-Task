const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { PrismaClient } = require('../prisma/prisma/client/index');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

const logger = require('./middlewares/logger')
// Middleware to log all incoming requests
app.use(logger);

app.use(express.json());

// Routes
const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;

