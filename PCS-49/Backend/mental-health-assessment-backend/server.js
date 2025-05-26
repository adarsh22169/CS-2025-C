

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB Atlas', err));

// Define Assessment Schema
const assessmentSchema = new mongoose.Schema({
  // Personal Information
  firstName: String,
  lastName: String,
  age: String,
  gender: String,
  email: String,
  phone: String,

  // Emotional Assessment
  currentMood: String,
  moodPatterns: String,
  sleepQuality: String,
  energyLevels: String,
  appetiteChanges: String,

  // Symptom Assessment
  anxietyLevel: String,
  depressionLevel: String,
  stressLevel: String,
  focusIssues: String,
  thoughtPatterns: String,

  // Life Circumstances
  recentLifeChanges: String,
  supportSystem: String,
  copingMechanisms: String,
  workSchoolStress: String,
  relationshipIssues: String,

  // Treatment History
  previousDiagnosis: String,
  currentTreatments: String,
  medications: String,
  therapyExperience: String,

  // Goals and Preferences
  primaryGoals: String,
  preferredApproach: String,
  additionalInfo: String,

  // Consent
  consentToContact: Boolean,
  consentToShare: Boolean,
  emergencyContact: String,
  emergencyPhone: String,

  // Metadata
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const Assessment = mongoose.model('Assessment', assessmentSchema);

// Routes
// Submit a new assessment
app.post('/api/assessments', async (req, res) => {
  try {
    const newAssessment = new Assessment(req.body);
    await newAssessment.save();
    res.status(201).json({ success: true, message: 'Assessment submitted successfully' });
  } catch (error) {
    console.error('Error submitting assessment:', error);
    res.status(500).json({ success: false, message: 'Error submitting assessment' });
  }
});

// Get all assessments (protected, for admin only)
app.get('/api/assessments', async (req, res) => {
  // In a real app, add authentication middleware to protect this route
  try {
    const assessments = await Assessment.find().sort({ submittedAt: -1 });
    res.status(200).json(assessments);
  } catch (error) {
    console.error('Error fetching assessments:', error);
    res.status(500).json({ success: false, message: 'Error fetching assessments' });
  }
});

// Get a single assessment by ID
app.get('/api/assessments/:id', async (req, res) => {
  // In a real app, add authentication middleware to protect this route
  try {
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) {
      return res.status(404).json({ success: false, message: 'Assessment not found' });
    }
    res.status(200).json(assessment);
  } catch (error) {
    console.error('Error fetching assessment:', error);
    res.status(500).json({ success: false, message: 'Error fetching assessment' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));