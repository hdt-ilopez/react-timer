import React, { useEffect, useRef, useState } from 'react';
import { formatTime } from './utils/FormatTime';

const App = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, time]);

  const handleStart = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  return (
    <div className="time-wrapper flex-center">
      <div className="time-container flex-center glassmorphism">
        <div className="time-div">
          <div>
            <h1 className="timer">{formatTime(time)}</h1>
          </div>
          <div className="button-container">
            <button
              className={`${!isActive ? 'button' : 'button alt'}`}
              onClick={handleStart}
            >
              {!isActive ? 'Start' : 'Stop'}
            </button>
          </div>
          <div>
            <button className="button reset" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
