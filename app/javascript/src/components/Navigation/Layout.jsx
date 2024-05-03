import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../';

const layoutStyles = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
};

const mainStyles = {
  flex: '1',
  overflowY: 'auto',
};

const Layout = () => {
  return (
    <div style={layoutStyles}>
      <Header />

      <main style={mainStyles}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
