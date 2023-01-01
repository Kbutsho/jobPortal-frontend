import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { AiFillAppstore } from 'react-icons/ai';
import { ImProfile } from 'react-icons/im';
import { MdOutlineWork } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
//import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import swal from 'sweetalert';
import Navbar from '../../layouts/Navbar/Navbar';

const JobAllApplications = () => {
    const { id } = useParams()
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [application, setApplication] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`https://jobportal-api.onrender.com/api/manager/job/${id}/applications`)
            .then(res => {
                if (res.data.data) {
                    setApplication((res.data.data));
                } else if (res.data.error) {
                    navigate('/login')
                    swal("warning", res.data.error, "error")
                }
            })
    }, [id, navigate])
    // const Status = (appId) => {
    //     navigate(`/dashboard/manager/application/${appId}/status`)
    // }
    const details = (id) => {
        navigate(`/dashboard/manager/application/${id}/details`)
    }
    const toggleModal = () => {
        setModal(!modal)
    }
    const deleteApp = async (id) => {
        try {
            setLoading(!loading)
            axios.delete(`https://jobportal-api.onrender.com/api/manager/application/${id}`)
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
    // const [appStatus, setAppStatus] = useState({
    //     status: ''
    // })
    // const statusChange = (e) => {
    //     setAppStatus({ [e.target.name]: e.target.value })
    // }
    // console.log(appStatus.status);

    // const status = async (jobId) => {
    //     try {
    //         setLoading(!loading)
    //         const data = {
    //             'status': appStatus.status
    //         }
    //         await axios.patch(`https://jobportal-api.onrender.com/api/manager/application/${jobId}`, data)
    //             .then(res => {
    //                 console.log(res.data);
    //                 setModal(false);
    //                 //swal("success",res.data.data.status, "success");
    //                 //window.location.reload(false);
    //             })
    //     } catch (error) {
    //         setLoading(false)
    //         swal("warning", error, "error")
    //     }
    //     // navigate(`/dashboard/candidate/application/${id}/edit`)
    // }
    // const deleteApp = async (id) => {
    //     try {
    //         setLoading(!loading)
    //         axios.delete(`https://jobportal-api.onrender.com/api/candidate/application/${id}`)
    //             .then(res => {
    //                 setLoading(false)
    //                 setModal(false);
    //                 swal("success", res.data.message, "success")
    //             })
    //     } catch (error) {
    //         setLoading(false)
    //         swal("warning", error, "error")
    //     }
    // }
    return (
        <div>
            <Navbar></Navbar>
            <div className='container' style={{ minHeight: "600px" }}>
                <div className="row">
                    <div className="col-md-3">
                        <Link to="/dashboard/candidate/profile" className='text-decoration-none'>
                            <div className='a-box d-flex justify-content-center align-items-center'>
                                <h4 className='fw-bold'><ImProfile size="22px" className='mb-2' /> Profile</h4>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-3">
                        <Link to="/dashboard" className='text-decoration-none'>
                            <div className='a-box d-flex justify-content-center align-items-center'>
                                <h4 className='fw-bold'><AiFillAppstore size="22px" className='mb-2' /> Dashboard</h4>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-3">
                        <Link to="/dashboard/manager/job" className='text-decoration-none'>
                            <div className='a-box d-flex justify-content-center align-items-center'>
                                <h4 className='fw-bold'><MdOutlineWork size="22px" className='mb-2' /> All Job</h4>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-3">
                        <Link to="/dashboard/manager/application" className='text-decoration-none'>
                            <div className='a-box d-flex justify-content-center align-items-center'>
                                <h4 className='fw-bold'><AiFillAppstore className='mb-2' /> All Application</h4>
                            </div>
                        </Link>
                    </div>
                </div>
                {
                    application ?

                        application.length === 0 ? <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "500px" }}>
                            <div>
                               
                                <h4 className='fw-bold text-danger'>No Application found</h4>
                                <span className='d-flex justify-content-center'><Link to="/dashboard/manager/job" className='mt-3 px-4 btn btn-sm btn-danger'>Back</Link></span>
                            </div>
                        </div> :
                            <div className='d-flex justify-content-center' style={{ minHeight: "600px" }}>
                                <div style={{ width: "100%" }}>
                                    <Link to="/dashboard/manager/job" className='px-4 btn btn-sm btn-danger'>Back</Link>
                                    <h4 className='text-center mb-5 mt-3 fw-bold bg-primary pb-3 pt-4 text-white' style={{ borderRadius: "5px" }}>Job Id <span className='text-warning'>{id.slice(-6)}</span> total application {application.length}</h4>
                                    <Table responsive className='table table-bordered' style={{ border: '1px solid lightGray' }}>
                                        <thead style={{ background: 'lightGray' }}>
                                            <tr className='text-center'>
                                                <th>#</th>
                                                <th>Application ID</th>
                                                <th>Candidate ID</th>
                                                <th>Candidate Name</th>
                                                <th>Candidate Email</th>
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
                                                        <td>{app._id}</td>
                                                        <td>{app.candidateId.slice(-6)}</td>
                                                        <td>{app.name}</td>
                                                        <td>{app.email}</td>
                                                        <td>{app.createdAt.toString().split(':')[0].split('T')[0].split("-").reverse().join('/')}</td>
                                                        <td className='fw-bold text-danger'>{app.status}</td>
                                                        <td>
                                                            <button onClick={() => details(app._id)} className='btn btn-sm btn-primary'>Details</button>
                                                            {/* <button onClick={()=>Status(app._id)} className='btn btn-sm btn-success m-2 px-3'>Status</button>
                                                            <button onClick={toggleModal} className='btn btn-sm btn-danger'>Delete</button> */}
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
        </div>
    );
};

export default JobAllApplications;