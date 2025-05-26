const express = require("express");
const router = express.Router();
const placementController = require("../controllers/placementController");


// Middleware to check role (HOD)


// Route: Create a new placement (only for HOD)
router.post("/", placementController.addPlacement);

// Route: Get all placements
router.get("/all", placementController.getAllPlacements);

// Route: Get, update, or delete placement by ID
router
  .route("/:placementId")
  .patch(placementController.addPlacement)
  .delete(placementController.deletePlacement);

module.exports = router;
