const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/auth'); // ⬅️ Add this

app.use('/api/expenses', expenseRoutes);
app.use('/api/auth', authRoutes); // ⬅️ Mount auth routes

// DB Connection & Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    console.log('Connected to DB:', mongoose.connection.name);
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error(err));

