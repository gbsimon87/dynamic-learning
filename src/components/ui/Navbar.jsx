import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../../context/theme-context';
import { AuthContext } from '../../context/auth-context';
import { Link, useLocation } from 'react-router';
import { CURRICULUM_ICON } from '../../data/curriculumRegistry';
import { useSoundMuted } from '../celebration/sound/useSoundMuted';
import { useRewards } from '../../hooks/useRewards';
import { streakStatus, localDay } from '../../data/streak';
import { levelFor } from '../../data/xp';
import { hasNews } from '../../data/news';
import './Navbar.css';

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { child, status } = useContext(AuthContext) ?? {};
  const [muted, toggleMuted] = useSoundMuted();
  const { rewards, hydrated, xp } = useRewards();
  const streak = hydrated ? streakStatus(rewards.streak, localDay()) : null;
  const level = hydrated ? levelFor(xp).level : null;
  const news = hydrated && hasNews(rewards);
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
      {/* Shortened brand: the mark carries the identity in the tight space a
          phone bar has, and the full name stays as the accessible name. */}
      <Link to="/" className="logo" aria-label="Dynamic Learning, home">
        <span className="logo-mark" aria-hidden="true">DL</span>
      </Link>

      {/* The theme toggle used to be the ONLY control here, so from any game the
          only way back to a hub was the browser Back button. */}
      <div className="navbar-links">
        {/* Icon-only: the labels crowded the bar on a phone. The name stays on
            the link for screen readers and as a pointer tooltip. */}
        <Link
          to="/skills"
          className={`navbar-link ${location.pathname === '/skills' ? 'active' : ''}`}
          title="Skills"
        >
          <span aria-hidden="true">🎯</span>
          <span className="navbar-link-label">Skills</span>
        </Link>
        <Link
          to="/curriculum"
          className={`navbar-link ${location.pathname.startsWith('/curriculum') ? 'active' : ''
            }`}
          title="Curriculum"
        >
          <span aria-hidden="true">{CURRICULUM_ICON}</span>
          <span className="navbar-link-label">Curriculum</span>
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
        {/* The one sound switch for every celebration. A device setting, kept
            beside the theme toggle rather than on a profile. */}
        <button
          type="button"
          onClick={toggleMuted}
          className="theme-btn"
          aria-pressed={muted}
          aria-label="Mute sounds"
          title={muted ? 'Sounds are off' : 'Sounds are on'}
        >
          <span aria-hidden="true">{muted ? '🔇' : '🔊'}</span>
        </button>
        <button
          onClick={toggleTheme}
          className="theme-btn"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        {/* Account slot. `status === 'loading'` renders nothing so the bar does
            not flicker between a sign-in link and a profile chip on first paint.
            The per-child colour is passed as a CSS custom property, never a
            literal, so it repaints with the theme (PROJECT_KNOWLEDGE §9). */}
        {status === 'signedOut' && (
          <Link to="/login" className="navbar-auth-link">
            Sign in
          </Link>
        )}

        {status === 'ready' && hydrated && (
          <span className="navbar-stats" aria-hidden="true">
            <span>🔥 {streak.current}</span>
            <span>Lv {level}</span>
          </span>
        )}

        {status !== 'signedOut' && status !== 'loading' && (
          <Link
            to="/profiles"
            className={`navbar-avatar-chip ${child ? 'has-child' : ''}`}
            style={
              child ? { '--navbar-chip-colour': `var(${child.colour})` } : undefined
            }
            title={child ? `Playing as ${child.name} - tap to switch` : 'Pick a profile'}
          >
            <span className="navbar-avatar-emoji" aria-hidden="true">
              {child ? child.avatar : '👤'}
            </span>
            {child && streak?.current > 0 && (
              <span className="navbar-streak-badge" aria-hidden="true">🔥{streak.current}</span>
            )}
            <span className="navbar-avatar-name">
              {child ? child.name : 'Pick profile'}
            </span>
            {child && hydrated && (
              <span className="navbar-link-label">
                {streak.current > 0
                  ? `, ${streak.current}-day streak, level ${level}`
                  : `, no streak yet, level ${level}`}
              </span>
            )}
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
