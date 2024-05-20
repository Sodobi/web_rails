import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Link } from 'react-router-dom';
import { VscSignOut } from 'react-icons/vsc';
import { PATH_ABOUT, PATH_HOME, PATH_PROFILE } from '../Navigation/routes';
import { useAuthContext } from '../../hooks';
import classes from './Header.module.scss';

const setActive = ({ isActive }) => (isActive ? classes.linkActive : '');

const Header = () => {
  const authContext = useAuthContext();
  const { t, i18n } = useTranslation();

  return (
    <header className={classes.Header}>
      <div className={classes.mainInfo}>
        <div className={classes.title}>
          <img src='../../assets/logo.svg' alt='logo2' />
          <span>{t('header.title')}</span>
        </div>
        <div className={classes.languageSwitch}>
          <span className={i18n.language === 'ru' ? classes.active : ''} onClick={() => i18n.changeLanguage('ru')}>
            RU
          </span>
          |
          <span className={i18n.language === 'en' ? classes.active : ''} onClick={() => i18n.changeLanguage('en')}>
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
                  {t('header.home')}
                </NavLink>
              </li>
              <li>
                <NavLink to={PATH_ABOUT} className={setActive}>
                  {t('header.about')}
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className={classes.userInfo}>
            <Link to={PATH_PROFILE}>
              <img src={authContext.avatar ?? '../../assets/user.png'} />
              <span>{authContext.user.name}</span>
            </Link>
            <VscSignOut onClick={() => authContext.handleSignOut()} />
          </div>
        </>
      )}
    </header>
  );
};

export { Header };
