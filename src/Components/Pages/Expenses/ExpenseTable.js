import React, { Fragment, useContext } from 'react'
import { StoreData } from '../../StoreData/Store';

const ExpenseTable = () => {

    const ctx=useContext(StoreData);

  return (
    <Fragment>

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
    ctx.items.map((item,indx)=>(
        <tr>
        <th scope="row" key={indx}>{indx}</th>
        <td>{item.amount}</td>
        <td>{item.catagory}</td>
        <td>{item.description}</td>
        <td><button type='button' className='btn btn-success' >Edit</button></td>
        <td><button type='button' className='btn btn-danger' >Delete</button></td>
      </tr>
    ))
}

      </tbody>
    </table>

    </Fragment>
  )
};

export default ExpenseTable
 