import axios from 'axios';
import React, { useState } from 'react';
import { AiFillAppstore } from 'react-icons/ai';
import { ImProfile } from 'react-icons/im';
import { MdOutlineWork } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../../layouts/Navbar/Navbar';

const ApplicationStatus = () => {
    const { id } = useParams()
    const [appStatus, setAppStatus] = useState({
        status: '',
        error: []
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const statusChange = (e) => {
        setAppStatus({ [e.target.name]: e.target.value })
    }
    const submit = async (e) => {
        e.preventDefault()
        try {
            // setLoading(!loading)
            const data = {
                'status': appStatus.status
            }
            await axios.patch(`https://jobportal-api.onrender.com/api/manager/application/${id}`, data)
                .then(res => {
                    //console.log(res.data)
                    if (res.data.data) {
                        setLoading(false)
                        swal("success", res.data.message, "success")
                        navigate('/dashboard/manager/application')
                        setAppStatus({
                            errors: ''
                        })
                        swal("success", res.data.message, "success");
                    } else if (res.data.error === 'application is upto date!') {
                        setLoading(false)
                        swal("warning", res.data.message, "error");
                    } else {
                        setLoading(false)
                        setAppStatus({ ...appStatus, error: res.data.error });
                        swal("warning", res.data.message, "error");
                    }
                })
        } catch (error) {
            setLoading(false)
            swal("warning", error, "error")
        }
    }
   
    return (
        <div>
            <Navbar></Navbar>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <Link to="/dashboard/candidate/profile" className='text-decoration-none'>
                            <div className='a-box d-flex justify-content-center align-items-center'>
                                <h4 className='fw-bold'><ImProfile size="22px" className='mb-2' /> Profile</h4>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-3">
                        <Link to="/dashboard" className='text-decoration-none'>
                            <div className='a-box d-flex justify-content-center align-items-center'>
                                <h4 className='fw-bold'><AiFillAppstore size="22px" className='mb-2' /> Dashboard</h4>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-3">
                        <Link to="/dashboard/manager/job" className='text-decoration-none'>
                            <div className='a-box d-flex justify-content-center align-items-center'>
                                <h4 className='fw-bold'><MdOutlineWork size="22px" className='mb-2' /> All Job</h4>
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
                <h4 className='text-center mb-5 mt-3 fw-bold bg-primary pb-3 pt-4 text-white' style={{ borderRadius: "5px" }}>Status for application ID #{id.slice(-6)}</h4>
                <div className='d-flex justify-content-center my-5'>
                    <div className='form' >
                        {loading ? <p className='my-3 text-danger fw-bold'>submitting....</p> : null}
                        <form onSubmit={submit} >
                            <select onChange={statusChange} name="status" className='form-select' >
                                {/* <option value="pending">Select Status</option> */}
                                <option value="pending">Pending</option>
                                <option value="accept">Accept</option>
                                <option value="processing">Processing</option>
                                <option value="reject">Reject</option>
                                <option value="hired">Hired</option>
                            </select>
                            <div className='mt-2' style={{
                                color: "red", fontSize: "12px", fontWeight: "bold"
                            }}>{appStatus?.error?.status ? <span>{appStatus?.error?.status}</span> : null}</div>
                            <div className='d-flex justify-content-between'>

                                <Link to="/dashboard/manager/application" className='btn btn-danger btn-sm mt-4 px-3' >Back</Link>
                                <button type="submit" className='btn mt-4 btn-sm btn-primary'>Submit</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationStatus;