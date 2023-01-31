import React from 'react'
import { useState,useContext ,useEffect} from 'react';
import  './ExpenseItem.css';
import { StoreData } from '../../StoreData/Store';
function ExpenseItem() {

  const ctx=useContext(StoreData)
const [amount,setAmount]=useState('');
const [description,setDiscription]=useState('');
const [catagory,setCatagory]=useState('');
const [isEditing, setisEditing] = useState(false);
const [reRender, setreRender] = useState(true);



const discriptionChangeHandler=(e)=>{
  setDiscription( e.target.value);
  
}

    const catagoryChangeHandler=(e)=>{
        setCatagory(e.target.value);
    };
    const amountChangeHandler = (e) => {
        setAmount(e.target.value);
      };
  const url = "https://expense-tracker-15366-default-rtdb.firebaseio.com/";
  const email = localStorage.getItem("email");

  const getDataFrom = async () => {
    const response = await fetch(`${url}${email}.json`, {
      method: "GET",
    });
    const data = await response.json();
    console.log("data111", data);
    const newItem = [];
    for (let key in data) {
      newItem.push({ id: key, ...data[key] });
    }
     ctx.addItem(newItem);
    // dispatch(expAction.addItemHandler(newItem));
     console.log('newItem',newItem);
  };
    
    const submitHandler= async(e)=>{
      e.preventDefault();
        const expense={
            amount: amount,
            catagory:catagory,
            description:description
        };
        console.log(expense);
        ctx.addItem(expense)

      
          const response = await fetch(`${url}${email}.json`, {
            method: "POST",
            body: JSON.stringify({
              amount: amount,
              catagory: catagory,
              decription: description,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          // const data1 = await response.json();
          //  console.log('data222',data1);
        // } else {
        //   const res = await fetch(`${url}${email}.json`, {
        //     method: "PUT",
        //     body: JSON.stringify({
        //       amount: amount,
        //       catagory: catagory,
        //       decription: description,
        //     }),
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   });
        //   setisEditing(false);
        // }
        setreRender((prev) => !prev);

        //  getDataFrom();
        setAmount("");
        setCatagory("");
        setDiscription("");
      
       }
       useEffect(() => {
        async function fetchMyAPI() {
          let response = await fetch(`${url}${email}.json`, {
            method: "GET",
          });
          const data = await response.json();
          console.log(data);
        }
        getDataFrom()
          fetchMyAPI();
        }, [reRender]);
      
  

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
        onChange={discriptionChangeHandler}
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

