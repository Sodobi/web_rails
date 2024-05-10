import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PATH_ABOUT, PATH_HOME } from '../Navigation/routes';
import { useAuthContext } from '../../hooks';
import classes from './Header.module.scss';

const setActive = ({ isActive }) => (isActive ? classes.linkActive : '');

const Header = () => {
  const authContext = useAuthContext();

  const [language, setLanguage] = useState('RU');

  return (
    <header className={classes.Header}>
      <div className={classes.mainInfo}>
        <div className={classes.title}>
          <img src='../../assets/logo.svg' alt='logo2' />
          <span>Экспертная оценка</span>
        </div>
        <div className={classes.languageSwitch}>
          <span className={language === 'RU' ? classes.active : ''} onClick={() => setLanguage('RU')}>
            RU
          </span>
          |
          <span className={language === 'EN' ? classes.active : ''} onClick={() => setLanguage('EN')}>
            EN
          </span>
        </div>
      </div>

      {authContext.user && (
        <>
          <nav className={classes.nav}>
            <ul>
              <li>
                <NavLink to={PATH_HOME} className={setActive}>
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink to={PATH_ABOUT} className={setActive}>
                  О нас
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className={classes.userInfo}>
            <span>{authContext.user.name}</span>
            <button onClick={() => authContext.handleSignOut()}>Выйти</button>
          </div>
        </>
      )}
    </header>
  );
};

export { Header };
