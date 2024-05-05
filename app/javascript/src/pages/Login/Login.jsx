import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_HOME } from '../../components/Navigation/routes';
import classes from './Login.module.scss';

const Login = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);

  const handleSubmit = e => {
    e.preventDefault();
    navigate(PATH_HOME);
  };

  return (
    <div className={classes.Login}>
      <div className={classes.main}>
        {isSignIn ? (
          <>
            <div className={classes.header}>Sign in</div>
            <form onSubmit={handleSubmit}>
              <input type='text' align='center' placeholder='Email' />
              <input type='password' align='center' placeholder='Password' />
              <button className={classes.submit} type='submit'>
                Sign in
              </button>
              <span className={classes.changeForm} onClick={() => setIsSignIn(false)}>
                Create account
              </span>
            </form>
          </>
        ) : (
          <>
            <div className={classes.header}>Sign up</div>
            <form onSubmit={handleSubmit}>
              <input type='text' align='center' placeholder='Name' />
              <input type='text' align='center' placeholder='Email' />
              <input type='password' align='center' placeholder='Password' />
              <input type='password' align='center' placeholder='Confirm password' />
              <button className={classes.submit} type='submit'>
                Sign up
              </button>
              <span className={classes.changeForm} onClick={() => setIsSignIn(true)}>
                Log in
              </span>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export { Login };
