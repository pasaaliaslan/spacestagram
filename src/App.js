import './App.css';
import DashboardContainer from './components/dashboardContainer';
import ImageList from './components/imageList';

function App() {

  return (
    <div className="App">
      <header> 
        <h1>Spacestagram</h1>
        <h4>Brought to you by NASA's Astronomy Photo of the Day (APOD) API</h4>
      </header>
      <div className="content">
        <DashboardContainer/>
        <ImageList/>
      </div>
      <footer>Made by Pasa Ali Aslan</footer>
    </div>
  );
}

export default App;
