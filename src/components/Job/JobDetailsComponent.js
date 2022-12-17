import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { BiTimeFive, BiCurrentLocation } from 'react-icons/bi';
import { MdOutlineDateRange} from 'react-icons/md';

const JobDetailsComponent = () => {
    const { id } = useParams()
    const [job, setJob] = useState({});
    useEffect(() => {
        getJobDetails(id)
    }, [id])
    const getJobDetails = async (id) => {
        try {
            await axios.get(`/jobs/${id}`)
                .then(res => {
                    if (res.data.error) {
                        swal(res.data.error, res.data.message, "error")
                    } else if (res.data.data) {
                        setJob(res.data.data)
                    }
                })
        } catch (error) {
            console.log(error)
            swal(error.message, error.name, "error")
        }
    }
    return (
        <div className='container my-5 pt-5 px-5' style={{ background: "#F5F7FC", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
            <div className="row">
                <div className="col-md-8 col-12" style={{ minHeight: "70vh" }}>
                    <h2 className='fw-bold'>Job Description</h2>
                    <h4><span className='fw-bold'>{job.companyName}</span> job circular job details.</h4>
                    <p>{job.companyDetails}. {job.jobDescription}.</p>
                    <table className='table table-striped table-bordered table-hover mb-5' style={{ border: "1px solid black" }}>
                        <thead>
                            <tr>
                                <th>Job Details</th>
                                <th>Job ID {job._id}</th>
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
                                <td>Application Procedure</td>
                                <td>Send your cv to <span className='fw-bold'>{job?.hiringManager?.email}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Deadline</td>
                                <td>{job?.deadline?.toString().split(':')[0].split('T')[0].split("-").reverse().join('/')}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-md-4 col-12" style={{ minHeight: "70vh" }}>

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
            </div>
        </div>
    );
};

export default JobDetailsComponent;