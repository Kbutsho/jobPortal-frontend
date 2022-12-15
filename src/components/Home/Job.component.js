import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { GetAllJob } from '../../services/Job.service';
import PulseLoader from "react-spinners/PulseLoader";
import JobCard from './JobCard';

const Job = () => {
    const [jobs, setJobs] = useState([])
    useEffect(()=>  {
        getAllJob()
    },[])

    const getAllJob = async ()=>{
        try {
            const response = await GetAllJob();
            setJobs(response.data.data)
        } catch (error) {
            swal("warning", error.data.error, "error")
        }
    }
    console.log(jobs);
    return (
        <div>
            {
                jobs.length === 0 ? <div className='d-flex justify-content-center align-items-center' style={{ height: "86vh" }}>
                <h4 className='fw-bold text-uppercase text-danger d-flex'>Loading <PulseLoader style={{ margin: "3px 0 0 3px" }} color="red" size="8px" /><PulseLoader style={{ margin: "3px 0 0 0px" }} color="red" size="8px" /></h4>
            </div>
                 :
                <div className="container mt-4">
                    <h4 style={{ borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} className='p-3 text-uppercase bg-primary text-center fw-bold text-white'>Available job {jobs.length}</h4>
                    <div className="job-area">
                        <div className="row">
                            {
                                jobs.map(jobs => <JobCard key={jobs._id} jobs={jobs}></JobCard>)
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Job;