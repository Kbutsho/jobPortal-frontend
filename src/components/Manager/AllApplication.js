import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiFillAppstore } from 'react-icons/ai';
import { ImProfile } from 'react-icons/im';
import { MdOutlineWork } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../../layouts/Navbar/Navbar';
import { PulseLoader } from 'react-spinners';
import { Table } from 'react-bootstrap';
//import { Modal, ModalBody, ModalFooter } from 'reactstrap';

const AllApplication = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(!loading)
        axios.get('/manager/application')
            .then(res => {
                if (res.data.data) {
                    setLoading(false)
                    setData(res.data.data)
                } else if (res.data.error) {
                    setLoading(false)
                    navigate('/login');
                    swal(res.data.error, res.data.message, "warning")
                }
            })
    }, [navigate, loading])
    const Status = (appId) => {
        navigate(`/dashboard/manager/application/${appId}/status`)
    }
    const details = (id) => {
        navigate(`/dashboard/manager/application/${id}/details`)
    }
    const deleteApp = (id) => {
       navigate(`/dashboard/manager/application/${id}/delete`)
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
                            <div className='a-box d-flex justify-content-center align-items-center' style={{ color: "red" }}>
                                <h4 className='fw-bold'><AiFillAppstore className='mb-2' /> All Application</h4>
                            </div>
                        </Link>
                    </div>

                </div>
               {
                data ? data.length === 0 ? <div  className='d-flex justify-content-center align-items-center' style={{ minHeight: "400px" }}>
                    <h4 className='fw-bold text-danger'>No Application found</h4>
                </div> : 
                <div className='d-flex justify-content-center' style={{ minHeight: "600px" }}>
                                <div style={{ width: "100%" }}>
                                    <h4 className='text-center mb-5 mt-3 fw-bold bg-primary pb-3 pt-4 text-white' style={{ borderRadius: "5px" }}> Your total application {data.length}</h4>
                                    <Table responsive className='table table-bordered' style={{ border: '1px solid lightGray' }}>
                                        <thead style={{ background: 'lightGray' }}>
                                            <tr className='text-center'>
                                                <th>#</th>
                                                <th>Application ID</th>
                                                <th>Candidate ID</th>
                                                <th>Candidate Name</th>
                                                <th>Candidate Email</th>
                                                <th>Application Date</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.map((app, index) =>
                                                    <tr key={app._id} className="text-center">
                                                        <td>{index + 1}</td>
                                                        <td>{app._id.slice(-6)}</td>
                                                        <td>{app.candidateId.slice(-6)}</td>
                                                        <td>{app.name}</td>
                                                        <td>{app.email}</td>
                                                        <td>{app.createdAt.toString().split(':')[0].split('T')[0].split("-").reverse().join('/')}</td>
                                                        <td className='fw-bold text-danger'>{app.status}</td>
                                                        <td>
                                                            <button onClick={() => details(app._id)} className='btn btn-sm btn-primary'>Details</button>
                                                            <button onClick={()=>Status(app._id)} className='btn btn-sm btn-success m-2 px-3'>Status</button>
                                                            <button onClick={()=> deleteApp(app._id)} className='btn btn-sm btn-danger'>Delete</button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div> : 
                <div className='d-flex justify-content-center align-items-center' style={{ height: "86vh" }}>
                    <h4 className='fw-bold text-uppercase text-danger d-flex'>Loading <PulseLoader style={{ margin: "3px 0 0 3px" }} color="red" size="8px" /><PulseLoader style={{ margin: "3px 0 0 0px" }} color="red" size="8px" /></h4>
                </div> 
               }
            </div>
        </div>
    );
};

export default AllApplication;