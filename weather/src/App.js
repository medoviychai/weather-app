import TodayPage from './pages/TodayPage';
import {Routes, Route} from 'react-router-dom';
import './App.css';

function App() {

  return (
    <div className='main-container'>
      <Routes>
        <Route path='/' element={< TodayPage/>} />
        <Route path='/today' element={< TodayPage/>} exact></Route>
        <Route path='/tomorrow' element={< TodayPage/>} />
        <Route path='/week' element={< TodayPage/>} />
      </Routes>
    </div>
  );
}

export default App;
