const { mongoose } = require("mongoose");
const Placement = require("./../models/Placement");
const asyncHandler = require("express-async-handler");

// @desc Get All Placements (optionally by department)
// @route GET /placement/
// @access Everyone
const getAllPlacements = asyncHandler(async (req, res) => {
  const { department } = req.query;

  const filter = department ? { department } : {};
  const placements = await Placement.find(filter).exec();

  if (!placements || placements.length === 0) {
    return res.status(404).json({ message: "No Placements found" });
  }

  res.json(placements);
});

// @desc Get Placements for a specific Student (based on eligibility logic if needed)
// @route GET /placement/student/:studentId
// @access Everyone
const getPlacementsForStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  if (!studentId) {
    return res.status(400).json({ message: "Student ID Missing" });
  }

  // You can add logic here to filter based on CGPA, skills, etc.
  const placements = await Placement.find({}).exec();
  res.json(placements);
});

// @desc Get One Placement
// @route GET /placement/:placementId
// @access Everyone
const getPlacement = asyncHandler(async (req, res) => {
  const { placementId } = req.params;
  if (!placementId) {
    return res.status(400).json({ message: "Placement ID Missing" });
  }

  const placement = await Placement.findById(placementId).exec();
  if (!placement) {
    return res.status(404).json({ message: "Placement not found" });
  }

  res.json(placement);
});

// @desc Add Placement
// @route POST /placement
// @access Private
const addPlacement = asyncHandler(async (req, res) => {
  const { department, company, jobDescription, package: ctc, deadline, eligibilityCriteria } = req.body;

  if (!department || !company || !jobDescription || !ctc || !deadline || !eligibilityCriteria) {
    return res.status(400).json({ message: "Incomplete Request: Fields Missing" });
  }

  // Optional: Check for duplicates
  const duplicate = await Placement.findOne({
    department,
    company,
    jobDescription,
    deadline,
  })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Placement already exists" });
  }

  const placementObj = {
    department,
    company,
    jobDescription,
    package: ctc,
    deadline,
    eligibilityCriteria,
  };

  const record = await Placement.create(placementObj);

  if (record) {
    res.status(201).json({ message: `New placement at ${company} added` });
  } else {
    res.status(400).json({ message: "Invalid data received" });
  }
});

// @desc Delete Placement
// @route DELETE /placement
// @access Private
const deletePlacement = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Placement ID required" });
  }

  const record = await Placement.findById(id).exec();

  if (!record) {
    return res.status(404).json({ message: "Placement not found" });
  }

  await record.deleteOne();

  res.json({ message: `Placement deleted` });
});

module.exports = {
  addPlacement,
  getAllPlacements,
  getPlacementsForStudent,
  getPlacement,
  deletePlacement,
};
