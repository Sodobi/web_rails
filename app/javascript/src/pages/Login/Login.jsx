import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../hooks';
import classes from './Login.module.scss';

const Login = () => {
  const authContext = useAuthContext();
  const { t } = useTranslation();

  const [isSignIn, setIsSignIn] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('test@mail.ru');
  const [password, setPassword] = useState('123456');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signIn = () => {
    authContext.handleSignIn(email, password);
  };

  const signUp = () => {
    if (password !== confirmPassword) return;

    authContext.handleSignUp(name, email, password);
  };

  const handleSubmit = e => {
    e.preventDefault();

    isSignIn ? signIn() : signUp();
  };

  const changeForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');

    setIsSignIn(prev => !prev);
  };

  return (
    <div className={classes.Login}>
      <div className={classes.main}>
        {isSignIn ? (
          <>
            <div className={classes.header}>{t('login.authorization')}</div>
            <form onSubmit={handleSubmit}>
              <input
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('login.email')}
                maxLength={50}
              />
              <input
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={t('login.password')}
                minLength={6}
              />
              <button type='submit'>{t('login.signIn')}</button>
              <span onClick={() => changeForm()}>{t('login.create')}</span>
            </form>
          </>
        ) : (
          <>
            <div className={classes.header}>{t('login.registration')}</div>
            <form onSubmit={handleSubmit}>
              <input type='text' value={name} onChange={e => setName(e.target.value)} placeholder={t('login.name')} />
              <input
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('login.email')}
                maxLength={50}
              />
              <input
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={t('login.password')}
                minLength={6}
              />
              <input
                type='password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder={t('login.confirmPassword')}
                minLength={6}
              />
              <button type='submit'>{t('login.signUp')}</button>
              <span onClick={() => changeForm()}>{t('login.login')}</span>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export { Login };
