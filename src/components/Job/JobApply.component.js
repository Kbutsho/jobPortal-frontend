import React from 'react';
import { useParams } from 'react-router-dom';

const JobApply = () => {
    const { id } = useParams();
    console.log(id)
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "86vh" }}>
          <h1 className='text-danger'>  {id}</h1>
        </div>
    );
};

export default JobApply;