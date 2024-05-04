import './App.css'
import React, { useState, useEffect } from 'react';
import ButtonC from './ButtonC'

function App() {
  const [userDate, setUserDate] = useState(new Date());
  const [needTimer, setNeedTimer] = useState(true);
  const [moreThan100, setMoreThan100] = useState(false);
  const [countdownFinished, setCountdownFinished] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timerInterval;

    if (!needTimer) {
      timerInterval = setInterval(() => {
        const diffInMS = userDate - new Date();
        const diffInDays = Math.floor(diffInMS / (1000 * 60 * 60 * 24));

        if (diffInDays > 100) {
          setMoreThan100(true);
          clearInterval(timerInterval);
        } else {
          if (diffInMS <= 0) {
            setCountdownFinished(true);
            setNeedTimer(true)
            clearInterval(timerInterval);
          } else {
            const days = Math.floor(diffInMS / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diffInMS % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diffInMS % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diffInMS % (1000 * 60)) / 1000);

            setDays(days);
            setHours(hours);
            setMinutes(minutes);
            setSeconds(seconds);
          }
        }
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [needTimer, userDate]);

  const handleDateTimeChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setUserDate(selectedDate);
  };

  const startTimer = () => {
    setNeedTimer(false);
  };

  const cancelTimer = () => {
    setNeedTimer(true);
  };

  return (
    <div className='parentWrapper'>
      <p className='countdown'>Countdown <span className='timer'> Timer</span></p>
      <input className='input' type="datetime-local" onChange={handleDateTimeChange} />
      <br />
      {(needTimer) && <button className='button' onClick={startTimer}>Start Timer</button>}
      {!needTimer && <button className='button' onClick={cancelTimer}>Cancel Timer</button>}
      <br />

      <div className='timerWrapper'>
        {(!countdownFinished && !moreThan100) && <ButtonC time={days} text={'Days'}></ButtonC>}
        {(!countdownFinished && !moreThan100) && <ButtonC time={hours} text={'Hours'}></ButtonC>}
        {(!countdownFinished && !moreThan100) && <ButtonC time={minutes} text={'Minutes'}></ButtonC>}
        {(!countdownFinished && !moreThan100) && <ButtonC time={seconds} text={'Seconds'}></ButtonC>}
      </div>
      {moreThan100 && <p style={{color:'purple', fontSize:'20px', fontWeight:600}}>Selected time is more than 100 days</p>}
      {countdownFinished && <p style={{color:'purple', fontSize:'20px', fontWeight:600}}>The Countdown is over! What's next on your adventure</p>}

      </div>
    
  );
}

export default App;
