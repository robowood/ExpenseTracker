import { Fragment,useState } from "react";
import { Link } from "react-router-dom";
import classes from './contact.module.css';
const Contact=()=>{
  const [name,setName]=useState();
  const [imgUrl,setImgUrl]=useState();

    const nameChangeHandler=(e)=>{
      setName(e.target.value);
    };
    const imgUrlChangeHandler=(e)=>{
      setImgUrl(e.target.value);
    };
    const url='https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBA0u2j_pe10AsypQuTme8e1xEDdseCq4M'

    const submitHandler=(event)=>{
      event.preventDefault();
      fetch(url,{
        method:'POST',
        body:JSON.stringify({
            
             Name:name,
            photo:imgUrl,
            // deleteAttribute: "NULL",
            returnSecureToken:false
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then((res)=>{
        const data=res.json();
        data.then((resp)=>{
            if(resp.error){
                alert(resp.error.message)
            }else{
                console.log('resp',resp);
    
            }
        })
    }).catch((err)=>{
        alert(err);
    })
    
            console.log(name);
            console.log(imgUrl);
        }
    
    

    
    return (
        <Fragment>
        <form className={classes.main}>
    
        <div className={classes.header}>
            <div className={classes.ContactDetail}>
            Contact Details
            </div>
           <Link to='/'> <button className={classes.cancel}>Cancel</button></Link>
        </div>
        <div className={classes.input}>
          <div className={classes.left}>
          <img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' />

            <div className={classes.fullName}>Full Name : </div>
            <input type='text' onChange={nameChangeHandler} value={name}/>
          </div>
           <div className={classes.right}>
            <div className={classes.photourl}>Profile Photo url : </div>
            <input type='text' onChange={imgUrlChangeHandler} value={imgUrl} />
           </div>
        </div>
    <button className={classes.update} type='submit' onClick={submitHandler}>Update</button>
        <div className={classes.line}></div>
        </form>
        
        </Fragment>
      )
    
};
export default Contact;