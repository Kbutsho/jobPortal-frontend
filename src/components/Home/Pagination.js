/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const Pagination = ({postsPerPage, totalPost,paginate}) => {
const pageNumbers = [];
 for(let i =1; i<= Math.ceil(totalPost/ postsPerPage); i++){
    pageNumbers.push(i)
 }
    return (
        <nav>
            <ul className='pagination'>
            <li className='mt-2 me-3 fw-bold'>Next</li>
        {
            pageNumbers.map(number => (
                <li key={number} className="page-item">
               
                <a onClick={()=> paginate(number)} href="#" className='page-link'>{number}</a>
                </li>
            ))
        }
            </ul>
        </nav>
    );
};

export default Pagination;