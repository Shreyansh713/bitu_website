import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, MessageCircle, PackageSearch } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/client.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products?featured=true").then((res) => setProducts(res.data.slice(0, 4))).catch(() => setProducts([]));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">Product catalog for Bitto</span>
          <h1>Browse products and enquire directly on WhatsApp.</h1>
          <p>
            A simple catalog website for showcasing available products, prices, categories, descriptions, and images without full checkout complexity.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="button large">
              Explore Products
              <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="button secondary large">Contact</Link>
          </div>
        </div>
        <div className="hero-panel">
          <div className="hero-panel-header">
            <PackageSearch size={24} />
            <span>Catalog ready</span>
          </div>
          <ul>
            <li><CheckCircle2 size={18} /> Product images and categories</li>
            <li><CheckCircle2 size={18} /> Admin product management</li>
            <li><MessageCircle size={18} /> WhatsApp enquiry flow</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <span className="eyebrow">Featured</span>
          <h2>Latest highlighted products</h2>
          <Link to="/products" className="text-link">View all</Link>
        </div>
        <div className="product-grid">
          {products.length ? products.map((product) => <ProductCard key={product._id} product={product} />) : (
            <div className="empty-state">No featured products yet. Add products from the admin dashboard.</div>
          )}
        </div>
      </section>
    </>
  );
}
