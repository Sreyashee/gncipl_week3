// models/Expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
  amount: Number,
  category: String,
  note: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', expenseSchema); // auto-uses "expenses" collection
