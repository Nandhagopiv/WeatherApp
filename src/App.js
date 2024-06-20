import Weather from './components/Weather';
import bgWeather from './Assets/Images/bg-weatherr.jpg'
import bgWeatherDesk from './Assets/Images/bg-weather.jpg'
import { useState, useEffect } from 'react';

function App() {

  const [screen, setScreen] = useState(bgWeather)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setScreen(bgWeather)
      } else {
        setScreen(bgWeatherDesk)
      }
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <div>
        <img alt='backGround' style={{ height: '100vh', width: '100%', position: 'fixed' }} src={screen}></img>
        <div className='relative'>
          <Weather />
        </div>
      </div>
    </div>
  );
}

export default App;
