import React from 'react';
import LoginForm from '../../components/Login/LoginForm';
import './Login.css';

const Login = () => {
    return (
        <div  className='login d-flex justify-content-center align-items-center'>
            <LoginForm></LoginForm>
        </div>
    );
};

export default Login;