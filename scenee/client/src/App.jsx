import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRoutes from './routes'
import { BrowserRouter } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  //routes 폴더의 index.js에서 지정한 사항을 출력
  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App
