
const express = require('express');
const router = express.Router();
const Assessment = require('../models/Assessment');

// POST - Submit form
router.post('/', async (req, res) => {
  try {
    const newAssessment = new Assessment(req.body);
    const saved = await newAssessment.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: "Failed to save assessment data" });
  }
});

module.exports = router;
