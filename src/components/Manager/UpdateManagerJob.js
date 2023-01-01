import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiFillAppstore } from 'react-icons/ai';
import { ImProfile } from 'react-icons/im';
import { MdOutlineWork } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../../layouts/Navbar/Navbar';

const UpdateManagerJob = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [data, setData] = useState({})
    useEffect(() => {
        axios.get(`/jobs/${id}`)
            .then(res => {
                if (res.data.error) {
                    swal(res.data.error, res.data.message, "error")
                    navigate('/dashboard/manager/job')
                }
                else if (res.data.data) {
                    setData(res.data.data)
                }
            })
            .catch((err) => {
                swal("warning", err.message, "error")
                navigate('/dashboard/manager/job')
            })
    })




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
            formData.append('name', value.name  || data?.name)
            formData.append('jobType', value.jobType || data?.jobType)
            formData.append('salary', value.salary || data?.salary)
            formData.append('location', value.location || data?.location)
            formData.append('vacancy', value.vacancy || data?.vacancy)
            formData.append('deadline', value.deadline || data?.deadline)
            formData.append('Skills', value.Skills || data?.Skills)
            formData.append('companyName', value.companyName || data?.companyName)
            formData.append('companyDetails', value.companyDetails || data?.companyDetails)
            formData.append('jobDescription', value.jobDescription || data?.jobDescription)
            formData.append('jobResponsibilities', value.jobResponsibilities || data?.jobResponsibilities)
            formData.append('additionalRequirements', value.additionalRequirements || data?.additionalRequirements)
            formData.append('benefits', value.benefits || data?.benefits)

            await axios.patch(`/jobs/${id}`, formData, {
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
                        swal("success", value.message, "success")
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
                localStorage.getItem('role') === "hiringManager" ?

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
                                <div className='a-box d-flex justify-content-center align-items-center'>
                                    <h4 className='fw-bold'><AiFillAppstore className='mb-2' /> All Application</h4>
                                </div>
                            </Link>
                        </div>

                    </div>
                    <form onSubmit={submit} className='py-3 px-5' style={loading ? { background: "#F5F7FC" } : { background: "rgba(0, 0, 0, 0.1)" }}>
                        <h6 className='btn btn-primary w-100'>Post new Job</h6>
                        <div className="row">
                            <div className="col-md-6">
                                <input type="text" placeholder='Position Name' defaultValue={data?.name} name='name' className='form-control my-3' onChange={inputChange} />
                                <span className='' style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{value.errors.name ? <span className='mt-1'>{value.errors.name}</span> : null}</span>

                                <select className='form-select my-3' name="jobType" onChange={inputChange}>
                                    <option>Select Job Type</option>
                                    <option value="full-time">Full Time</option>
                                    <option value="part-time">Part Time</option>
                                    <option value="internship">Internship</option>
                                </select>
                                <span className='' style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{value.errors.jobType ? <span className='mt-1'>{value.errors.jobType}</span> : null}</span>
                                <input type="number" placeholder='Salary'  defaultValue={data?.salary} name='salary' className='form-control my-3' onChange={inputChange} />
                                <span className='' style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{value.errors.salary ? <span className='mt-1'>{value.errors.salary}</span> : null}</span>
                                <input type="text" placeholder='Location' defaultValue={data?.location} name='location' className='form-control my-3' onChange={inputChange} />
                                <span className='' style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{value.errors.location ? <span className='mt-1'>{value.errors.location}</span> : null}</span>
                                <input type="text" placeholder='Vacancy' defaultValue={data?.vacancy} name='vacancy' className='form-control my-3' onChange={inputChange} />
                                <span className='' style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{value.errors.vacancy ? <span className='mt-1'>{value.errors.vacancy}</span> : null}</span>
                                <input type="date" placeholder='Deadline' defaultValue={data?.deadline} name='deadline' className='form-control my-3' onChange={inputChange} />
                                <span className='' style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{value.errors.deadline ? <span className='mt-1'>{value.errors.deadline}</span> : null}</span>
                                <input type="text" placeholder='Skills' defaultValue={data?.Skills} name='Skills' className='form-control my-3' onChange={inputChange} />
                                <span className='' style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{value.errors.Skills ? <span className='mt-1'>{value.errors.Skills}</span> : null}</span>
                            </div>
                            <div className="col-md-6">
                                <input type="text" placeholder='Company Name' defaultValue={data?.companyName} name='companyName' className='form-control my-3' onChange={inputChange} />
                                <span className='' style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{value.errors.companyName ? <span className='mt-1'>{value.errors.companyName}</span> : null}</span>
                                <input type="text" placeholder='Company Details' defaultValue={data?.companyDetails} name='companyDetails' className='form-control my-3' onChange={inputChange} />
                                <span className='' style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{value.errors.companyDetails ? <span className='mt-1'>{value.errors.companyDetails}</span> : null}</span>
                                <input type="text" placeholder='Job Description' defaultValue={data?.jobDescription} name='jobDescription' className='form-control my-3' onChange={inputChange} />
                                <span className='' style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{value.errors.jobDescription ? <span className='mt-1'>{value.errors.jobDescription}</span> : null}</span>
                                <input type="text" placeholder='job Responsibilities' defaultValue={data?.jobResponsibilities} name='jobResponsibilities' className='form-control my-3' onChange={inputChange} />
                                <span className='' style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{value.errors.jobResponsibilities ? <span className='mt-1'>{value.errors.jobResponsibilities}</span> : null}</span>
                                <input type="text" placeholder='Additional Requirements' defaultValue={data?.additionalRequirements} name='additionalRequirements' className='form-control my-3' onChange={inputChange} />
                                <span className='' style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{value.errors.additionalRequirements ? <span className='mt-1'>{value.errors.additionalRequirements}</span> : null}</span>
                                <input type="text" placeholder='Benefits' defaultValue={data?.benefits} name='benefits' className='form-control my-3' onChange={inputChange} />
                                <span className='' style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{value.errors.benefits ? <span className='mt-1'>{value.errors.benefits}</span> : null}</span>
                                <input type="submit" value="submit" className='btn btn-primary w-100' />
                            </div>
                        </div>
                    </form> 
            
                </div>
                    :
                    <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "550px" }}>
                        <h3 className='fw-bold text-danger'>Login as Hiring Manager!</h3>
                    </div>
            }
        </div>
    );
};

export default UpdateManagerJob;