import { useState } from 'react';

import './App.css';
import AppRoutes from './routes';
import HomePage from './pages/Home/HomePage';
import { BrowserRouter } from 'react-router-dom';

function App() {
	const [count, setCount] = useState(0);

	return (
		<BrowserRouter>
			<AppRoutes>
				
			</AppRoutes>
		</BrowserRouter>
	);
}

export default App;
