import { ArrowLeft, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api, { imageUrl } from "../api/client.js";
import { whatsappProductLink } from "../utils/whatsapp.js";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => {
      setProduct(res.data);
      setActiveImage(res.data.images?.[0] || "");
    }).catch(() => setProduct(null));
  }, [id]);

  if (!product) {
    return (
      <section className="section page-section">
        <Link to="/products" className="text-link"><ArrowLeft size={18} /> Back to products</Link>
        <div className="empty-state">Product not found or inactive.</div>
      </section>
    );
  }

  return (
    <section className="section page-section">
      <Link to="/products" className="text-link"><ArrowLeft size={18} /> Back to products</Link>
      <div className="detail-layout">
        <div>
          <img src={imageUrl(activeImage)} alt={product.name} className="detail-image" />
          <div className="thumb-row">
            {product.images?.map((image) => (
              <button key={image} onClick={() => setActiveImage(image)} className={activeImage === image ? "thumb active" : "thumb"}>
                <img src={imageUrl(image)} alt={product.name} />
              </button>
            ))}
          </div>
        </div>
        <div className="detail-content">
          <span className="pill">{product.category?.name || "Product"}</span>
          <h1>{product.name}</h1>
          <div className="price-row large-price">
            <span className="price">₹{product.discountPrice || product.price}</span>
            {product.discountPrice ? <span className="old-price">₹{product.price}</span> : null}
          </div>
          <span className={product.stockStatus === "in_stock" ? "stock in" : "stock out"}>
            {product.stockStatus === "in_stock" ? "In stock" : "Out of stock"}
          </span>
          <p className="short-copy">{product.shortDescription}</p>
          <p className="full-copy">{product.fullDescription}</p>
          <a href={whatsappProductLink(product)} target="_blank" rel="noreferrer" className="button large">
            <MessageCircle size={20} />
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
