import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { imageUrl } from "../api/client.js";
import { whatsappProductLink } from "../utils/whatsapp.js";

export default function ProductCard({ product }) {
  const image = product.images?.[0];
  const categoryName = product.category?.name || "Product";

  return (
    <article className="product-card">
      <Link to={`/products/${product._id}`} className="product-image-link">
        <img src={imageUrl(image)} alt={product.name} className="product-image" />
      </Link>
      <div className="product-card-body">
        <span className="pill">{categoryName}</span>
        <h3>{product.name}</h3>
        <p>{product.shortDescription}</p>
        <div className="price-row">
          <span className="price">₹{product.discountPrice || product.price}</span>
          {product.discountPrice ? <span className="old-price">₹{product.price}</span> : null}
        </div>
        <div className="card-actions">
          <Link to={`/products/${product._id}`} className="button secondary">View</Link>
          <a href={whatsappProductLink(product)} target="_blank" rel="noreferrer" className="button">
            <MessageCircle size={18} />
            Enquire
          </a>
        </div>
      </div>
    </article>
  );
}
