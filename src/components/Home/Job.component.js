import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { GetAllJob } from '../../services/Job.service';
import PulseLoader from "react-spinners/PulseLoader";
import JobCard from './JobCard';

const Job = () => {
    const [jobs, setJobs] = useState([])
    useEffect(() => {
        getAllJob()
    }, [])
    const getAllJob = async () => {
        try {
            const response = await GetAllJob();
            setJobs(response.data.data)
        } catch (error) {
            swal("warning", error.data.error, "error")
        }
    }
    // filtering
    const [value, setValue] = useState('');
    const [tableFilter, setTableFilter] = useState([]);

    const filterData = (e) => {
        if (e.target.value !== "") {
            setValue(e.target.value);
            const filterTable = jobs.filter(o => Object.keys(o).some(k =>
                String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
            ));
            setTableFilter([...filterTable])
        } else {
            setValue(e.target.value);
        }
    }
   
    return (
        <div style={{ minHeight: "600px" }}>
            {
                jobs.length === 0 ? <div className='d-flex justify-content-center align-items-center' style={{ height: "86vh" }}>
                    <h4 className='fw-bold text-uppercase text-danger d-flex'>Loading <PulseLoader style={{ margin: "3px 0 0 3px" }} color="red" size="8px" /><PulseLoader style={{ margin: "3px 0 0 0px" }} color="red" size="8px" /></h4>
                </div>
                    :
                    <div className="container mt-4">
                        <h4 style={{ borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 3px 5px" }} className='pt-4 pb-3 text-uppercase text-center fw-bold text-white bg-primary'>Available job {jobs.length}</h4>
                        <div className="job-area">
                        <input type="text" className='form-control mt-4 mb-2 py-3' placeholder='Search by company name, job type, skills, position, salary or location.' value={value} onChange={filterData} style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 5px"}} />
                            <div className="row">

                            {
                                value && value.length > 0 ? tableFilter.map(jobs => <JobCard key={jobs._id} jobs={jobs}></JobCard>) : jobs.map(jobs => <JobCard key={jobs._id} jobs={jobs}></JobCard>)
                            }
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Job;