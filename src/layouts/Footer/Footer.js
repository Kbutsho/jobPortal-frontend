import React from 'react';

const Footer = () => {
    return (
        <div className='d-flex justify-content-center align-items-center bg-dark text-white' style={{ padding: "20px 0 0 30px" }}>
            <p>copyright © {new Date().getFullYear()} || all rights reserved by <a style={{ textDecoration: "none" }} href="https://kbutsho.netlify.app/" target="_blank" rel="noreferrer">kbutsho.com</a></p>
        </div>
    );
};

export default Footer;