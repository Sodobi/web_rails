import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Navigation } from './components';
import { AuthProvider } from './context';
import './index.css';

function Main() {
  return (
    <AuthProvider>
      <HashRouter>
        <Navigation />
      </HashRouter>
    </AuthProvider>
  );
}

export { Main };
