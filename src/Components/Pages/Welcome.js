
import React, { Fragment, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './Welcome.module.css'
import AuthContext from '../../Store/auth-context'

const Welcome = () => {
    
 const authCtx=useContext(AuthContext)

 const logoutHandler=()=>{
    authCtx.logout();
    
 }
    

    

    const url='https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBA0u2j_pe10AsypQuTme8e1xEDdseCq4M'

    const verifyEmailHandler=(e)=>{
        e.preventDefault();
        fetch(url,{
            method:'POST',
            body:JSON.stringify({
                requestType:"VERIFY_EMAIL",
                idToken:authCtx.token,
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((res)=>{
            const data=res.json();
            data.then((resp)=>{
                console.log(resp);
            })
        }).catch((err)=>{
            console.log('err',err)
        })
    }



  return (
    <Fragment>
       
        <div className={classes.main}>
            <div className={classes.left}>
            Welcome to expance tracker!!!!
            </div>
            <div className={classes.right}>
                Your profile is incomplete.<Link to='/completeprofile'>Complete now</Link>
            </div>
        </div>
        <div className={classes.buttons}>
       
        <button className={classes.logout} onClick={logoutHandler}>logout</button>
        <button type='submit' onClick={verifyEmailHandler} className={classes.verifyEmail}>Verify Email</button>
        </div>
        <div className={classes.line}></div>
        
      <div className={classes.form}>
    
        </div>
        <div className={classes.table}>
        </div>
      
     
    </Fragment>
  )
}

export default Welcome;
