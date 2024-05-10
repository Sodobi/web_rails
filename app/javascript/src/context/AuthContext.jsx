import React, { createContext, useEffect, useState } from 'react';
import AuthService from '../services/auth.service';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [user, setUser] = useState(null);
  const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

  useEffect(() => {
    setIsUserLogged(user === null ? false : true);
  }, [user]);

  const handleSignIn = (email, password) => {
    const session = {
      email: email,
      password: password,
    };
    AuthService.signIn({ session: session }, csrfToken)
      .then(response => {
        setUser(response.data.user);
      })
      .catch(console.log);
  };

  const handleSignUp = (name, email, password) => {
    const user = {
      name: name,
      email: email,
      password: password,
    };
    AuthService.signUp({ user: user }, csrfToken)
      .then(() => handleSignIn(email, password))
      .catch(console.log);
  };

  const handleSignOut = () => {
    AuthService.signOut()
      .then(() => setUser(null))
      .catch(console.log);
  };

  return (
    <AuthContext.Provider
      value={{
        handleSignIn,
        handleSignUp,
        handleSignOut,
        isUserLogged,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export default AuthProvider;
