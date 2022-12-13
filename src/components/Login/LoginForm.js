import React, { useState } from 'react';
import { LoginService } from '../../services/Login.service';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import { BiHide, BiShow } from "react-icons/bi";
import './LoginForm.css';
import PulseLoader from "react-spinners/PulseLoader";

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
                navigate('/dashboard');
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
        <div className='form' >
            <h3 className='fw-bold text-dark mb-3 text-center'>LOGIN</h3>
            <form onSubmit={loginSubmit}>
                <div className='my-3'>
                <label className='fw-bold mb-2'>Email</label>
                    <input  className=" w-100" type="email" name="email" onChange={handelChange} value={login.email} placeholder="write email" />
                    <div className='mt-2' style={{
                        color: "red", fontSize: "12px", fontWeight: "bold"
                    }}>{login.errors.email ? <span className='mt-3'>{login.errors.email}</span>: null}</div>
                </div>

                <div className='my-3'>
                <label className='fw-bold mb-2'>Password</label>
                   <div className="d-flex align-items-center">
                   <input className='w-100' type={showPassword ? "text" : "password"} name="password" onChange={handelChange} value={login.password} placeholder="write password" />
                    {
                        showPassword ? 
                        <BiHide onClick={()=>showPasswordBtn()} style={{marginLeft: "-40px", cursor: "pointer" }} size="25" /> :
                        <BiShow onClick={()=>showPasswordBtn()} style={{marginLeft: "-40px", cursor: "pointer"}} size="25" />
                    }
                   </div>
                   <div className='mt-2' style={{
                        color: "red", fontSize: "12px", fontWeight: "bold"
                    }}>{login.errors.password ? <span>{login.errors.password}</span>: null}</div>
                </div>
                <div className='mt-3'>
                    <button className='btn btn-primary btn-sm w-100 d-flex justify-content-center align-items-center' type="submit"><span className='fw-bold'>Login</span> 
                    {loading? <><PulseLoader className='mt-1 ms-1' size="5" color={"white"} />
                    <PulseLoader size="5" className='mt-1' color={"white"} />
                    </>: null}
                    </button>
                </div>
            </form>
           <div className='d-flex  mt-3 justify-content-between'>
           <small className='fw-bold'>New user? <Link to="/registration">REGISTER HERE!</Link></small>
           <small className='fw-bold'><Link to="/home">HOME</Link></small>
           </div>
        </div>
    );
};

export default LoginForm;