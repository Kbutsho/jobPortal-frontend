import React from 'react';
//import Banner from '../../components/Home/Banner';
import Job from '../../components/Home/Job.component';
import Navbar from '../../layouts/Navbar/Navbar';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            {/* <Banner /> */}
            <Job></Job>
        </div>
    );
};

export default Home;