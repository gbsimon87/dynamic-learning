import React, { useState } from 'react';
import ClockPanel from './components/ClockPanel';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light'); //<-! [CHANGED! added theme state]

  function toggleTheme() {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light')); //<-! [CHANGED! toggle function]
  }

  return (
    <div className={`App ${theme}`}>
      <header className="app-header">
        <h1 className="app-title">Analog Clock</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'} {/*<-! [CHANGED! icon toggle]*/}
        </button>
      </header>
      <ClockPanel theme={theme} />
    </div>
  );
}

export default App;
