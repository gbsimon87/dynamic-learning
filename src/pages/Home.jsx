// /src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <h1>Dynamic Learning</h1>
      <Link to="/clock-generator" className="clock-nav-btn">
        Clock Generator
      </Link>
      <Link to="/counting-numbers" className="clock-nav-btn">
        Counting Numbers
      </Link>
      <Link to="/multiplication-table" className="clock-nav-btn">
        Multiplication Table
      </Link>
      <Link to="/shapes" className="clock-nav-btn">
        Shape Explorer
      </Link>
      <Link to="/word-builder" className="clock-nav-btn">
        Word Builder
      </Link>

    </div>
  );
}

export default Home;
