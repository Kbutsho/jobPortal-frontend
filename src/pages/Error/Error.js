import React from 'react';
import Navbar from '../../layouts/Navbar/Navbar';

const Error = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='d-flex justify-content-center align-items-center' style={{ height: "86vh" }}>
                <h4 className='fw-bold text-uppercase text-danger'>Login first</h4>
            </div>
        </div>
    );
};

export default Error;