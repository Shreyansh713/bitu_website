import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import api from "../api/client.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    return params.toString();
  }, [search, category]);

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data)).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    setLoading(true);
    api.get(`/products${query ? `?${query}` : ""}`)
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <section className="section page-section">
      <div className="section-heading">
        <span className="eyebrow">Catalog</span>
        <h1>All products</h1>
      </div>
      <div className="filters">
        <label className="search-box">
          <Search size={18} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by product name" />
        </label>
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item._id} value={item._id}>{item.name}</option>
          ))}
        </select>
      </div>
      {loading ? <div className="empty-state">Loading products...</div> : null}
      {!loading && products.length === 0 ? <div className="empty-state">No products found.</div> : null}
      <div className="product-grid">
        {products.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>
    </section>
  );
}
