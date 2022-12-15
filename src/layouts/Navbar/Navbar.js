import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import './Navbar.css';
import { BsMenuButtonWide } from 'react-icons/bs';
import logo from '../../assets/logo.png'

const Navbar = () => {
    const isLoggedIn = localStorage.getItem('token');
    const navigate = useNavigate();
    const logout = (event) => {
        event.preventDefault();
        localStorage.clear();
        navigate('/')
        swal("Success", "logout successful", "success");
    }
    return (
        <div className="bg-primary px-4" style={{ padding: "15px 0" }}>
            <nav className="container navbar navbar-expand-lg px-4" style={{ borderRadius: "40px", background: "rgba(0, 0, 0, 0.6)" }}>
                <div className="container-fluid">
                    <div className='d-flex'>
                        <Link className="navbar-brand text-white fw-bold d-flex align-items-center" state={{ fontSize: "14px" }} to="/"><img src={logo} alt="logo" style={{ width: "6%" }} /> <h4 className='fw-bold ms-3 mt-2'>JOB PORTAL</h4> </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span><BsMenuButtonWide style={{ color: "white" }} /></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto ">
                            <Link style={{ fontSize: "14px" }} className="nav-link text-white fw-bold text-uppercase" to="/home">Home</Link>
                            <Link style={{ fontSize: "14px" }} className="nav-link text-white fw-bold text-uppercase" to="/contact">Contact</Link>
                            <Link style={{ fontSize: "14px" }} className="nav-link text-white fw-bold text-uppercase" to="/about">About</Link>

                            {isLoggedIn ?
                                <>
                                    <Link style={{ fontSize: "14px" }} className="nav-link text-white fw-bold text-uppercase" to="/dashboard">Dashboard</Link>
                                    <span style={{ fontSize: "14px", color: "red", cursor: "pointer" }} onClick={logout} className="nav-link fw-bold text-uppercase">Logout</span>
                                </>
                                :
                                <Link style={{ fontSize: "14px" }} className="nav-link text-white fw-bold text-uppercase" to="/login">Login</Link>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;