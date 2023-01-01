/* eslint-disable jsx-a11y/iframe-has-title */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { AiFillAppstore } from 'react-icons/ai';
import { ImProfile } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import swal from 'sweetalert';

const Application = () => {
    const [application, setApplication] = useState([]);
    const navigate = useNavigate()
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        axios.get('https://jobportal-api.onrender.com/api/candidate/application')
            .then(res => {
                console.log(res)
                if (res.data.data) {
                    setApplication((res.data.data));
                } else if (res.data.error) {
                    navigate('/login')
                    swal("warning", res.data.error, "error")
                }
            })
    },[navigate])
    const details = (id) => {
        navigate(`/dashboard/candidate/application/${id}/details`)
    }
    const edit = (id) => {
        navigate(`/dashboard/candidate/application/${id}/edit`)
    }
    const toggleModal = () => {
        setModal(!modal)
    }
    const deleteApp = async (id) => {
        try {
            setLoading(!loading)
            axios.delete(`https://jobportal-api.onrender.com/api/candidate/application/${id}`)
                .then(res => {
                    setLoading(false)
                    setModal(false);
                    swal("success", res.data.message, "success")
                    window.location.reload(false);
                })
        } catch (error) {
            setLoading(false)
            swal("warning", error, "error")
        }
    }

    return (
        <div className='container' style={{ minHeight: "600px" }}>
            <div className="row">
                <div className="col-md-4">
                    <Link to="/dashboard/candidate/profile" className='text-decoration-none'>
                        <div className='a-box d-flex justify-content-center align-items-center'>
                            <h4 className='fw-bold'><ImProfile size="22px" className='mb-2' /> Profile</h4>
                        </div>
                    </Link>
                </div>
                <div className="col-md-4">
                    <Link to="/dashboard" className='text-decoration-none'>
                        <div className='a-box d-flex justify-content-center align-items-center'>
                            <h4 className='fw-bold'><ImProfile size="22px" className='mb-2' /> Dashboard</h4>
                        </div>
                    </Link>
                </div>
                <div className="col-md-4">
                    <Link to="/dashboard/candidate/application" className='text-decoration-none'>
                        <div className='a-box d-flex text-danger justify-content-center align-items-center'>
                            <h4 className='fw-bold'><AiFillAppstore className='mb-2' /> All Application</h4>
                        </div>
                    </Link>
                </div>
            </div>
            {
                application ? 
               
                application.length === 0 ? <div  className='d-flex justify-content-center align-items-center' style={{ minHeight: "500px" }}>
                    <h4 className='fw-bold text-danger'>No Application found</h4>
                </div> : 
                <div className='d-flex justify-content-center' style={{ minHeight: "600px" }}>
                        <div style={{ width: "100%" }}>
                            <h4 className='text-center mb-5 mt-3 fw-bold bg-primary pb-3 pt-4 text-white' style={{ borderRadius: "5px" }}>Your applied total application {application.length}</h4>
                            <Table responsive className='table table-bordered' style={{ border: '1px solid lightGray' }}>
                                <thead style={{ background: 'lightGray' }}>
                                    <tr className='text-center'>
                                        <th>#</th>
                                        <th>Job ID</th>
                                        <th>Company ID</th>
                                        <th>Your Name</th>
                                        <th>Application Email</th>
                                        <th>Application Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        application.map((app, index) =>
                                            <tr key={app._id} className="text-center">
                                                <td>{index + 1}</td>
                                                <td>{app.jobId.slice(-6)}</td>
                                                <td>{app.hiringManagerId.slice(-6)}</td>
                                                <td>{app?.name}</td>
                                                <td>{app.email}</td>
                                                <td>{app.createdAt.toString().split(':')[0].split('T')[0].split("-").reverse().join('/')}</td>
                                                <td className='fw-bold text-danger'>{app?.status}</td>
                                                <td>
                                                    <button onClick={() => details(app._id)} className='btn btn-sm btn-primary'>Details</button>
                                                    <button onClick={() => edit(app._id)} className='btn btn-sm btn-success m-2 px-3'>Edit</button>
                                                    <button onClick={toggleModal} className='btn btn-sm btn-danger'>Delete</button>
                                                </td>
                                                {modal ?
                                                    <Modal isOpen={modal} className="modal-md d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                                                        <ModalBody className='py-5 text-center' >
                                                            {loading ?
                                                                <p className='fw-bold  text-danger'>deleting... please wait...</p> : <p className='fw-bold text-danger'>Are you sure want to delete your application?</p>
                                                            }

                                                        </ModalBody>
                                                        <ModalFooter className='d-flex justify-content-between'>
                                                            {
                                                                loading ? null :
                                                                    <><button onClick={toggleModal} className='btn btn-sm btn-primary px-4'>Close</button>
                                                                        <button onClick={() => deleteApp(app?._id)} className='btn btn-sm btn-danger px-4'>Delete</button></>
                                                            }
                                                        </ModalFooter>
                                                    </Modal>
                                                    : null
                                                }
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
               
                 : <div className='d-flex justify-content-center align-items-center' style={{ height: "86vh" }}>
                    <h4 className='fw-bold text-uppercase text-danger d-flex'>Loading <PulseLoader style={{ margin: "3px 0 0 3px" }} color="red" size="8px" /><PulseLoader style={{ margin: "3px 0 0 0px" }} color="red" size="8px" /></h4>
                </div>     
            }

        </div>
    );
};

export default Application;