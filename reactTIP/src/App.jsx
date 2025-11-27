import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const sec = time.getSeconds();
  const min = time.getMinutes();
  const hour = time.getHours();

 
  const secAngle = sec * 6; 
  const minAngle = min * 6 + sec * 0.1; 
  const hourAngle = (hour % 12) * 30 + min * 0.5; 

  return (
    <div className="App">
      <div className="clock">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className={`hour hour-${i + 1}`}
          >
            <div className="hour-number">{i + 1}</div>
          </div>
        ))}
      </div>
      
      <div className="arrow-center"></div>
      <div 
        className="hour-arr"
        style={{ transform: `rotate(${hourAngle}deg)` }}
      ></div>
      
      <div 
        className="minute-arr"
        style={{ transform: `rotate(${minAngle}deg)` }}
      ></div>
      
      <div 
        className="second-arr"
        style={{ transform: `rotate(${secAngle}deg)` }}
      ></div>
    </div>
  );
}

export default App;