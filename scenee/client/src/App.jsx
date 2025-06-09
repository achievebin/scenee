import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/index';
import TopNav from './components/TopNav';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TopNav />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
