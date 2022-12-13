import React from 'react';
import LoginForm from '../../components/Login/LoginForm';

const Login = () => {
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ background: "white", height: "100vh" }}>
            <LoginForm></LoginForm>
        </div>
    );
};

export default Login;