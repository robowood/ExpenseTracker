import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const navigate=useNavigate();

 const initialToken=localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token',token);
    navigate('/')
    
    

  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
  };
const email=localStorage.getItem('email');
console.log(email);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
