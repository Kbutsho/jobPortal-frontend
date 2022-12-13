import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
//import Navbar from './layouts/Navbar/Navbar';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Registration from './pages/Registration/Registration';
import './App.css';

axios.defaults.baseURL = "https://jobportal-api.onrender.com/api";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

const App = () => {
  return (
    <div className='app'>
      {/* <Navbar></Navbar> */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;