import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { BiTimeFive, BiCurrentLocation } from 'react-icons/bi';
import { MdOutlineDateRange} from 'react-icons/md';
import { Table } from 'react-bootstrap';
import { PulseLoader } from 'react-spinners';

const JobDetailsComponent = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true);
    const [job, setJob] = useState({});
    useEffect(() => {
        getJobDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    console.log(job);
    const getJobDetails = async () => {
        try { 
            setLoading(!loading);
            await axios.get(`/jobs/${id}`)
                .then(res => {
                    if (res.data.error) {
                        setLoading(true);
                        swal(res.data.error, res.data.message, "error")
                    } else if (res.data.data) {
                        setLoading(true);
                        setJob(res.data.data)
                    }
                })
        } catch (error) {
            swal(error.message, error.name, "error")
        }
    }
    return (
        <div className='container my-5 py-5 px-3' style={{minHeight: "60vh", background: "#F5F7FC"}}>
            {
                loading ? <div className="row">
                <div className="col-md-8 col-12" style={{ minHeight: "60vh" }}>
                    <h3><span className='fw-bold'>{job?.companyName}</span> job circular job details.</h3>
                    <p>{job.companyDetails}. {job?.jobDescription}.</p>
                    <Table striped hover responsive className='table table-striped table-bordered table-hover' style={{ border: "1px solid black" }}>
                        <thead>
                            <tr>
                                <th>Job Description</th>
                                <th>Job ID #{job._id?.slice(-6)}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Employer</td>
                                <td>{job?.companyName}</td>
                            </tr>
                            <tr>
                                <td>Post Name</td>
                                <td>{job?.name}</td>
                            </tr>
                            <tr>
                                <td>Skills</td>
                                <td>{job?.Skills}</td>
                            </tr>
                            <tr>
                                <td>Location</td>
                                <td className='text-uppercase'>{job?.location}, Dhaka</td>
                            </tr>
                            <tr>
                                <td>Vacancy</td>
                                <td>0{job?.vacancy} </td>
                            </tr>
                            <tr>
                                <td>Job Type</td>
                                <td>{job?.jobType}
                                </td>
                            </tr>
                            <tr>
                                <td>Salary</td>
                                <td>{job?.salary}
                                </td>
                            </tr>
                            <tr>
                                <td>Application</td>
                                <td>Send your cv to <span className='fw-bold'>{job?.hiringManager?.email}</span>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="col-md-4 col-12" style={{ minHeight: "60vh" }}>

                    <button className='btn btn-primary px-5'>Apply Now</button>
                    <div className='deadline d-flex align-items-center my-5'>
                        <BiTimeFive size="30px" />
                        <div className='ms-3'>
                            <h5 className='fw-bold'>Deadline</h5>
                            <span className='fw-bold text-danger'>{job?.deadline?.toString().split(':')[0].split('T')[0].split("-").reverse().join('/')}</span>
                        </div>
                    </div>
                    <div className="location d-flex align-items-center my-5">
                        <BiCurrentLocation size="30px"/>
                        <div className='ms-3'>
                            <h5 className='fw-bold'>Location</h5>
                            <span className='text-uppercase'>{job?.location}, Dhaka</span>
                        </div>
                    </div>
                    <div className="job-posted d-flex align-items-center my-5">
                        <MdOutlineDateRange size="30px"/>
                        <div className='ms-3'>
                            <h5 className='fw-bold'>Job Posted</h5>
                            <span className='text-uppercase'>{job?.createdAt?.toString().split(':')[0].split('T')[0].split("-").reverse().join('/')}</span>
                        </div>
                    </div>
                </div>
            </div>: <div className='d-flex justify-content-center align-items-center' style={{ height: "65vh" }}>
                    <h4 className='fw-bold text-uppercase text-danger d-flex'>Loading <PulseLoader style={{ margin: "3px 0 0 3px" }} color="red" size="8px" /><PulseLoader style={{ margin: "3px 0 0 0px" }} color="red" size="8px" /></h4>
                </div>
            }
        </div>
    );
};

export default JobDetailsComponent;