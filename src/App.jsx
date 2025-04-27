import './App.css'; // Style
import './components/NavigationTab';
import NavigationTab from './components/NavigationTab';
import VideoComponent from './components/VideoComponent';
import videoLink from '../src/assets/sonic-demo-video.mp4';

import { apiKey } from './Firebase';

function App() {


  return (
    <>
      <NavigationTab />
      <div className='homepage-container'>
        <div className='homepage-videos-container'>
       
        
        </div>
      </div>
    </>
  );
}

export default App;
