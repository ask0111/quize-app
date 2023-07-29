import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from './componenets/userProfile';
import MediaCard from './componenets/homePage';
import Edit from './componenets/edit';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/app' element={<UserProfile />}/>
      <Route path='/homePage' element={<MediaCard/>}/>
      <Route path= '/edit' element={<Edit/>}/>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);

