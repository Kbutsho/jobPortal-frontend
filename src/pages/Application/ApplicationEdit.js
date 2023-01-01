import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiFillAppstore } from 'react-icons/ai';
import { ImProfile } from 'react-icons/im';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import swal from 'sweetalert';
import Navbar from '../../layouts/Navbar/Navbar';

const ApplicationEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})
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
    const [input, setInput] = useState({
        "name" : '',
        "email": '',
        coverLetter: '',
        errors: []
    })
    const handelChange = (e)=>{
        setInput({...input, [e.target.name]: e.target.value})
    }
    const formSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(!loading)
            const formData = {
                "name" : input.name || data?.name,
                "email": input.email || data?.email,
                "coverLetter": input.coverLetter || data?.coverLetter
            }
            await axios.patch(`https://jobportal-api.onrender.com/api/candidate/application/${id}`,
            formData)
            .then(res=>{
                setLoading(false);
                swal("success", res.data.message, "success")
                navigate('/dashboard/candidate/application')
            })
        } catch (error) {
            setLoading(false);
                swal("success", error, "success")
        }
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className="container">
                {
                    data ? <div>
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
                        <div className="row d-flex justify-content-center">
                            <div style={{ background: "#F5F7FC", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} className="p-4 mt-5 mb-3 col-md-6">
                                <h4 className='fw-bold text-center mb-3 bg-primary py-2 text-white' style={{ borderRadius: "5px" }}>Update Application ID #{data?._id?.slice(-6)}</h4>
                                <form onSubmit={formSubmit} encType="multipart/form-data">
                                    <div className='d-flex'>
                                        <div className='col-6'>
                                            <label className='mb-2 fw-bold'>Your Name</label>
                                            <input name="name" onChange={handelChange} defaultValue={data?.name} type="text" placeholder='Name' className='w-100 form-control' />
                                        </div>

                                        <div className='col-6 ps-2'>
                                            <label className='mb-2 fw-bold'>Your Email</label>
                                            <input name="email" onChange={handelChange} defaultValue={data?.email} type="text" placeholder='Email' className='w-100 form-control' />
                                        </div>
                                    </div>

                                    <label className='my-2 fw-bold'>Cover Letter</label>
                                    <textarea name="coverLetter" onChange={handelChange} defaultValue={data?.coverLetter} rows="5" cols="20" type="text" placeholder='Cover Letter' className='form-control' />
                                    <div className='d-flex justify-content-between'>
                                    <small className='fw-bold text-danger mt-3'>{loading?  <p>updating. please wait <span > <PulseLoader  color="red" size="3px" /><PulseLoader  color="red" size="3px" /></span></p> : null}</small>
                                        <button type='submit' className='px-4 btn btn-sm btn-primary mt-3'>Submit</button>
                                    </div>
                                </form>
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

export default ApplicationEdit;