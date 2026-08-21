import React, { useEffect, useRef, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import './DualLabelClock.css';

function DualLabelClock({ value, showHourHand, showMinuteHand, showSecondHand, showLabels }) {
  // react-clock needs a pixel size, so measure the (CSS-sized) wrapper instead of
  // hardcoding 250px. The hour labels are positioned in %, so they scale for free.
  const wrapperRef = useRef(null);
  const [size, setSize] = useState(250);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(([entry]) => {
      const next = Math.round(entry.contentRect.width);
      if (next > 0) setSize(next);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const dualLabels = [];

  if (showLabels) { //<-! [CHANGED! (conditional render)]
    const center = 50;
    const radius = 42;

    for (let i = 1; i <= 12; i++) {
      const angle = (i * 30) - 90;
      const dayHour = i;
      // 12 o'clock must read 12 / 24, not 12 / 0. The old `(i + 12) % 24` turned
      // i=12 into 0; for i=1..11 it was a no-op, so it served no purpose.
      const nightHour = i + 12;

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

  return (
    <div className="clock-wrapper" ref={wrapperRef}>
      <Clock
        value={value}
        renderHourMarks={true}
        renderMinuteMarks={true}
        hourHandWidth={showHourHand ? 5 : 0}
        minuteHandWidth={showMinuteHand ? 3 : 0}
        secondHandWidth={showSecondHand ? 1 : 0}
        size={size}
      />
      {dualLabels}
    </div>
  );
}

export default DualLabelClock;
