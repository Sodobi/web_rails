import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Navigation } from './components';
import './index.css';

function Main() {
  return (
    <HashRouter>
      <Navigation />
    </HashRouter>
  );
}

export { Main };
