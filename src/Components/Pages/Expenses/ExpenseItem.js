import React from 'react'
import { useState,useContext } from 'react';
import  './ExpenseItem.css';
import { StoreData } from '../../StoreData/Store';
function ExpenseItem() {

  const ctx=useContext(StoreData)
const [amount,setAmount]=useState('');
const [description,setDiscription]=useState('');
const [catagory,setCatagory]=useState('');



    const catagoryChangeHandler=(e)=>{
        setCatagory(e.target.value);
    };
    const amountChangeHandler = (e) => {
        setAmount(e.target.value);
      };
    
    // const amountChangeHandler=(e)=>{
    //     setAmount(e.taget.value);
    // };
    const discriptionyChangeHandler=(e)=>{
       setDiscription( e.target.value);
       
    };
    const submitHandler=(e)=>{
      e.preventDefault();
        const expense={
            amount: amount,
            catagory:catagory,
            description:description
        };
        console.log(expense);
        console.log(ctx.addItem(expense));


    }

  return (
    <div onSubmit={submitHandler}>
    <div className="main-form" >
    <form>
      <div className="expenses">
        <label className="form-label">Choose Expense -</label>
        
          <span className="input-group-text">$ <input
            type="number"
            className="form-control"
            placeholder="enter amount"
            onChange={amountChangeHandler}
            value={amount}
          />
</span>
        
      </div>

      <div className="discription">
        <label className="form-label"> Add a discription -</label>
        <input type="text" 
        placeholder="enter description"
        onChange={discriptionyChangeHandler}
        value={description}
        ></input>
      </div>

    <div className="category">
    <label className="form-label">Choose Catagory -</label>
    <select
      className="form-select col"
      onChange={catagoryChangeHandler}
      value={catagory}
    >
      <option>Movie</option>
      <option>Shopping</option>
      <option>Rent</option>
      <option>Grocery</option>
    </select>
  </div>
  <button
  className="btn btn-primary mt-4 btn1"
  type="submit"
              //onClick={submitHandler}
              >
   Submit
</button>

  </form>

</div>
<div>


</div>
</div>
  )
};

export default ExpenseItem

