import React, { useState } from 'react';
//import swal from 'sweetalert';
//import { GetAllJob } from '../../services/Job.service';
import PulseLoader from "react-spinners/PulseLoader";
import JobCard from './JobCard';
import Pagination from './Pagination';
//import { RotateLoader } from 'react-spinners';
//import axios from 'axios';
import Data from '../../data/data';

const Job = () => {
    // const [jobs, setJobs] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(4);
    //const [loading, setLoading] = useState(false)
    const [jobs] = useState(Data)
    // useEffect(()=>{
    //     const getAllJob = async () => {
    //         setLoading(!loading)
    //         try {
    //             //const response = await GetAllJob();
    //             await axios.get(`https://jobportal-api.onrender.com/api/jobs?sort=-createdAt`)
    //             .then(response=>{
    //                if(response.data.data){
    //                 setLoading(false)
    //                 setJobs((response.data.data))
    //                }else if(response.data.error){
    //                 setLoading(false)
    //                 swal("warning", response.data.error, "error")
    //                }
    //             })
    //         } catch (error) {
    //             setLoading(false)
    //             swal("Database connection failed!", error.message, "error")
    //         }
    //     }
    //     getAllJob()
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[])
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

    console.log(tableFilter.length)
    //get current posts
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPost = jobs.slice(indexOfFirstPost, indexOfLastPost)

    const filterCurrentPost = tableFilter.slice(indexOfFirstPost, indexOfLastPost)


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    return (
        <div style={{ minHeight: "600px" }}>
            {
                jobs.length === 0 ? <div className='d-flex justify-content-center align-items-center' style={{ height: "86vh" }}>
                    <h4 className='fw-bold text-danger d-flex'>Loading data. please wait<PulseLoader style={{ margin: "3px 0 0 3px" }} color="red" size="8px" /></h4>
                </div>
                    :

                    <div className="container mt-4">
                        <div className="job-area">
                            <input type="text" className='form-control fw-bold search-job mt-4 mb-4 py-3' placeholder='Search here by company name, job type, job title, keywords, skills, position, salary or location.' value={value} onChange={filterData} style={{ border: "10px solid lightGray", fontSize: "20px" }} />
                            {
                                value && value.length > 0 ?
                                    <h4 className='fw-bold p-3 text-center text-primary' style={{
                                        borderRadius: "5px", backgroundColor: "#F5F7FC",
                                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 3px 5px"
                                    }}>Job Found {filterCurrentPost.length}</h4> :
                                    <h4 className='fw-bold p-3 text-center  text-primary' style={{
                                        borderRadius: "5px", backgroundColor: "#F5F7FC",
                                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 3px 5px"
                                    }}>Job Found {jobs.length}</h4>


                            }
                            <div className="row">

                                {
                                    value && value.length > 0 ? filterCurrentPost.map(jobs => <JobCard key={jobs._id} jobs={jobs}></JobCard>) 
                                    :

                                        currentPost.map(jobs => <JobCard key={jobs._id} jobs={jobs}></JobCard>)
                                }

                                {
                                    value && value.length > 0 ?
                                        <Pagination postsPerPage={postPerPage} totalPost={tableFilter.length} paginate={paginate} /> :

                                        <Pagination postsPerPage={postPerPage} totalPost={jobs.length} paginate={paginate} />
                                }

                            </div>
                        </div>
                    </div>


            }
        </div>
    );
};

export default Job;