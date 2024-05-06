import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_HOME } from '../../components/Navigation/routes';
import classes from './Login.module.scss';

const Login = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const signIn = () => {
    console.log('email: ', email);
    console.log('password: ', password);

    navigate(PATH_HOME);
  };

  const signUp = () => {
    console.log('name: ', name);
    console.log('email: ', email);
    console.log('password: ', password);
    console.log('confirm password: ', password2);

    navigate(PATH_HOME);
  };

  const handleSubmit = e => {
    e.preventDefault();

    isSignIn ? signIn() : signUp();
  };

  const changeForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setPassword2('');

    setIsSignIn(prev => !prev);
  };

  return (
    <div className={classes.Login}>
      <div className={classes.main}>
        {isSignIn ? (
          <>
            <div className={classes.header}>Sign in</div>
            <form onSubmit={handleSubmit}>
              <input type='text' value={email} onChange={setEmail} placeholder='Email' />
              <input type='password' value={password} onChange={setPassword} placeholder='Password' />
              <button type='submit'>Sign in</button>
              <span onClick={() => changeForm()}>Create account</span>
            </form>
          </>
        ) : (
          <>
            <div className={classes.header}>Sign up</div>
            <form onSubmit={handleSubmit}>
              <input type='text' value={name} onChange={setName} placeholder='Name' />
              <input type='text' value={email} onChange={setEmail} placeholder='Email' />
              <input type='password' value={password} onChange={setPassword} placeholder='Password' />
              <input type='password' value={password2} onChange={setPassword2} placeholder='Confirm password' />
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
