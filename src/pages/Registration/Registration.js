import axios from 'axios';
import React, { useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import { HiUserGroup } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { RotateLoader } from 'react-spinners';
import swal from 'sweetalert';
import './Registration.css';

const Registration = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        role: '',
        errors: []
    })

    const [showPassword, setShowPassword] = useState(false)
    const showPasswordBtn = () => {
        setShowPassword(!showPassword);
    }
    const [showCPassword, setShowCPassword] = useState(false)
    const showCPasswordBtn = () => {
        setShowCPassword(!showCPassword);
    }

    const handelChange = (e) => {
        e.preventDefault()
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const submit = async (e) => {
        e.preventDefault()
        try {
            setLoading(!loading)
            let formData = new FormData();
            formData.append('name', data.name)
            formData.append('email', data.email)
            formData.append('password', data.password)
            formData.append('confirmPassword', data.confirmPassword)
            formData.append('role', data.role)
            formData.append('phone', data.phone)
            await axios.post('/user/signup', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    console.log(res)
                    // setLoading(false)
                    // console.log(res.data.error)
                    if (res.data.error) {
                        setLoading(false)
                        setData({ ...data, errors: res.data.error });
                        swal("warning", res.data.message, "error")
                    } else if (res.data.message) {
                        setLoading(false)
                        setData({
                            errors: ''
                        })
                        swal(res.data.message, "Login Here!", "success")
                        navigate('/login')
                    }
                })
        } catch (error) {
            swal("warning", error.message, "warning")
        }
    }
    return (
        <div>
            <div className='main d-flex justify-content-center align-items-center ' style={{ minHeight: "100vh" }}>
                <div className="signUp-form" style={loading ? { background: "#F5F7FC" } : { background: "rgba(0, 0, 0, 0.1)" }}>
                    <p className='text-center '><HiUserGroup size="60px" className='text-primary p-3' style={{ boxShadow: "inset rgba(0, 0, 0, 0.35) 0px 3px 5px", background: "white", borderRadius: "100%" }} /></p>
                    <h4 className='fw-bold text-dark mb-3 text-center'>REGISTRATION</h4>
                    <form onSubmit={submit}>
                        <div className="row">
                            <div className="col-md-6">
                                <input type="text" value={data.name} onChange={handelChange} placeholder='Your name' name="name" className='form-control mt-2 mb-1' />
                                <div style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{data.errors.name ? <span>{data.errors.name}</span> : null}</div>
                                <input type="text" value={data.phone} onChange={handelChange} placeholder='Your phone' name="phone" className='form-control mt-2 mb-1' />
                                <div style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{data.errors.phone ? <span>{data.errors.phone}</span> : null}</div>
                                 <select name="role" onChange={handelChange} className='form-select mt-2 mb-1'>
                                    <option >Select Role</option>
                                    <option value="candidate">Candidate</option>
                                    <option value="hiringManager">Hiring Manager</option>
                                </select>
                                <div style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{data.errors.role ? <span>{data.errors.role}</span> : null}</div>
                                

                            </div>
                            <div className="col-md-6">

                                <input type="text" value={data.email} onChange={handelChange} placeholder='Your email' name="email" className='form-control mt-2 mb-1' />
                                <div style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{data.errors.email ? <span>{data.errors.email}</span> : null}</div>
                               <div className="d-flex align-items-center">
                                    <input value={data.password} onChange={handelChange} className='mt-2 mb-1 form-control' type={showPassword ? "text" : "password"} name="password" placeholder="Password" />
                                    {
                                        showPassword ?
                                            <BiHide onClick={() => showPasswordBtn()} style={{ marginLeft: "-40px", marginBottom: "-5px", cursor: "pointer" }} size="25" /> :
                                            <BiShow onClick={() => showPasswordBtn()} style={{ marginLeft: "-40px", marginBottom: "-5px", cursor: "pointer" }} size="25" />
                                    }
                                </div>
                                <div style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{data.errors.password ? <span>{data.errors.password}</span> : null}</div>
                                <div className="d-flex align-items-center">
                                    <input value={data.confirmPassword} onChange={handelChange} className='mt-2 mb-1 form-control' type={showCPassword ? "text" : "password"} name="confirmPassword" placeholder="confirm password" />
                                    {
                                        showCPassword ?
                                            <BiHide onClick={() => showCPasswordBtn()} style={{ marginLeft: "-40px", marginBottom: "-5px", cursor: "pointer" }} size="25" /> :
                                            <BiShow onClick={() => showCPasswordBtn()} style={{ marginLeft: "-40px", marginBottom: "-5px", cursor: "pointer" }} size="25" />
                                    }
                                </div>
                                <div style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{data.errors.confirmPassword ? <span>{data.errors.confirmPassword}</span> : null}</div>
                                <input type="submit" className='btn btn-primary w-100 btn-sm' style={{ marginTop: "20px" }} />
                                <div className='d-flex justify-content-end' style={{ marginTop: "20px" }}>
                                    <small style={{ fontSize: "12px" }} className='fw-bold'>Have an account? <Link to="/login">LOGIN HERE</Link></small>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {
                loading ? <div className='loading d-flex justify-content-center align-items-center' style={{ minHeight: "100vh" }}>
                    <RotateLoader color='yellow' className='mt-5' />

                </div> : null
            }
        </div>
    );
};

export default Registration;