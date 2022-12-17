import React from 'react';
import JobApply from '../../components/Job/JobApply.component';
import Navbar from '../../layouts/Navbar/Navbar';
import './Apply.css'

const Apply = () => {
    return (
        <div className='apply'>
            <Navbar></Navbar>
            <JobApply></JobApply>
        </div>
    );
};

export default Apply;