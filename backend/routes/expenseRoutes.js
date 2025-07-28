const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Expense = require('../models/Expense');

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new expense
router.post('/', async (req, res) => {
  try {
    const { title,  amount, category, date } = req.body;
    const newExpense = new Expense({title, amount, category, date });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a single expense by ID (for testing)
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ message: 'Not found' });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete expense by ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid expense ID' });
  }

  try {
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await expense.deleteOne();
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});
// GET /api/expenses/category-breakdown
router.get('/category-breakdown', async (req, res) => {
  try {
    const breakdown = await Expense.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ]);
    res.json(breakdown);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
