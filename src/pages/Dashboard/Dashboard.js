import React from 'react';
import Error from '../Error/Error';
import AdminDashboard from './AdminDashboard';
import CandidateDashboard from './CandidateDashboard';
import ManagerDashboard from './ManagerDashboard';

const Dashboard = () => {
    let Dashboard = '';
    if (localStorage.getItem('role') === 'admin') {
        Dashboard = (
            <AdminDashboard></AdminDashboard>
        )
    }
    else if (localStorage.getItem('role') === 'candidate') {
        Dashboard = (
            <CandidateDashboard></CandidateDashboard>
        )
    }
    else if (localStorage.getItem('role') === 'hiringManager') {
        Dashboard = (
            <ManagerDashboard></ManagerDashboard>
        )
    }else{
        Dashboard = (
            <Error></Error>
        )
    }
    return (
        <div>
            {Dashboard}
        </div>
    );
};

export default Dashboard;