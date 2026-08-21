import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Link, useLocation } from 'react-router';
import './Navbar.css';

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [hidden, setHidden] = useState(false);
  const [prevScroll, setPrevScroll] = useState(window.scrollY);
  const location = useLocation();
  const navRef = useRef(null);

  // Publish the measured height so full-viewport pages (e.g. World Map) can
  // subtract it instead of hardcoding a guess - the bar is ~56px on desktop but
  // wraps taller on a phone.
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const publish = () =>
      document.documentElement.style.setProperty(
        '--navbar-height',
        `${Math.round(el.getBoundingClientRect().height)}px`
      );
    publish();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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
    <nav ref={navRef} className={`navbar ${hidden ? 'hidden' : ''}`}>
      <Link to="/" className="logo">Dynamic Learning</Link>

      {/* The theme toggle used to be the ONLY control here, so from any game the
          only way back to a hub was the browser Back button. */}
      <div className="navbar-links">
        <Link
          to="/skills"
          className={`navbar-link ${location.pathname === '/skills' ? 'active' : ''}`}
        >
          🎮 Skills
        </Link>
        <Link
          to="/curriculum"
          className={`navbar-link ${
            location.pathname.startsWith('/curriculum') ? 'active' : ''
          }`}
        >
          📘 Curriculum
        </Link>
        <button
          onClick={toggleTheme}
          className="theme-btn"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
