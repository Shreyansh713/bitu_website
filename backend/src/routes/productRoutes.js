const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(getProducts));
router.get("/:id", asyncHandler(getProductById));
router.post("/", protect, upload.array("images", 8), asyncHandler(createProduct));
router.put("/:id", protect, upload.array("images", 8), asyncHandler(updateProduct));
router.delete("/:id", protect, asyncHandler(deleteProduct));

module.exports = router;
