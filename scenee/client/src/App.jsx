import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SearchBarProvider } from './contexts/SearchBarContext';
import AppRoutes from './routes/index';

function App() {
  return (
    <SearchBarProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </SearchBarProvider>
  );
}

export default App;
