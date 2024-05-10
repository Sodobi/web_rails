import React, { useState } from 'react';
import { useAuthContext } from '../../hooks';
import classes from './Login.module.scss';

const Login = () => {
  const authContext = useAuthContext();
  const [isSignIn, setIsSignIn] = useState(true);

  const [name, setName] = useState('test');
  const [email, setEmail] = useState('test@mail.ru');
  const [password, setPassword] = useState('123456');
  const [confirmPassword, setConfirmPassword] = useState('123456');

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
            <div className={classes.header}>Sign in</div>
            <form onSubmit={handleSubmit}>
              <input
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='Email'
                maxLength={50}
              />
              <input
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Password'
                minLength={6}
              />
              <button type='submit'>Sign in</button>
              <span onClick={() => changeForm()}>Create account</span>
            </form>
          </>
        ) : (
          <>
            <div className={classes.header}>Sign up</div>
            <form onSubmit={handleSubmit}>
              <input type='text' value={name} onChange={e => setName(e.target.value)} placeholder='Name' />
              <input
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='Email'
                maxLength={50}
              />
              <input
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Password'
                minLength={6}
              />
              <input
                type='password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder='Confirm password'
                minLength={6}
              />
              <button type='submit'>Sign up</button>
              <span onClick={() => changeForm()}>Login to account</span>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export { Login };
