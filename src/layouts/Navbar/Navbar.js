import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="bg-primary py-2">
            <nav className="container navbar navbar-expand-lg bg-dark px-2 " style={{ borderRadius: "50px" }}>
            <div className="container-fluid">
                <Link className="navbar-brand text-white fw-bold" to="/">Job Portal</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto ">
                        <Link className="nav-link text-white fw-bold" to="/home">Home</Link>
                        <Link className="nav-link text-white fw-bold" to="/contact">Contact</Link>
                        <Link className="nav-link text-white fw-bold" to="/about">About</Link>
                        <Link className="nav-link text-white fw-bold" to="/dashboard">Dashboard</Link>
                        <Link className="nav-link text-white fw-bold" to="/login">Login</Link>
                        <Link className="nav-link text-white fw-bold" to="/registration">Registration</Link>
                    </div>
                </div>
            </div>
        </nav>
        </div>
    );
};

export default Navbar;