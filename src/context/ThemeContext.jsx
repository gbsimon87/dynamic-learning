// /src/context/ThemeContext.jsx
import { useEffect, useState } from 'react';
import { ThemeContext } from './theme-context';

export function ThemeProvider({ children }) {
  const getInitialTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    const systemPref = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPref ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    localStorage.setItem('theme', theme);
    // Remove only OUR classes. Assigning `className = ''` destroyed classes set
    // by other code - Leaflet puts `leaflet-dragging` on <body> while panning.
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
