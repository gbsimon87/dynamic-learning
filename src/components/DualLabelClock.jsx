import React from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import './DualLabelClock.css';

function DualLabelClock({ value, showHourHand, showMinuteHand, showSecondHand, showLabels }) {
  console.log(`DualLabelClock is running with ${value}`);

  const dualLabels = [];

  if (showLabels) { //<-! [CHANGED! (conditional render)]
    const center = 50;
    const radius = 42;

    for (let i = 1; i <= 12; i++) {
      const angle = (i * 30) - 90;
      const dayHour = i;
      const nightHour = (i + 12) % 24;

      const x = center + radius * Math.cos((angle * Math.PI) / 180);
      const y = center + radius * Math.sin((angle * Math.PI) / 180);

      dualLabels.push(
        <div
          key={i}
          className="dual-label"
          style={{ left: `${x}%`, top: `${y}%` }}
        >
          <div>{dayHour}</div>
          <div>{nightHour}</div>
        </div>
      );
    }
  }

  console.log(`DualLabelClock has run resulting in a final calculated value of ${dualLabels.length} labels`);

  return (
    <div className="clock-wrapper">
      <Clock
        value={value}
        renderHourMarks={true}
        renderMinuteMarks={true}
        hourHandWidth={showHourHand ? 5 : 0}
        minuteHandWidth={showMinuteHand ? 3 : 0}
        secondHandWidth={showSecondHand ? 1 : 0}
        size={250}
      />
      {dualLabels}
    </div>
  );
}

export default DualLabelClock;
