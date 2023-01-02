import axios from 'axios';
import React, { useState } from 'react';
import { AiFillAppstore } from 'react-icons/ai';
import { ImProfile } from 'react-icons/im';
import { MdOutlineWork } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { RotateLoader } from 'react-spinners';
import swal from 'sweetalert';
import Navbar from '../../layouts/Navbar/Navbar';

const PostJob = () => {
    const navigate = useNavigate()
    const [value, setValue] = useState({
        name: '',
        jobType: '',
        salary: '',
        location: '',
        vacancy: '',
        deadline: '',
        Skills: '',
        companyName: '',
        companyDetails: '',
        jobDescription: '',
        jobResponsibilities: '',
        additionalRequirements: '',
        benefits: '',
        errors: [],
        message: ''
    })
    const [loading, setLoading] = useState(false)
    const inputChange = (e) => {
        e.preventDefault()
        setValue({ ...value, [e.target.name]: e.target.value })
    }
    const submit = async (e) => {
        e.preventDefault()
        try {
            setLoading(!loading)
            let formData = new FormData()
            formData.append('name', value.name)
            formData.append('jobType', value.jobType)
            formData.append('salary', value.salary)
            formData.append('location', value.location)
            formData.append('vacancy', value.vacancy)
            formData.append('deadline', value.deadline)
            formData.append('Skills', value.Skills)
            formData.append('companyName', value.companyName)
            formData.append('companyDetails', value.companyDetails)
            formData.append('jobDescription', value.jobDescription)
            formData.append('jobResponsibilities', value.jobResponsibilities)
            formData.append('additionalRequirements', value.additionalRequirements)
            formData.append('benefits', value.benefits)
            formData.append('hiringManager', localStorage.getItem('id'))

            await axios.post('/jobs', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    console.log(res)
                    if (res.data.error) {
                        setLoading(false);
                        swal("warning", res.data.message, "warning")
                        setValue({ ...value, errors: res.data.error, message: res.data.message })
                    } else if (res.data.data) {
                        setLoading(false);
                        setValue({
                            errors: '',
                            message: res.data.message
                        })
                        navigate('/dashboard/manager/job')
                        swal("success", res.data.message, "success")
                    }
                })
        } catch (error) {
            swal("warning", error.message, "warning")
        }
    }
    return (
        <div>
            <Navbar></Navbar>
            {
                localStorage.getItem('role') === 'hiringManager' ?
                    <div>
                        <div className='container' style={{ minHeight: "650px" }}>
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
                                        <div className='a-box d-flex justify-content-center align-items-center'>
                                            <h4 className='fw-bold'><AiFillAppstore className='mb-2' /> All Application</h4>
                                        </div>
                                    </Link>
                                </div>

                            </div>
                            <form onSubmit={submit} className='add-job py-3 px-5' style={loading ? { background: "#F5F7FC" } : { background: "rgba(0, 0, 0, 0.1)" }}>
                                <h6 className='btn btn-primary w-100'>Post new Job</h6>
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" placeholder='Position Name' value={value.name} name='name' className='form-control mt-3' onChange={inputChange} />
                                        <span className='' style={{
                                            color: "red", fontSize: "12px", fontWeight: "bold"
                                        }}>{value.errors.name ? <span className='mt-1'>{value.errors.name}</span> : null}</span>

                                        <select className='form-select mt-3 mb-1' name="jobType" onChange={inputChange}>
                                            <option>Select Job Type</option>
                                            <option value="full-time">Full Time</option>
                                            <option value="part-time">Part Time</option>
                                            <option value="internship">Internship</option>
                                        </select>
                                        <span className='' style={{
                                            color: "red", fontSize: "12px", fontWeight: "bold"
                                        }}>{value.errors.jobType ? <span className='mt-1'>{value.errors.jobType}</span> : null}</span>
                                        <input type="number" placeholder='Salary' value={value.salary} name='salary' className='form-control mt-3 mb-1' onChange={inputChange} />
                                        <span className='' style={{
                                            color: "red", fontSize: "12px", fontWeight: "bold"
                                        }}>{value.errors.salary ? <span className='mt-1'>{value.errors.salary}</span> : null}</span>
                                        <input type="text" placeholder='Location' value={value.location} name='location' className='form-control mt-3 mb-1' onChange={inputChange} />
                                        <span className='' style={{
                                            color: "red", fontSize: "12px", fontWeight: "bold"
                                        }}>{value.errors.location ? <span className='mt-1'>{value.errors.location}</span> : null}</span>
                                        <input type="text" placeholder='Vacancy' value={value.vacancy} name='vacancy' className='form-control mt-3 mb-1' onChange={inputChange} />
                                        <span className='' style={{
                                            color: "red", fontSize: "12px", fontWeight: "bold"
                                        }}>{value.errors.vacancy ? <span className='mt-1'>{value.errors.vacancy}</span> : null}</span>
                                        <input type="date" placeholder='Deadline' value={value.deadline} name='deadline' className='form-control mt-3 mb-1' onChange={inputChange} />
                                        <span className='' style={{
                                            color: "red", fontSize: "12px", fontWeight: "bold"
                                        }}>{value.errors.deadline ? <span className='mt-1'>{value.errors.deadline}</span> : null}</span>
                                        <input type="text" placeholder='Skills' value={value.Skills} name='Skills' className='form-control mt-3 mb-1' onChange={inputChange} />
                                        <span className='' style={{
                                            color: "red", fontSize: "12px", fontWeight: "bold"
                                        }}>{value.errors.Skills ? <span className='mt-1'>{value.errors.Skills}</span> : null}</span>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" placeholder='Company Name' value={value.companyName} name='companyName' className='form-control mt-3 mb-1' onChange={inputChange} />
                                        <span className='' style={{
                                            color: "red", fontSize: "12px", fontWeight: "bold"
                                        }}>{value.errors.companyName ? <span className='mt-1'>{value.errors.companyName}</span> : null}</span>
                                        <input type="text" placeholder='Company Details' value={value.companyDetails} name='companyDetails' className='form-control mt-3 mb-1' onChange={inputChange} />
                                        <span className='' style={{
                                            color: "red", fontSize: "12px", fontWeight: "bold"
                                        }}>{value.errors.companyDetails ? <span className='mt-1'>{value.errors.companyDetails}</span> : null}</span>
                                        <input type="text" placeholder='Job Description' value={value.jobDescription} name='jobDescription' className='form-control mt-3 mb-1' onChange={inputChange} />
                                        <span className='' style={{
                                            color: "red", fontSize: "12px", fontWeight: "bold"
                                        }}>{value.errors.jobDescription ? <span className='mt-1'>{value.errors.jobDescription}</span> : null}</span>
                                        <input type="text" placeholder='job Responsibilities' value={value.jobResponsibilities} name='jobResponsibilities' className='form-control mt-3 mb-1' onChange={inputChange} />
                                        <span className='' style={{
                                            color: "red", fontSize: "12px", fontWeight: "bold"
                                        }}>{value.errors.jobResponsibilities ? <span className='mt-1'>{value.errors.jobResponsibilities}</span> : null}</span>
                                        <input type="text" placeholder='Additional Requirements' value={value.additionalRequirements} name='additionalRequirements' className='form-control mt-3 mb-1' onChange={inputChange} />
                                        <span className='' style={{
                                            color: "red", fontSize: "12px", fontWeight: "bold"
                                        }}>{value.errors.additionalRequirements ? <span className='mt-1'>{value.errors.additionalRequirements}</span> : null}</span>
                                        <input type="text" placeholder='Benefits' value={value.benefits} name='benefits' className='form-control mt-3' onChange={inputChange} />
                                        <span className='' style={{
                                            color: "red", fontSize: "12px", fontWeight: "bold"
                                        }}>{value.errors.benefits ? <span className=''>{value.errors.benefits}</span> : null}</span>
                                        <input type="submit" value="submit" className='btn btn-primary w-100 mt-3'  />
                                    </div>
                                </div>
                            </form>

                        </div>
                        {
                            loading ? <div className='loading d-flex justify-content-center align-items-center' style={{ minHeight: "100vh" }}>
                                <RotateLoader color='yellow' className='mt-5' />
                            </div> : null
                        }
                    </div>






                    :
                    <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "550px" }}>
                        <h3 className='fw-bold text-danger'>Login as Hiring Manager!</h3>
                    </div>
            }
        </div>
    );
};

export default PostJob;



