import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import ExpSliceReducer from './expenseReducer'


const store =configureStore({
    reducer:{auth:authReducer,exp:ExpSliceReducer}
});

export default store
  