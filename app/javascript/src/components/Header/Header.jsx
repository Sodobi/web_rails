import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.scss';
import { PATH_ABOUT, PATH_HOME } from '../Navigation/routes';
import logo from '../../../../assets/images/logo.svg';

const setActive = ({ isActive }) => (isActive ? classes.linkActive : '');

const Header = () => {
  return (
    <header className={classes.Header}>
      <div className={classes.title}>Экспертная оценка</div>
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
      <div className={classes['language-switch']}>
        <button>RU</button>
        <button>EN</button>
      </div>
      <div className={classes['user-info']}>
        <span>Имя пользователя</span>
        <button>Выйти</button>
      </div>
    </header>
  );
};

export { Header };
