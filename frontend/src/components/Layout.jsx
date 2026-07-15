import { Link, NavLink, Outlet } from "react-router-dom";
import { Menu, ShoppingBag } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" }
];

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <Link to="/" className="brand">
          <span className="brand-icon">
            <ShoppingBag size={20} />
          </span>
          <span>Bitto Catalog</span>
        </Link>
        <button className="icon-button nav-toggle" onClick={() => setOpen((value) => !value)} aria-label="Open menu">
          <Menu size={22} />
        </button>
        <nav className={open ? "site-nav open" : "site-nav"}>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          <NavLink to="/admin/login" onClick={() => setOpen(false)}>
            Admin
          </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div>
          <strong>Bitto Catalog</strong>
          <p>Simple product browsing with direct WhatsApp enquiry.</p>
        </div>
        <Link to="/contact" className="footer-link">Contact Bitto</Link>
      </footer>
    </>
  );
}
