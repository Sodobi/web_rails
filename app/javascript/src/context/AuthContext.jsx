import React, { createContext, useEffect, useState } from 'react';
import AuthService from '../services/auth.service';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (!user) return;

    AuthService.getGravatar()
      .then(response => setAvatar(URL.createObjectURL(response.data)))
      .catch(console.log);
  }, [user]);

  const handleSignIn = (email, password) => {
    const session = {
      email: email,
      password: password,
    };
    AuthService.signIn({ session: session })
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
    AuthService.signUp({ user: user })
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
        user,
        avatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export default AuthProvider;
