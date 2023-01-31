import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './Store/auth-context';

import './index.css';
import App from './App';
import { StoreData } from './Components/StoreData/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<AuthContextProvider>
<StoreData.Provider>
<BrowserRouter >  
<App />
</BrowserRouter>
</StoreData.Provider>
</AuthContextProvider>
);
