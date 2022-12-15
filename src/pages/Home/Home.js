import React from 'react';
import Job from '../../components/Home/Job.component';
import Navbar from '../../layouts/Navbar/Navbar';

const Home = () => {
    return (
        <div>
        <Navbar></Navbar>
            <Job></Job>
        </div>
    );
};

export default Home;