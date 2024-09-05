import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css'; // ../styles/NavBar.css PARA DILI MALIMOT

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Movie Kanton</h1>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
      </div>
    </nav>
  );
};

export default Navbar;