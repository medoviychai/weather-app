import Header from './pages/Header';
import Footer from './pages/Footer';
import TodayPage from './pages/TodayPage';
import TomorrowPage from './pages/TomorrowPage';
import WeekPage from './pages/WeekPage';
import {Routes, Route} from 'react-router-dom';
import './App.css';

function App() {

  return (
    <div className='main-container'>
      <Routes>
        <Route path='/today' element={< TodayPage/>} exact></Route>
        <Route path='/tomorrow' element={< TomorrowPage/>} />
        <Route path='/week' element={< WeekPage/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
