import React, { useState, useEffect, useRef } from 'react';
import DualLabelClock from './DualLabelClock';

function ClockPanel({ theme }) {
  console.log(`ClockPanel is running with theme: ${theme}`);

  const [clockTime, setClockTime] = useState(new Date());
  const [showHour, setShowHour] = useState(true);
  const [showMinute, setShowMinute] = useState(true);
  const [showSecond, setShowSecond] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showLive, setShowLive] = useState(false);
  const [showDigital, setShowDigital] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (showLive) {
      intervalRef.current = setInterval(() => {
        setClockTime(prev => new Date(prev.getTime() + 1000)); // <-! tick from current time
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [showLive]);


  function generateRandomTime() {
    console.log(`generateRandomTime is running with no params`);
    const hour = Math.floor(Math.random() * 12);
    const minute = Math.floor(Math.random() * 60);
    const second = Math.floor(Math.random() * 60);
    const now = new Date();
    const newTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour,
      minute,
      second
    );
    console.log(`generateRandomTime is returning ${newTime}`);
    return newTime;
  }

  function handleNewTime() {
    const newTime = generateRandomTime();
    setClockTime(newTime);
  }

  function handleLiveToggle() {
    setShowLive(prev => !prev);
  }

  function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour12: false });
  }

  console.log(`ClockPanel has run resulting in a final calculated value of ${clockTime}`);

  return (
    <div className="clock-panel">
      <DualLabelClock
        value={clockTime}
        showHourHand={showHour}
        showMinuteHand={showMinute}
        showSecondHand={showSecond}
        showLabels={showLabels}
        theme={theme}
      />

      {showDigital && (
        <div className="digital-time">
          {formatTime(clockTime)}
        </div>
      )}

      <div className="option-list">
        <label>
          <input type="checkbox" checked={showHour} onChange={() => setShowHour(!showHour)} />
          <span>Show Hour Hand</span>
        </label>
        <label>
          <input type="checkbox" checked={showMinute} onChange={() => setShowMinute(!showMinute)} />
          <span>Show Minute Hand</span>
        </label>
        <label>
          <input type="checkbox" checked={showSecond} onChange={() => setShowSecond(!showSecond)} />
          <span>Show Second Hand</span>
        </label>
        <label>
          <input type="checkbox" checked={showLabels} onChange={() => setShowLabels(!showLabels)} />
          <span>Show Hour Labels</span>
        </label>
        <label>
          <input type="checkbox" checked={showDigital} onChange={() => setShowDigital(!showDigital)} />
          <span>Show Digital Time</span>
        </label>
        <label>
          <input type="checkbox" checked={showLive} onChange={handleLiveToggle} />
          <span>Live Mode</span>
        </label>
      </div>

      <button
        className="clock-btn"
        onClick={handleNewTime}
        disabled={showLive}
      >
        New Random Time
      </button>
    </div>
  );
}

export default ClockPanel;
