import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { PATH_ABOUT, PATH_HOME, PATH_LOGIN } from '../Navigation/routes';
import classes from './Header.module.scss';
import logo from '../../../../assets/images/logo.svg';

const setActive = ({ isActive }) => (isActive ? classes.linkActive : '');

const Header = () => {
  const navigate = useNavigate();

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
        <button onClick={() => navigate(PATH_LOGIN)}>Выйти</button>
      </div>
    </header>
  );
};

export { Header };
