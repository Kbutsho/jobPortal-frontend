/* eslint-disable jsx-a11y/iframe-has-title */
//import axios from 'axios';
import React from 'react';
import {  useNavigate } from 'react-router-dom';
import Navbar from '../../layouts/Navbar/Navbar';
import './Dashboard.css'
import { ImProfile } from 'react-icons/im';
import { AiFillAppstore } from 'react-icons/ai';

const CandidateDashboard = () => {
    const navigate = useNavigate()
    const application = (e)=>{
       //e.preventDefault()
        navigate('/dashboard/candidate/application')
        //window.location.reload(false);
    }
    const profile = ()=>{
        navigate('/dashboard/candidate/profile')
        window.location.reload(false);
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className="container mb-5 d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
                <div>
                <h4 className='fw-bold text-center bg-primary pt-4 pb-3 text-white' style={{  boxShadow: "rgba(0, 0, 0, 0.35) 0px 3px 5px",borderRadius: "5px" }}>Welcome to Dashboard</h4>
                <div className="row">
                    <div className="col-md-6" style={{ width: "300px", height: "120px", margin: "20px auto",cursor: "pointer" }}>
                    <span onClick={profile} className='text-decoration-none text-primary'>
                            <div className='d-box d-flex justify-content-center align-items-center'>
                                <h4 className='fw-bold'><ImProfile size="22px" className='mb-2'/> Profile</h4>
                            </div>
                        </span>
                    </div>
                    <div className="col-md-6" style={{ width: "300px", height: "120px", margin: "20px auto", cursor: "pointer" }}>
                        <span  onClick={application}  className='text-decoration-none text-primary'>
                            <div className='d-box d-flex justify-content-center align-items-center'>
                                <h4 className='fw-bold'><AiFillAppstore  className='mb-2' /> Application</h4>
                            </div>
                        </span>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateDashboard;