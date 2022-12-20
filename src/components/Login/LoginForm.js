import React, { useState } from 'react';
import { LoginService } from '../../services/Auth.service';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import { BiHide, BiShow } from "react-icons/bi";
import './LoginForm.css';
import PulseLoader from "react-spinners/PulseLoader";
import { HiUserGroup } from 'react-icons/hi';

const LoginForm = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        email: '',
        password: '',
        errors: []
    });
    const [loading, setLoading] = useState(false);
    const handelChange = (event) => {
        event.preventDefault();
        event.persist();
        setLogin({ ...login, [event.target.name]: event.target.value });
    };
    const loginSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = {
                email: login.email,
                password: login.password
            };
            setLoading(!loading);
            const response = await LoginService(data);
            if (response.data.error) {
                setLoading(false);
                setLogin({ ...login, errors: response.data.error });
                swal("warning", response.data.message, "error")
            } else {
                setLoading(false);
                setLogin({
                    errors: ''
                })
                swal("success", response.data.message, "success");
                localStorage.setItem('token', response.data.data.token)
                localStorage.setItem('email', response.data.data.user.email)
                localStorage.setItem('id', response.data.data.user.id)
                localStorage.setItem('userId', response.data.data.user.userId)
                localStorage.setItem('role', response.data.data.user.role)
                navigate('/home');
            }
        } catch (error) {
            swal("warning", error.message, "error");
        }
    }
    const [showPassword, setShowPassword] = useState(false)
    const showPasswordBtn = () => {
        setShowPassword(!showPassword);
    }
    return (
            <div className='form' style={loading ? { background: "#F5F7FC" } : { background: "rgba(0, 0, 0, 0.1)" }}>
            <p className='text-center '><HiUserGroup size="60px" className='text-primary p-3' style={{boxShadow: "inset rgba(0, 0, 0, 0.35) 0px 3px 5px", background: "white", borderRadius: "100%"}}/></p>
            <h4 className='fw-bold text-dark mb-3 text-center'>LOGIN</h4>
            <form onSubmit={loginSubmit}>
                <div className='my-3'>
                    <label className='fw-bold mb-2'>Email</label>
                    <input style={{ fontSize: "14px",boxShadow: "inset rgba(0, 0, 0, 0.35) 0px 3px 5px"  }} className="w-100 form-control" type="email" name="email" onChange={handelChange} value={login.email} placeholder="write email" />
                    <div className='mt-2' style={{
                        color: "red", fontSize: "12px", fontWeight: "bold"
                    }}>{login.errors.email ? <span className='mt-3'>{login.errors.email}</span> : null}</div>
                </div>
                <div className='my-3'>
                    <label className='fw-bold mb-2'>Password</label>
                    <div className="d-flex align-items-center">
                        <input style={{ fontSize: "14px",boxShadow: "inset rgba(0, 0, 0, 0.35) 0px 3px 5px" }} className='w-100 form-control' type={showPassword ? "text" : "password"} name="password" onChange={handelChange} value={login.password} placeholder="write password" />
                        {
                            showPassword ?
                                <BiHide onClick={() => showPasswordBtn()} style={{ marginLeft: "-40px", cursor: "pointer" }} size="25" /> :
                                <BiShow onClick={() => showPasswordBtn()} style={{ marginLeft: "-40px", cursor: "pointer" }} size="25" />
                        }
                    </div>
                    <div className='mt-2' style={{
                        color: "red", fontSize: "12px", fontWeight: "bold"
                    }}>{login.errors.password ? <span>{login.errors.password}</span> : null}</div>
                </div>
                <div className='mt-3'>
                    <button className={loading ? 'disabled btn btn-primary btn-sm w-100 fw-bold' : 'btn btn-primary btn-sm w-100 fw-bold'} type="submit">Login</button>

                    {loading ?
                        <span style={{ marginTop: "-10px", margin: "-20px 10px 27px 0" }} className='d-flex justify-content-end'><PulseLoader size="5px" color="white" /></span>
                        : null
                    }
                </div>
            </form>
            <div className='d-flex mt-3 justify-content-between'>
                <small style={{ fontSize: "12px" }} className='fw-bold'>New user? <Link to="/registration">REGISTER HERE!</Link></small>
                <small style={{ fontSize: "12px" }} className='fw-bold'><Link to="/home">HOME</Link></small>
            </div>
        </div>
    );
};

export default LoginForm;