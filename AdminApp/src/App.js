import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddHotel from './pages/addHotel/AddHotel';
import AddRoom from './pages/addRoom/AddRoom';
import Dashboard from './pages/dashboard/Dashboard';
import EditHotel from './pages/editHotel/EditHotel';
import EditRoom from './pages/editRoom/EditRoom';
import Hotels from './pages/hotels/Hotels';
import PageNotFound from './pages/pageNotFound/PageNotFound';
import Rooms from './pages/rooms/Rooms';
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
        <Route path='/admin/hotels' element={<Hotels />} />
        <Route path='/admin/rooms' element={<Rooms />} />
        <Route path='/admin/addHotel' element={<AddHotel />} />
        <Route path='/admin/editHotel/:hotelId' element={<EditHotel />} />
        <Route path='/admin/addRoom' element={<AddRoom />} />
        <Route path='/admin/editRoom/:roomId' element={<EditRoom />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
