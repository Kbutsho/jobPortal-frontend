import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiFillAppstore } from 'react-icons/ai';
import { ImProfile } from 'react-icons/im';
import { MdOutlineWork } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { PulseLoader, RotateLoader } from 'react-spinners';
import swal from 'sweetalert';
import Navbar from '../../layouts/Navbar/Navbar';

const ManagerProfile = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const data = async () => {
            setLoading(!loading)
            try {
                await axios.get('/user/me')
                    .then(res => {
                        if (res.data.error) {
                            setLoading(false)
                            navigate(`/login`)
                            swal(res.data.error, res.data.message, "error")
                        } else if (res.data.data) {
                            setLoading(false)
                            setData(res.data.data.user)
                        }
                    })
            } catch (error) {
                setLoading(false)
                navigate(`/login`)
                swal("warning", error.message, "error")
            }
        }
        data()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    console.log(data);
    return (
        <div>
            <Navbar></Navbar>
            <div className="container">
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
                        <Link to="/dashboard/manager/job" className='text-decoration-none' style={{ color: "red" }}>
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
                <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "500px" }}>
                    <div>
                        {
                            data && !loading ? 
                            <div className='form-control p-5'>
                                <p c>Name: {data?.name}</p>
                                <p>Email: {data?.email}</p>
                                <p>Phone: {data?.phone}</p>
                                <p>User Role: {data?.role}</p>
                            </div> : 
                            <h4 className='fw-bold text-danger d-flex'>Loading. please wait<PulseLoader style={{ margin: "3px 0 0 3px" }} color="red" size="8px" /></h4>
                        }
                    </div>
                    {
                        loading ? <div className='loading d-flex justify-content-center align-items-center' style={{ minHeight: "100vh" }}>
                            <RotateLoader color='yellow' className='mt-5' />
                        </div> : null
                    }
                </div>
            </div>

        </div>
    );
};

export default ManagerProfile;