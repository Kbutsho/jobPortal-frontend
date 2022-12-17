import React from 'react';
import JobDetailsComponent from '../../components/Job/JobDetailsComponent';
import Navbar from '../../layouts/Navbar/Navbar';

const JobDetails = () => {
    return (
        <div>
            <Navbar></Navbar>
            <JobDetailsComponent></JobDetailsComponent>
        </div>
    );
};

export default JobDetails;