import React, { useState, useEffect, useRef } from 'react';
import DualLabelClock from './DualLabelClock';
import SpeakButton from './challenge/SpeakButton';
import './ClockPanel.css';

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

  const hands = [
    { label: 'Hour hand', checked: showHour, set: setShowHour },
    { label: 'Minute hand', checked: showMinute, set: setShowMinute },
    { label: 'Second hand', checked: showSecond, set: setShowSecond },
  ];
  const extras = [
    { label: 'Hour numbers', checked: showLabels, set: setShowLabels },
    { label: 'Digital time', checked: showDigital, set: setShowDigital },
  ];

  const renderSwitch = ({ label, checked, set }) => (
    <label key={label} className="clock-switch">
      <span className="clock-switch-text">{label}</span>
      <input type="checkbox" role="switch" checked={checked} onChange={() => set(!checked)} />
      <span className="clock-switch-track" aria-hidden="true" />
    </label>
  );

  return (
    <div className="clock-panel">
      <header className="clock-header">
        <h1 className="clock-title">Clock Generator</h1>
        <p className="clock-intro">Make a time, then switch the clock parts on and off.</p>
      </header>

      <div className="clock-card">
        <section className="clock-stage" aria-label="Clock">
          <div className="clock-face-frame">
            <DualLabelClock
              value={clockTime}
              showHourHand={showHour}
              showMinuteHand={showMinute}
              showSecondHand={showSecond}
              showLabels={showLabels}
              theme={theme}
            />
          </div>

          <div className="digital-time" aria-live="off" hidden={!showDigital}>
            {formatTime(clockTime)}
          </div>

          <div className="clock-actions">
            <button className="clock-btn" onClick={handleNewTime} disabled={showLive}>
              New random time
            </button>
            <SpeakButton text={clockTime.toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: false })} label="Hear the time" compact />
          </div>
        </section>

        <section className="clock-settings" aria-label="Clock settings">
          <fieldset className="clock-group">
            <legend>Hands</legend>
            {hands.map(renderSwitch)}
          </fieldset>
          <fieldset className="clock-group">
            <legend>Show</legend>
            {extras.map(renderSwitch)}
          </fieldset>
          <fieldset className="clock-group">
            <legend>Time</legend>
            {renderSwitch({ label: 'Live mode', checked: showLive, set: handleLiveToggle })}
          </fieldset>
        </section>
      </div>
    </div>
  );
}

export default ClockPanel;
