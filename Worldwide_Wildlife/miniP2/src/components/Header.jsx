import { Link } from "react-router-dom";
import { useState } from "react";
import ModalLogin from "./ModalLogin";

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {/* Logo */}
      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          Worldwide<span> Wildlife</span>
        </Link>
      </div>

      {/* Floating Menu Button */}
      <button className="menu-float" onClick={toggleMenu}>
        <i className="fa fa-bars" aria-hidden="true"></i>
        <span>Menu</span>
      </button>

      {/* Slide-out Menu */}
      <nav id="menu" className={menuOpen ? "active" : ""}>
        <ul className="links">
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/axolotls" onClick={closeMenu}>Axolotls</Link></li>
          <li><Link to="/platypus" onClick={closeMenu}>Platypus</Link></li>
          <li><Link to="/blackpanther" onClick={closeMenu}>Black Panther</Link></li>
          <li><Link to="/secretarybird" onClick={closeMenu}>Secretary Bird</Link></li>
          <li><Link to="/cool-facts" onClick={closeMenu}>Cool Facts</Link></li>

          <li>
            {isLoggedIn ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <button onClick={() => setShowLogin(true)}>Login</button>
            )}
          </li>
        </ul>
      </nav>

      {/* Login Modal */}
      <ModalLogin
        show={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />
    </>
  );
}
