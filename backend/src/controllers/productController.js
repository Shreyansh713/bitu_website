const Product = require("../models/Product");

function normalizeProductBody(body) {
  return {
    ...body,
    price: Number(body.price),
    discountPrice: body.discountPrice ? Number(body.discountPrice) : null,
    isActive: body.isActive === true || body.isActive === "true",
    isFeatured: body.isFeatured === true || body.isFeatured === "true"
  };
}

function uploadedImagePaths(req) {
  return (req.files || []).map((file) => `/uploads/${file.filename}`);
}

function parseExistingImages(value, fallback) {
  if (!value) return fallback;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch (error) {
    return fallback;
  }
}

async function getProducts(req, res) {
  const { category, search, featured, admin } = req.query;
  const filter = {};

  if (admin !== "true") filter.isActive = true;
  if (category) filter.category = category;
  if (featured === "true") filter.isFeatured = true;
  if (search) filter.name = { $regex: search, $options: "i" };

  const products = await Product.find(filter)
    .populate("category", "name")
    .sort({ createdAt: -1 });

  res.json(products);
}

async function getProductById(req, res) {
  const product = await Product.findById(req.params.id).populate("category", "name");

  if (!product || !product.isActive) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
}

async function createProduct(req, res) {
  const images = uploadedImagePaths(req);
  const product = await Product.create({
    ...normalizeProductBody(req.body),
    images
  });

  res.status(201).json(await product.populate("category", "name"));
}

async function updateProduct(req, res) {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const body = normalizeProductBody(req.body);
  const newImages = uploadedImagePaths(req);
  const existingImages = parseExistingImages(req.body.existingImages, product.images);

  Object.assign(product, body, {
    images: [...existingImages, ...newImages]
  });

  await product.save();
  res.json(await product.populate("category", "name"));
}

async function deleteProduct(req, res) {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json({ message: "Product deleted" });
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
