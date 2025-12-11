import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [times, setTimes] = useState({
    utc: { hours: 0, minutes: 0, seconds: 0, timezone: 'UTC (Лондон)' },
    moscow: { hours: 0, minutes: 0, seconds: 0, timezone: 'Москва (UTC+3)' },
    tokyo: { hours: 0, minutes: 0, seconds: 0, timezone: 'Токио (UTC+9)' },
    london: { hours: 0, minutes: 0, seconds: 0, timezone: 'Лондон (UTC+0)' },
    washington: { hours: 0, minutes: 0, seconds: 0, timezone: 'Вашингтон (UTC-5)' },
    rome: { hours: 0, minutes: 0, seconds: 0, timezone: 'Рим (UTC+1)' },
    berlin: { hours: 0, minutes: 0, seconds: 0, timezone: 'Берлин (UTC+1)' }
  });
  
  const [selectedTimezone, setSelectedTimezone] = useState('london');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/time');
        const data = await response.json();
        setTimes(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching time:', error);
        updateLocalTime();
        setLoading(false);
      }
    };

    const updateLocalTime = () => {
      const now = new Date();
      
      const utcTime = new Date(now.toUTCString());
      
      const moscowTime = new Date(now.getTime() + (3 * 60 * 60 * 1000));
      
      const tokyoTime = new Date(now.getTime() + (9 * 60 * 60 * 1000));
      
      const washingtonTime = new Date(now.getTime() + (-5 * 60 * 60 * 1000));
      
      const romeTime = new Date(now.getTime() + (1 * 60 * 60 * 1000));
      
      const berlinTime = new Date(now.getTime() + (1 * 60 * 60 * 1000));
      
      setTimes({
        utc: {
          hours: utcTime.getUTCHours(),
          minutes: utcTime.getUTCMinutes(),
          seconds: utcTime.getUTCSeconds(),
          timezone: 'UTC (Лондон)'
        },
        moscow: {
          hours: moscowTime.getUTCHours(),
          minutes: moscowTime.getUTCMinutes(),
          seconds: moscowTime.getUTCSeconds(),
          timezone: 'Москва (UTC+3)'
        },
        tokyo: {
          hours: tokyoTime.getUTCHours(),
          minutes: tokyoTime.getUTCMinutes(),
          seconds: tokyoTime.getUTCSeconds(),
          timezone: 'Токио (UTC+9)'
        },
        london: {
          hours: utcTime.getUTCHours(),
          minutes: utcTime.getUTCMinutes(),
          seconds: utcTime.getUTCSeconds(),
          timezone: 'Лондон (UTC+0)'
        },
        washington: {
          hours: washingtonTime.getUTCHours(),
          minutes: washingtonTime.getUTCMinutes(),
          seconds: washingtonTime.getUTCSeconds(),
          timezone: 'Вашингтон (UTC-5)'
        },
        rome: {
          hours: romeTime.getUTCHours(),
          minutes: romeTime.getUTCMinutes(),
          seconds: romeTime.getUTCSeconds(),
          timezone: 'Рим (UTC+1)'
        },
        berlin: {
          hours: berlinTime.getUTCHours(),
          minutes: berlinTime.getUTCMinutes(),
          seconds: berlinTime.getUTCSeconds(),
          timezone: 'Берлин (UTC+1)'
        }
      });
    };

    fetchTime();
    const interval = setInterval(fetchTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentTime = times[selectedTimezone];
  
  const secAngle = currentTime ? currentTime.seconds * 6 : 0;
  const minAngle = currentTime ? currentTime.minutes * 6 + currentTime.seconds * 0.1 : 0;
  const hourAngle = currentTime ? (currentTime.hours % 12) * 30 + currentTime.minutes * 0.5 : 0;

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading">Загрузка мирового времени...</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1>Мировые Часы</h1>
      
      <div className="timezone-selector">
        <button 
          className={`timezone-btn ${selectedTimezone === 'london' ? 'active' : ''}`}
          onClick={() => setSelectedTimezone('london')}
        >
          Лондон
        </button>
        <button 
          className={`timezone-btn ${selectedTimezone === 'moscow' ? 'active' : ''}`}
          onClick={() => setSelectedTimezone('moscow')}
        >
          Москва
        </button>
        <button 
          className={`timezone-btn ${selectedTimezone === 'tokyo' ? 'active' : ''}`}
          onClick={() => setSelectedTimezone('tokyo')}
        >
          Токио
        </button>
        <button 
          className={`timezone-btn ${selectedTimezone === 'washington' ? 'active' : ''}`}
          onClick={() => setSelectedTimezone('washington')}
        >
          Вашингтон
        </button>
        <button 
          className={`timezone-btn ${selectedTimezone === 'rome' ? 'active' : ''}`}
          onClick={() => setSelectedTimezone('rome')}
        >
          Рим
        </button>
        <button 
          className={`timezone-btn ${selectedTimezone === 'berlin' ? 'active' : ''}`}
          onClick={() => setSelectedTimezone('berlin')}
        >
          Берлин
        </button>
      </div>

      <div className="timezone-info">
        {currentTime.timezone}
      </div>

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
    </div>
  );
}

export default App;