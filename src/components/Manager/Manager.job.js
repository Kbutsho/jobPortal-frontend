import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { AiFillAppstore } from 'react-icons/ai';
import { ImProfile } from 'react-icons/im';
import { MdAdd, MdOutlineWork } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
//import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import swal from 'sweetalert';
import Navbar from '../../layouts/Navbar/Navbar';

const ManagerJob = () => {
    const [job, setJob] = useState()
    const navigate = useNavigate();
   // const [loading, setLoading] = useState(false);
    useEffect(() => {
        axios.get('https://jobportal-api.onrender.com/api/manager/jobs')
            .then(res => {
               // console.log(res.data)
                if (res.data.data) {
                    setJob((res.data.data));
                } else if (res.data.error) {
                    navigate('/login')
                    swal("warning", res.data.error, "error")
                }
            })
    },[navigate])
    const details = (id) => {
        const url = `/job/${id}/details`;
        navigate(url);
    }
    const edit = (id) => {
        navigate(`/dashboard/manager/job/${id}/edit`)
    }

    const application = (id) =>{
        navigate(`/dashboard/manager/job/${id}/applications`)
    }
    const deleteApp =  (id) => {
        navigate(`/dashboard/manager/job/${id}/delete`)
        // try {
        //     setLoading(!loading)
        //     axios.delete(`https://jobportal-api.onrender.com/api/jobs/${id}`)
        //         .then(res => {
        //             setLoading(false)
                    
        //             window.location.reload(false);
        //             swal("success", res.data.message, "success")
        //         })
        // } catch (error) {
        //     setLoading(false)
        //     swal("warning", error, "error")
        // }
    }
const postJob = ()=>{
    navigate(`/dashboard/manager/job/post`)
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
                    <Link to="/dashboard/manager/job" className='text-decoration-none' style={{  color: "red" }}>
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
            <button onClick={postJob} className='mb-3 btn btn-danger'>Post new job<MdAdd size="24px" className='ms-1'/> </button>
            {
                job ? 
               
                job.length === 0 ? <div  className='d-flex justify-content-center align-items-center' style={{ minHeight: "400px" }}>
                    <h4 className='fw-bold text-danger'>No Job found</h4>
                </div> : 
                <div className='d-flex justify-content-center' style={{ minHeight: "600px" }}>
                        <div style={{ width: "100%" }}>
                            <h4 className='text-center mb-3 mt-3 fw-bold bg-primary pb-3 pt-4 text-white' style={{ borderRadius: "5px" }}>Your Posted Total Job {job.length}</h4>
                           
                            <Table responsive className='table table-bordered' style={{ border: '1px solid lightGray' }}>
                                <thead style={{ background: 'lightGray' }}>
                                    <tr className='text-center'>
                                        <th>#</th>
                                        <th>Job ID</th>
                                        <th>Location</th>
                                        <th>Salary</th>
                                        <th>Job Type</th>
                                        <th>Vacancy</th>
                                        <th>Job Posted</th>
                                        <th>Deadline</th>                                    
                                        <th>Application</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        job.map((job, index) =>
                                            <tr key={job._id} className="text-center">
                                                <td>{index + 1}</td>
                                                <td>{job._id.slice(-6)}</td>
                                                <td>{job.location}</td>
                                                <td>{job.salary}</td>
                                                <td>{job.jobType}</td>
                                                <td>{job.vacancy}</td>
                                                <td>{job.createdAt.toString().split(':')[0].split('T')[0].split("-").reverse().join('/')}</td>
                                                <td>{job.deadline.toString().split(':')[0].split('T')[0].split("-").reverse().join('/')}</td>
                                                <td>{job.appliedCandidate.length}</td>
                                                <td>
                                                <button onClick={() => application(job._id)} className='btn btn-sm btn-success text-white m-2'>Application</button>
                                                    <button onClick={() => details(job._id)} className='btn btn-sm btn-primary'>Details</button>
                                                    <button onClick={() => edit(job._id)} className='btn btn-sm btn-warning m-2 px-3'>Edit</button>
                                                    <button onClick={()=> deleteApp(job._id)} className='btn btn-sm btn-danger'>Delete</button>
                                                </td>
                                                
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
               
                 : <div className='d-flex justify-content-center align-items-center' style={{ height: "86vh" }}>
                    <h4 className='fw-bold text-uppercase text-danger d-flex'>Loading <PulseLoader style={{ margin: "3px 0 0 3px" }} color="red" size="8px" /><PulseLoader style={{ margin: "3px 0 0 0px" }} color="red" size="8px" /></h4>
                </div>     
            }

        </div>
        </div>
    );
};

export default ManagerJob;