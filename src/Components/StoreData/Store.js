
import React, { useState } from "react";
export const StoreData=React.createContext();

const Store = (props) => {
    const [items,setItems]=useState([]);
    const [editing,setediting]=useState(false)
    const [ id,setid] =useState()
    const [amount ,setamount] =useState()
    const [catagory ,setcatagory] =useState()
    const [ description,setdescription] =useState()

    const url='https://expense-tracker-15366-default-rtdb.firebaseio.com/';

    const addItemHandler = async (newItem)=>{
        const data=await newItem
        // setItems([data]);
        setItems([...data]);
        console.log(items);
    };

    const editItemHandler =async (id,amount,catagory,description)=>{
      setediting(true)
     setid(id);
     setamount(amount);
     setcatagory(catagory);
     setdescription(description); 
     console.log('storeEdit');
    }

    const editinghandler=()=>{
        setediting((prev)=>!prev)
    }

    const storeValue={
      // items:[],
        items:items,
        addItem:addItemHandler,
        editItem:editItemHandler,
        isEditing:editinghandler,
        editing:editing,
        id: id,
        amount: amount,
        catagory: catagory,
        description: description,
    }

  return (
    <StoreData.Provider value={storeValue}>
        {props.children}
    </StoreData.Provider>
  )
}
export default Store
