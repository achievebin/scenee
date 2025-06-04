import { useState } from 'react';
import './App.css';
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  //routes 폴더의 index.js에서 지정한 사항을 출력
  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App;
