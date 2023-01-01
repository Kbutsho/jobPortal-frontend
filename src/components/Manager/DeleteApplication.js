import axios from 'axios';
import React, { useState } from 'react';
import { AiFillAppstore } from 'react-icons/ai';
import { ImProfile } from 'react-icons/im';
import { MdOutlineWork } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../../layouts/Navbar/Navbar';

const DeleteApplication = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState()
    const back = () => {
        navigate('/dashboard/manager/application')
    }
    const deleteApp = async () => {
        try {
            setLoading(!loading)
            axios.delete(`https://jobportal-api.onrender.com/api/manager/application/${id}`)
                .then(res => {
                    setLoading(false)
                    navigate('/dashboard/manager/application')
                    swal("success", res.data.message, "success")
                })
        } catch (error) {
            setLoading(false)
            swal("warning", error, "error")
        }
    }
    return (
        <div>
        <Navbar></Navbar>
        <div className='container' style={{ minHeight: "600px" }}>
            <div className="row">
                <div className="col-md-3">
                    <Link to="/dashboard/manager/profile" className='text-decoration-none'>
                        <div className='a-box d-flex justify-content-center align-items-center'>
                            <h4 className='fw-bold'><ImProfile size="22px" className='mb-2' /> Profile</h4>
                        </div>
                    </Link>
                </div>
                <div className="col-md-3">
                    <Link to="/dashboard" className='text-decoration-none'>
                        <div className='a-box d-flex justify-content-center align-items-center'>
                            <h4 className='fw-bold'><AiFillAppstore className='mb-2' />Dashboard</h4>
                        </div>
                    </Link>
                </div>
                <div className="col-md-3">
                    <Link to="/dashboard/manager/job" className='text-decoration-none' >
                        <div className='a-box d-flex justify-content-center align-items-center'>
                            <h4 className='fw-bold'><MdOutlineWork className='mb-2' /> All Job</h4>
                        </div>
                    </Link>
                </div>
                <div className="col-md-3">
                    <Link to="/dashboard/manager/application" className='text-decoration-none'>
                        <div className='a-box d-flex justify-content-center align-items-center'>
                            <h4 className='fw-bold'><AiFillAppstore className='mb-2' /> All Application</h4>
                        </div>
                    </Link>
                </div>

            </div>
            <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "450px" }}>
                <div className='delete p-5'>
                    {loading ? <h6 className='text-danger'> Deleting... please wait...</h6> : null}
                    <h4 className='text-danger'>Are you sure? to delete application id {id.slice(-6)}</h4>
                    <div className='d-flex justify-content-between mt-5'>
                        <button onClick={back} className='btn btn-sm btn-primary px-3'>Back</button>
                        <button onClick={deleteApp} className='btn btn-sm btn-danger px-3'>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default DeleteApplication;