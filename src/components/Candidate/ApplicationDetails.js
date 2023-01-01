/* eslint-disable jsx-a11y/iframe-has-title */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { AiFillAppstore } from 'react-icons/ai';
import { ImProfile } from 'react-icons/im';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import swal from 'sweetalert';
import Navbar from '../../layouts/Navbar/Navbar';

const ApplicationDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`https://jobportal-api.onrender.com/api/candidate/application/${id}`)
            .then(res => {
                if(res.data.error){
                    swal("warning", res.data.error, "error")
                    navigate('/login')
                }else if(res.data.data){
                    setData(res.data.data)
                }
            })
            .catch((err) => {
                swal("warning", err.message, "error")
            })
    }, [id,navigate])
    return (
        <div>
            <Navbar></Navbar>
            <div className='container'>
                {
                    data ?
                        <div>
                            <div className="row">
                                <div className="col-md-4">
                                    <Link to="/dashboard" className='text-decoration-none'>
                                        <div className='a-box d-flex justify-content-center align-items-center'>
                                            <h4 className='fw-bold'><AiFillAppstore size="22px" className='mb-2' /> Dashboard</h4>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-md-4">
                                    <Link to="/dashboard/candidate/profile" className='text-decoration-none'>
                                        <div className='a-box d-flex justify-content-center align-items-center'>
                                            <h4 className='fw-bold'><ImProfile className='mb-2' /> Profile</h4>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-md-4">
                                    <Link to="/dashboard/candidate/application" className='text-decoration-none'>
                                        <div className='a-box d-flex justify-content-center align-items-center'>
                                            <h4 className='fw-bold'><AiFillAppstore size="22px" className='mb-2' /> Application</h4>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-md-6">
                                    <h4 className='bg-primary px-3 pb-3 pt-4 text-white' style={{ borderRadius: "5px", marginBottom: "35px"}}><span className='fw-bold'>Application ID #{data?._id?.slice(-6)} Details</span></h4>
                                    {/* <p>{data?.jobId?.companyDetails}. {data?.jobId?.jobDescription}</p> */}
                                    <Table striped hover responsive className='table table-striped table-bordered table-hover' style={{ border: "1px solid black" }}>
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>ID #{data?._id?.slice(-6)}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Company</td>
                                                <td>{data?.jobId?.companyName}</td>
                                            </tr>
                                            <tr>
                                                <td>Post Name</td>
                                                <td>{data?.jobId?.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Skills</td>
                                                <td>{data?.jobId?.Skills}</td>
                                            </tr>
                                            <tr>
                                                <td>Location</td>
                                                <td className='text-capitalize'>{data?.jobId?.location}, Dhaka</td>
                                            </tr>
                                            <tr>
                                                <td>Vacancy</td>
                                                <td>0{data?.jobId?.vacancy} </td>
                                            </tr>
                                            <tr>
                                                <td>Cover Letter</td>
                                                <td>{data?.coverLetter}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Salary</td>
                                                <td>{data?.jobId?.salary}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Application Date</td>
                                                <td>{data?.createdAt?.toString().split(':')[0].split('T')[0].split("-").reverse().join('/')}</td>
                                            </tr>
                                        </tbody>
                                    </Table>

                                </div>
                                <div className="col-md-6">
                                    <iframe src={data?.resume} width="100%" height="475px" frameBorder="0"></iframe>
                                </div>
                            </div>
                        </div> : <div className='d-flex justify-content-center align-items-center' style={{ height: "86vh" }}>
                            <h4 className='fw-bold text-uppercase text-danger d-flex'>Loading <PulseLoader style={{ margin: "3px 0 0 3px" }} color="red" size="8px" /><PulseLoader style={{ margin: "3px 0 0 0px" }} color="red" size="8px" /></h4>
                        </div>
                }
            </div>
        </div>
    );
};

export default ApplicationDetails;