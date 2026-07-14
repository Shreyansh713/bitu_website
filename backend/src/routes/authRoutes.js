const express = require("express");
const { loginAdmin, getProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.post("/login", asyncHandler(loginAdmin));
router.get("/profile", protect, asyncHandler(getProfile));

module.exports = router;
