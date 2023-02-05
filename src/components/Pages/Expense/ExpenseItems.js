import React, { Fragment, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "../../storeOfData/Store";
import { expAction } from "../../storeRedux/expenseReducer";
import { themeAction } from "../../storeRedux/themeReducer";
import classes from "./ExpenseItems.module.css";

const ExpenseItems = () => {
  const [amount, setAmount] = useState();
  const [catagory, setCatagory] = useState("Movie");
  const [discription, setDiscription] = useState();
  const [id, setid] = useState(null);
  const [isEditing, setisEditing] = useState(false);
  const [showExp, setshowExp] = useState(false);

  // const auth=useSelector(state=>state.auth.isAthenticated)

  // const ctx=useContext(StoreData);
  //Redux
  const dispatch = useDispatch();
  const totalItem = useSelector((state) => state.exp.items);

  const [reRender, setreRender] = useState(true);

  const amountChangeHandler = (e) => {
    setAmount(e.target.value);
  };
  const catagoryChangeHandler = (e) => {
    setCatagory(e.target.value);
  };
  const discriptionChangeHandler = (e) => {
    setDiscription(e.target.value);
  };

  const showExpenseHandler = () => {
    setshowExp((prev) => !prev);
  };

  const themeChangeHandler=()=>{
    dispatch(themeAction.themeChangeHandler())
  }

  const url = 'https://expense-tracker-15366-default-rtdb.firebaseio.com/';
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
    // ctx.addItem(newItem);
    dispatch(expAction.addItemHandler(newItem));
    // console.log('newItem',newItem);
  };

  const editHandler = (id, amount1, catagory1, description1) => {
    setisEditing(true);
    setid(id);
    setAmount(amount1);
    setCatagory(catagory1);
    setDiscription(description1);
  };

  const toDeleteData = async (id) => {
    const resp = await fetch(`${url}${email}/${id}.json`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const respo = await resp.json();
    setreRender((prev) => !prev);
    // console.log('respo',respo,id);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isEditing) {
      const response = await fetch(`${url}${email}.json`, {
        method: "POST",
        body: JSON.stringify({
          amount: amount,
          catagory: catagory,
          decription: discription,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data1 = await response.json();
      //  console.log('data222',data1);
    } else {
      const res = await fetch(`${url}${email}/${id}.json`, {
        method: "PUT",
        body: JSON.stringify({
          amount: amount,
          catagory: catagory,
          decription: discription,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setisEditing(false);
    }
    setreRender((prev) => !prev);
    //  getDataFrom();
    setAmount("");
    setCatagory("");
    setDiscription("");
  };
 

   const totalAmount=totalItem.reduce((curr,item)=>curr+Number(item.amount),0);

   const heading=['Expense', 'Catagory','Description'];

   const ExpToDwnld=[heading];

   totalItem.forEach(element => {
    ExpToDwnld.push([element.amount,element.catagory,element.decription])
   });

   const ExpToDwnld2=ExpToDwnld.map((row)=>
    row.join(',')).join('\n');

   const blob=new Blob([ExpToDwnld2]);

   const urlToDwnld=URL.createObjectURL(blob);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(`${url}${email}.json`, {
        method: "GET",
      });
      const data = await response.json();
      const newItem = [];
      for (let key in data) {
        newItem.push({ id: key, ...data[key] });
      }
      console.log("useEffectCalled");
      // ctx.addItem(newItem);
      dispatch(expAction.addItemHandler(newItem));
    }

    fetchMyAPI();
  }, [reRender]);

  return (
    <Fragment>
      <div className={classes.addExp}>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={showExpenseHandler}
        >
          {!showExp ? "+Add Expense" : "Close"}
        </button>
     {(totalAmount>=1000) &&  <button type="button"
          className="btn btn-secondary" onClick={themeChangeHandler}>Change</button>}
          {
            (totalAmount>=1000) &&  <button type="button"
            className="btn btn-secondary" >

            <a href={urlToDwnld} download='Expense.csv' style={{color:'white', textDecoration:'none'}}>Download Expense</a>

            </button>
          }
      </div>
      {showExp && (
        <div className={classes.form}>
          <div>
            <div>
              <label className="form-label">Choose Expense</label>
              <div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Amount"
                  onChange={amountChangeHandler}
                  value={amount}
                />
              </div>
            </div>

            <div className="chooseExpense">
              <label className="form-label">Choose Catagory</label>
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
          </div>
          <div className="secondDiv">
            <div className="col">
              <label className="form-label">Add Short Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                aria-label="Last name"
                onChange={discriptionChangeHandler}
                value={discription}
              />
            </div>
            <button
              className="btn btn-primary mt-4 btn1"
              type="submit"
              onClick={submitHandler}
            >
              {!isEditing ? "Submit" : "Update"}
            </button>
          </div>
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Expense</th>
            <th scope="col">Catagory</th>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            // ctx.items.map((item,indx)=>(
            // Redux
            totalItem.map((item, indx) => (
              <tr key={item.id}>
                <th scope="row">{indx + 1}</th>
                <td>{item.amount}</td>
                <td>{item.catagory}</td>
                <td>{item.decription}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={editHandler.bind(
                      null,
                      item.id,
                      item.amount,
                      item.catagory,
                      item.decription
                    )}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={toDeleteData.bind(null, item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className={classes.totalExpense}>
       <div className={classes.title}>
          Total Of Expense
       </div>
       <div className={classes.amount}>
        ${
         
         totalAmount

        }
        </div>
      </div>
    </Fragment>
  );
};

export default ExpenseItems;
