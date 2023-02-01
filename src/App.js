import React from 'react';
import Authentication from './Components/Auth/Authentication';
import Welcome from './Components/Pages/Welcome';
import { Route,Routes } from 'react-router-dom';
import AuthContext from './Store/auth-context';
import { useContext } from 'react';
import CompleteProfile from './Components/Pages/CompleteProfile';
import ForgetPassword from './Components/Pages/ForgetPassword/ForgetPassword';
import ExpenseItems from './Components/Pages/Expenses/ExpenseItem';
import Store from './Components/StoreData/Store';


function App() {
  const authCtx=useContext(AuthContext);
  return (
    <div>
      <Store>   
           <Routes>
        <Route path='/' element= { <Welcome />} />
        <Route path='/completeprofile' element={!authCtx.isLoggedIn ? <Authentication /> : <CompleteProfile />} />
        <Route path='/forgotPassword' element={<ForgetPassword />} />

        {/* <Route path='/completeprofile' element= {<CompleteProfile/>} /> */}

      


      </Routes>
      </Store>

    </div>
  );
}

export default App;
