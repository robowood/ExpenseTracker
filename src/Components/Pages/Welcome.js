import { Fragment } from "react";
import { Link } from "react-router-dom";
import classes from './Welcome.module.css'
const Welcome=()=>{

    const verifyEmailHandler=()=>{
        
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
           
            <button className={classes.logout} >logout</button>
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