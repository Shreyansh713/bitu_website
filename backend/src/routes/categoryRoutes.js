const express = require("express");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddleware");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(getCategories));
router.post("/", protect, asyncHandler(createCategory));
router.put("/:id", protect, asyncHandler(updateCategory));
router.delete("/:id", protect, asyncHandler(deleteCategory));

module.exports = router;
