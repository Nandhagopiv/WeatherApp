import './App.css';
import Weather from './components/Weather';
import bgimg from './Assets/Images/weather__bg.jpg'

function App() {

  return (
    <div style={{ backgroundImage: `url(${bgimg})`, backgroundSize: 'cover', height: '145vh' }}>
    <Weather/>
    </div>
  );
}

export default App;
