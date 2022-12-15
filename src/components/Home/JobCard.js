import React from 'react';
import './JobCard.css'
import brand from '../../assets/logo.png';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { MdReportGmailerrorred } from 'react-icons/md';

const JobCard = (props) => {
    const { name, companyName, salary, vacancy, deadline } = props.jobs
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
                        <h6><span className='fw-bold'>Salary</span> {salary}</h6>
                        <h6><span className='fw-bold'>Vacancy</span> {vacancy}</h6>
                        <div className='d-flex justify-content-between mt-3'>
                            <span className='btn btn-sm btn-outline-success fw-bold pt-1'>Details <MdReportGmailerrorred size="20" className='mb-1'/></span>
                            <span className='btn btn-sm btn-outline-primary fw-bold pt-1'>Apply <FaExternalLinkAlt className='mb-1' /></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobCard;