import { useState, useRef,useContext } from 'react';
import AuthContext from '../../Store/auth-context';
import {useNavigate} from 'react-router-dom'
import classes from './Authentication.module.css';

const Authentication = () => {
    const authCtx=useContext(AuthContext);
    const navigate=useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confPasswordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    
        if (enteredPassword !== confPasswordInputRef.current.value) {
          return alert("Password and Confirm passsword are not same");
        }
      
  

    // optional: Add validation

    setIsLoading(true);
    let url;
    if (isLogin) {
      
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBA0u2j_pe10AsypQuTme8e1xEDdseCq4M'

    } else {
    url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBA0u2j_pe10AsypQuTme8e1xEDdseCq4M'

        
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
            alert('login Successful')
            emailInputRef.current.value ="";
            passwordInputRef.current.value="";
            confPasswordInputRef.current.value="";

          return res.json();

        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
             if (data && data.error && data.error.message) {
               errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        authCtx.login(data.idToken);
        navigate('/');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
                <div className={classes.control}>
          <label htmlFor='password'>  conform Password</label>
          <input
            type='password'
            id='password'
            required
            ref={confPasswordInputRef}
          />
        </div>

        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Authentication;
