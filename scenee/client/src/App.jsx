import { useState } from 'react';
import './App.css';
import AppRoutes from './routes';
import HomePage from './pages/Home/HomePage';
import { BrowserRouter } from 'react-router-dom';

function App() {
	const [count, setCount] = useState(0);

  //routes 폴더의 index.js에서 지정한 사항을 출력
  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App;
