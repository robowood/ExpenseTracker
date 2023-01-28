import React from 'react'
import classes from './CompleteProfile.module.css';
import Contact from './Contact';

const CompleteProfile = () => {
  return (
    <div className={classes.main}>
        <div className={classes.header}>
            <div className={classes.left}>
            Winners never quite, Quitters never win.
            </div>
            <div className={classes.right}>
                Your profile is 64% completed. A completed profile has a higher chances of landing a job.
                </div>
        </div>
        <div className={classes.line}></div>
        <div className={classes.contactDetail}>

            <Contact />
        </div>
    </div>
  )
}

export default CompleteProfile
