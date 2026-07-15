import { LogOut, Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { imageUrl } from "../api/client.js";
import { clearSession, getAdmin } from "../utils/auth.js";

const blankCategory = { name: "", description: "", isActive: true };
const blankProduct = {
  name: "",
  category: "",
  price: "",
  discountPrice: "",
  shortDescription: "",
  fullDescription: "",
  stockStatus: "in_stock",
  isActive: true,
  isFeatured: false,
  existingImages: []
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const admin = getAdmin();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryForm, setCategoryForm] = useState(blankCategory);
  const [categoryEditId, setCategoryEditId] = useState("");
  const [productForm, setProductForm] = useState(blankProduct);
  const [productEditId, setProductEditId] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [message, setMessage] = useState("");

  const activeCategoryOptions = useMemo(() => categories.filter((category) => category.isActive), [categories]);

  async function loadData() {
    const [categoryRes, productRes] = await Promise.all([
      api.get("/categories?all=true"),
      api.get("/products?admin=true")
    ]);
    setCategories(categoryRes.data);
    setProducts(productRes.data);
  }

  useEffect(() => {
    loadData().catch(() => setMessage("Unable to load dashboard data."));
  }, []);

  function logout() {
    clearSession();
    navigate("/admin/login");
  }

  async function submitCategory(event) {
    event.preventDefault();
    if (categoryEditId) {
      await api.put(`/categories/${categoryEditId}`, categoryForm);
      setMessage("Category updated.");
    } else {
      await api.post("/categories", categoryForm);
      setMessage("Category added.");
    }
    setCategoryForm(blankCategory);
    setCategoryEditId("");
    loadData();
  }

  async function removeCategory(id) {
    if (!window.confirm("Delete this category?")) return;
    await api.delete(`/categories/${id}`);
    setMessage("Category deleted.");
    loadData();
  }

  function editCategory(category) {
    setCategoryEditId(category._id);
    setCategoryForm({
      name: category.name,
      description: category.description || "",
      isActive: category.isActive
    });
  }

  function productPayload() {
    const payload = new FormData();
    Object.entries(productForm).forEach(([key, value]) => {
      if (key === "existingImages") {
        payload.append(key, JSON.stringify(value));
      } else {
        payload.append(key, value);
      }
    });
    imageFiles.forEach((file) => payload.append("images", file));
    return payload;
  }

  async function submitProduct(event) {
    event.preventDefault();
    if (!productForm.category) {
      setMessage("Select a category before saving product.");
      return;
    }
    if (!productEditId && imageFiles.length === 0) {
      setMessage("Upload at least one product image.");
      return;
    }

    if (productEditId) {
      await api.put(`/products/${productEditId}`, productPayload());
      setMessage("Product updated.");
    } else {
      await api.post("/products", productPayload());
      setMessage("Product added.");
    }
    resetProductForm();
    loadData();
  }

  async function removeProduct(id) {
    if (!window.confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    setMessage("Product deleted.");
    loadData();
  }

  function editProduct(product) {
    setProductEditId(product._id);
    setProductForm({
      name: product.name,
      category: product.category?._id || product.category,
      price: product.price,
      discountPrice: product.discountPrice || "",
      shortDescription: product.shortDescription,
      fullDescription: product.fullDescription,
      stockStatus: product.stockStatus,
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      existingImages: product.images || []
    });
    setImageFiles([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetProductForm() {
    setProductEditId("");
    setProductForm(blankProduct);
    setImageFiles([]);
  }

  function removeExistingImage(image) {
    setProductForm({
      ...productForm,
      existingImages: productForm.existingImages.filter((item) => item !== image)
    });
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <span className="eyebrow">Admin</span>
          <h1>Bitto dashboard</h1>
          <p>{admin?.name || "Admin"} can manage categories and products here.</p>
        </div>
        <button className="button secondary" onClick={logout}>
          <LogOut size={18} />
          Logout
        </button>
      </header>

      {message ? <div className="alert">{message}</div> : null}

      <section className="admin-grid">
        <form className="panel" onSubmit={submitCategory}>
          <div className="panel-heading">
            <h2>{categoryEditId ? "Edit category" : "Add category"}</h2>
          </div>
          <label>
            Category name
            <input value={categoryForm.name} onChange={(event) => setCategoryForm({ ...categoryForm, name: event.target.value })} required />
          </label>
          <label>
            Description
            <textarea value={categoryForm.description} onChange={(event) => setCategoryForm({ ...categoryForm, description: event.target.value })} rows="3" />
          </label>
          <label className="check-row">
            <input type="checkbox" checked={categoryForm.isActive} onChange={(event) => setCategoryForm({ ...categoryForm, isActive: event.target.checked })} />
            Active category
          </label>
          <button className="button">
            <Plus size={18} />
            {categoryEditId ? "Update category" : "Add category"}
          </button>
        </form>

        <div className="panel">
          <div className="panel-heading">
            <h2>Categories</h2>
          </div>
          <div className="table-list">
            {categories.map((category) => (
              <div className="table-row" key={category._id}>
                <div>
                  <strong>{category.name}</strong>
                  <span>{category.isActive ? "Active" : "Inactive"}</span>
                </div>
                <div className="row-actions">
                  <button className="icon-button" onClick={() => editCategory(category)} aria-label="Edit category"><Pencil size={16} /></button>
                  <button className="icon-button danger" onClick={() => removeCategory(category._id)} aria-label="Delete category"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel product-form-panel">
        <div className="panel-heading">
          <h2>{productEditId ? "Edit product" : "Add product"}</h2>
          {productEditId ? <button className="button secondary" type="button" onClick={resetProductForm}>Cancel edit</button> : null}
        </div>
        <form className="product-form" onSubmit={submitProduct}>
          <label>
            Product name
            <input value={productForm.name} onChange={(event) => setProductForm({ ...productForm, name: event.target.value })} required />
          </label>
          <label>
            Category
            <select value={productForm.category} onChange={(event) => setProductForm({ ...productForm, category: event.target.value })} required>
              <option value="">Select category</option>
              {activeCategoryOptions.map((category) => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </label>
          <label>
            Price
            <input type="number" min="0" value={productForm.price} onChange={(event) => setProductForm({ ...productForm, price: event.target.value })} required />
          </label>
          <label>
            Discount price
            <input type="number" min="0" value={productForm.discountPrice} onChange={(event) => setProductForm({ ...productForm, discountPrice: event.target.value })} />
          </label>
          <label>
            Stock status
            <select value={productForm.stockStatus} onChange={(event) => setProductForm({ ...productForm, stockStatus: event.target.value })}>
              <option value="in_stock">In stock</option>
              <option value="out_of_stock">Out of stock</option>
            </select>
          </label>
          <label>
            Upload images
            <input type="file" accept="image/*" multiple onChange={(event) => setImageFiles(Array.from(event.target.files))} />
          </label>
          <label className="wide">
            Short description
            <textarea value={productForm.shortDescription} onChange={(event) => setProductForm({ ...productForm, shortDescription: event.target.value })} rows="3" required />
          </label>
          <label className="wide">
            Full description
            <textarea value={productForm.fullDescription} onChange={(event) => setProductForm({ ...productForm, fullDescription: event.target.value })} rows="5" required />
          </label>
          <div className="wide checks">
            <label className="check-row">
              <input type="checkbox" checked={productForm.isActive} onChange={(event) => setProductForm({ ...productForm, isActive: event.target.checked })} />
              Active product
            </label>
            <label className="check-row">
              <input type="checkbox" checked={productForm.isFeatured} onChange={(event) => setProductForm({ ...productForm, isFeatured: event.target.checked })} />
              Featured product
            </label>
          </div>
          {productForm.existingImages.length ? (
            <div className="wide image-manager">
              {productForm.existingImages.map((image) => (
                <div key={image}>
                  <img src={imageUrl(image)} alt="Existing product" />
                  <button type="button" onClick={() => removeExistingImage(image)}>Remove</button>
                </div>
              ))}
            </div>
          ) : null}
          <button className="button wide">
            <Plus size={18} />
            {productEditId ? "Update product" : "Add product"}
          </button>
        </form>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <h2>Products</h2>
        </div>
        <div className="admin-product-list">
          {products.map((product) => (
            <div className="admin-product" key={product._id}>
              <img src={imageUrl(product.images?.[0])} alt={product.name} />
              <div>
                <strong>{product.name}</strong>
                <span>{product.category?.name || "No category"} · ₹{product.discountPrice || product.price}</span>
                <span>{product.isActive ? "Active" : "Inactive"} · {product.isFeatured ? "Featured" : "Standard"}</span>
              </div>
              <div className="row-actions">
                <button className="icon-button" onClick={() => editProduct(product)} aria-label="Edit product"><Pencil size={16} /></button>
                <button className="icon-button danger" onClick={() => removeProduct(product._id)} aria-label="Delete product"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
