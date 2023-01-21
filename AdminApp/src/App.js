import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/dashboard/Dashboard';
import PageNotFound from './pages/pageNotFound/PageNotFound';

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
