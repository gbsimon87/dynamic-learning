import BrandMark from "./BrandMark";
import { useContext, useEffect, useRef, useState } from 'react';
import { profileColour } from '../../data/avatars';
import { AuthContext } from '../../context/auth-context';
import { Link, useLocation } from 'react-router';
import { CURRICULUM_ICON } from '../../data/curriculumRegistry';
import { useRewards } from '../../hooks/useRewards';
import { hasNews } from '../../data/news';
import './Navbar.css';

function Navbar() {
  const { child, status, isLearner } = useContext(AuthContext) ?? {};
  const accountLabel = isLearner ? 'My account' : 'Parent area';
  const { rewards, hydrated } = useRewards();
  const news = hydrated && hasNews(rewards);
  const [hidden, setHidden] = useState(false);
  const prevScroll = useRef(typeof window === 'undefined' ? 0 : window.scrollY);
  const location = useLocation();
  const navRef = useRef(null);

  // Publish the measured height so full-viewport pages (e.g. World Map) can
  // subtract it instead of hardcoding a guess - the bar is ~56px on desktop but
  // wraps taller on a phone.
  useEffect(() => {
    if (location.pathname === '/skills/solar-system') return;
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
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setHidden(current > prevScroll.current && current > 50);
      prevScroll.current = current;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav aria-label="Main" ref={navRef} className={`navbar ${hidden ? 'hidden' : ''}`}>
      {/* Shortened brand: the mark carries the identity in the tight space a
          phone bar has, and the full name stays as the accessible name. */}
      <Link to="/" className="logo" aria-label="Learn with Bix, home">
        <BrandMark className="logo-mark" />
      </Link>

      {/* Hubs and account settings stay within reach from every game. */}
      <div className="navbar-links">
        {/* Icon-only: the labels crowded the bar on a phone. The name stays on
            the link for screen readers and as a pointer tooltip. */}
        <Link
          to="/skills"
          className={`navbar-link ${location.pathname.startsWith('/skills') ? 'active' : ''}`}
          title="Skills"
        >
          <span aria-hidden="true">🎯</span>
          <span className="navbar-link-label">Skills</span>
        </Link>
        <Link
          to={status === 'signedOut' ? '/what-we-teach' : '/curriculum'}
          className={`navbar-link ${(location.pathname.startsWith('/curriculum') || location.pathname === '/what-we-teach') ? 'active' : ''
            }`}
          title={status === 'signedOut' ? 'What we teach' : 'Curriculum'}
        >
          <span aria-hidden="true">{CURRICULUM_ICON}</span>
          <span className={status === 'signedOut' ? 'navbar-public-label' : 'navbar-link-label'}>{status === 'signedOut' ? 'What we teach' : 'Curriculum'}</span>
        </Link>
        {/* Only once a child is playing: the Trophy Room is theirs. */}
        {status === 'ready' && (
          <Link
            to="/trophies"
            className={`navbar-link ${location.pathname === '/trophies' ? 'active' : ''}`}
            title="Trophy Room"
          >
            <span aria-hidden="true">🏆</span>
            <span className="navbar-link-label">
              {news ? 'Trophy Room, new trophies to see' : 'Trophy Room'}
            </span>
            {news && <span className="navbar-news-dot" aria-hidden="true" />}
          </Link>
        )}
        <Link
          to="/parent"
          className={`navbar-link ${location.pathname.startsWith('/parent') ? 'active' : ''}`}
          title={accountLabel}
          aria-current={location.pathname === '/parent' ? 'page' : undefined}
        >
          <span aria-hidden="true">👥</span>
          <span className="navbar-link-label">{accountLabel}</span>
        </Link>

        {/* Account slot. `status === 'loading'` renders nothing so the bar does
            not flicker between a sign-in link and a profile chip on first paint.
            The per-child colour is passed as a CSS custom property, never a
            literal, so it repaints with the theme (PROJECT_KNOWLEDGE §9). */}
        {status === 'signedOut' && (
          <Link to="/login" className="navbar-auth-link">
            Sign in
          </Link>
        )}

        {status !== 'signedOut' && status !== 'loading' && (
          <Link
            to="/profiles"
            className={`navbar-avatar-chip ${child ? 'has-child' : ''}`}
            style={
              child ? { '--navbar-chip-colour': profileColour(child.colour) } : undefined
            }
            title={child ? `Playing as ${child.name} - tap to switch` : 'Pick a profile'}
          >
            <span className="navbar-avatar-emoji" aria-hidden="true">
              {child ? child.avatar : '➕'}
            </span>
            <span className="navbar-avatar-name">
              {child ? child.name : 'Pick profile'}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
