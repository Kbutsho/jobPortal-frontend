import React from 'react';
import './JobCard.css'
import brand from '../../assets/logo.png';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { MdReportGmailerrorred } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const JobCard = (props) => {
    const { name, companyName, salary, deadline, _id,jobType } = props.jobs

    const history = useNavigate();
    const apply = (id) => {
        const candidate = localStorage.getItem('role');
        if(candidate === 'candidate'){
            const url = `/job/${id}/apply`;
        history(url);
        }else{
            swal("warning", "Login as candidate!", "error")
            history('/login');
        }
    } 
    const details = (id) => {
        const url = `/job/${id}/details`;
        history(url);
    } 
    return (
        <div className='col-md-6 col-lg-6 card-area'>
            <div className="box p-4">
                <div className="row">
                    <div className="col-4">
                        <div className="img-area d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
                            <img src={brand} style={{ width: "80%" }} alt="img" />
                        </div>
                    </div>
                    <div className="col-8">
                        <h3 className='fw-bold'>{companyName}</h3>
                        <h6 className='fw-bold'>{name}</h6>
                        <h6><span className='fw-bold'>Deadline</span> {deadline.toString().split(':')[0].split('T')[0].split("-").reverse().join('/')}</h6>
                        <h6><span className='fw-bold'>Job Type </span>{jobType}</h6>
                        <h6><span className='fw-bold'>Salary</span> {salary}</h6>
                        {/* <h6><span className='fw-bold'>Vacancy</span> {vacancy}</h6> */}
                        <div className='d-flex justify-content-between mt-3'>
                            <span onClick={() => details(_id)}  className='btn btn-sm btn-info text-white fw-bold pt-2 px-3'>Details <MdReportGmailerrorred size="20" className='mb-1'/></span>
                            <span onClick={() => apply(_id)} className='btn btn-sm btn-primary fw-bold pt-2 px-3'>Apply <FaExternalLinkAlt className='mb-1' /></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobCard;