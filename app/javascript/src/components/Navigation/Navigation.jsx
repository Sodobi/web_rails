import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import { Home, About, Login } from '../../pages';
import { PATH_HOME, PATH_ABOUT, PATH_LOGIN } from './routes';

const Navigation = () => {
  const a = 1;

  const AuthRoutes = (
    <Routes>
      <Route path={PATH_HOME} element={<Layout />}>
        <Route index={true} element={<Home />} />
        <Route path={PATH_ABOUT} element={<About />} />
        <Route path={PATH_LOGIN} element={<Login />} />
      </Route>
      <Route path='*' element={<Navigate to={PATH_HOME} replace />} />
    </Routes>
  );
  return AuthRoutes;
};

export { Navigation };
