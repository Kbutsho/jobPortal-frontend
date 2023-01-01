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
import Apply from './pages/Job/Apply';
import JobDetails from './pages/Job/JobDetails';
import Test from './pages/Test';
import CandidateApplication from './pages/Application/CandidateApplication';
import ApplicationDetails from './components/Candidate/ApplicationDetails';
import ApplicationEdit from './pages/Application/ApplicationEdit';
import ManagerJob from './components/Manager/Manager.job';
import ManagerJobDetails from './components/Manager/ManagerJobDetails';
import UpdateManagerJob from './components/Manager/UpdateManagerJob';
import CandidateProfile from './components/Candidate/CandidateProfile';
import ManagerProfile from './components/Manager/ManagerProfile';
import JobAllApplications from './components/Manager/JobAllApplications';
import ManagerApplicationDetails from './components/Manager/ManagerApplicationDetails';
import ApplicationStatus from './components/Manager/ApplicationStatus';
import PostJob from './components/Manager/PostJob';
import DeleteJob from './components/Manager/DeleteJob';
import AllApplication from './components/Manager/AllApplication';
import DeleteApplication from './components/Manager/DeleteApplication';

// https://jobportal-api.onrender.com/api
// https://jobportal-api.onrender.com/api

// axios.post(url, data, {
//   headers: {
//     'Authorization': `Basic ${token}`
//   },
// })
let token = localStorage.getItem('token') 
axios.defaults.baseURL = "https://jobportal-api.onrender.com/api";  
//axios.defaults.headers.post['Content-Type'] = 'application/json';
//axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.headers.post['Accept'] = 'application/json';
if(token){
  axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
}


const App = () => {
  return (
      <div className='app'>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/test" element={<Test />} />
          <Route path="/about" element={<About />} />
          <Route path="/job/:id/apply" element={<Apply />} />
          <Route path="/dashboard/candidate/profile" element={<CandidateProfile />} />
          <Route path="/dashboard/candidate/application" element={<CandidateApplication />} />
          <Route path="/dashboard/candidate/application/:id/details" element={<ApplicationDetails />} />
          <Route path="/dashboard/candidate/application/:id/edit" element={<ApplicationEdit />} />
          <Route path="/dashboard/manager/profile" element={<ManagerProfile />} />
          <Route path="/dashboard/manager/job" element={<ManagerJob />} />
          <Route path="/dashboard/manager/job/:id/applications" element={<JobAllApplications />} />
          <Route path="/dashboard/manager/application/:id/status" element={<ApplicationStatus />} />
          <Route path="/dashboard/manager/application/:id/details" element={<ManagerApplicationDetails />} />
          <Route path="/dashboard/manager/job/:id/details" element={<ManagerJobDetails />} />
          <Route path="/dashboard/manager/job/:id/edit" element={<UpdateManagerJob />} />
          <Route path="/dashboard/manager/job/:id/delete" element={<DeleteJob />} />
          <Route path="/dashboard/manager/application/:id/delete" element={<DeleteApplication />} />
          <Route path="/dashboard/manager/job/post" element={<PostJob />} />
          <Route path="/dashboard/manager/application" element={<AllApplication />} />

          <Route path="/job/:id/details" element={<JobDetails />} />
          <Route path="/not-found" element={<About />} />
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