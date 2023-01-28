import React from 'react';
import Authentication from './Components/Auth/Authentication';
import Welcome from './Components/Pages/Welcome';
import { Route,Routes } from 'react-router-dom';
import AuthContext from './Store/auth-context';
import { useContext } from 'react';
import CompleteProfile from './Components/Pages/CompleteProfile';


function App() {
  const authCtx=useContext(AuthContext);
  return (
    <div>
      <Routes>
        <Route path='/' element= {!authCtx.isLoggedIn ? <Authentication /> : <Welcome />} />
        <Route path='/completeprofile' element={!authCtx.isLoggedIn ? <Authentication /> : <CompleteProfile />} />

        {/* <Route path='/completeprofile' element= {<CompleteProfile/>} /> */}

        {/* <Route path='/completeprofile' element={!isAuth ? <Authentication /> : <CompleteProfile />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} /> */}


      </Routes>

    </div>
  );
}

export default App;
