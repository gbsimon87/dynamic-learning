// /src/components/Navbar.jsx
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Link, useLocation } from 'react-router';
import './Navbar.css';

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [hidden, setHidden] = useState(false);
  const [prevScroll, setPrevScroll] = useState(window.scrollY);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setHidden(current > prevScroll && current > 50);
      setPrevScroll(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScroll]);

  return (
    <nav className={`navbar ${hidden ? 'hidden' : ''}`}>
      <Link to="/" className="logo">Dynamic Learning</Link>
      <button onClick={toggleTheme} className="theme-btn">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </nav>
  );
}

export default Navbar;
