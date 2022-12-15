import React from 'react';
import Navbar from '../../layouts/Navbar/Navbar';

const AdminDashboard = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "86vh" }}>
<h4 className='fw-bold text-danger text-uppercase'>Admin Dashboard</h4>
            </div>
        </div>
    );
};

export default AdminDashboard;