import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddHotel from './pages/addHotel/AddHotel';
import Dashboard from './pages/dashboard/Dashboard';
import PageNotFound from './pages/pageNotFound/PageNotFound';
import Transactions from './pages/transactions/Transactions';
import Users from './pages/users/Users';

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/transactions' element={<Transactions />} />
        <Route path='/admin/users' element={<Users />} />
        <Route path='/admin/addHotel' element={<AddHotel />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
