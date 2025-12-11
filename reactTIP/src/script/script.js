const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/time', (req, res) => {
  const now = new Date();
  
  const utcTime = new Date(now.toUTCString());
  
  const moscowTime = new Date(now.getTime() + (3 * 60 * 60 * 1000));
  
  const tokyoTime = new Date(now.getTime() + (9 * 60 * 60 * 1000));
  
  const londonTime = new Date(now.toUTCString());
  
  const washingtonTime = new Date(now.getTime() + (-5 * 60 * 60 * 1000));
  
  const romeTime = new Date(now.getTime() + (1 * 60 * 60 * 1000));
  
  const berlinTime = new Date(now.getTime() + (1 * 60 * 60 * 1000));
  
  res.json({
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
      hours: londonTime.getUTCHours(),
      minutes: londonTime.getUTCMinutes(),
      seconds: londonTime.getUTCSeconds(),
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
});
