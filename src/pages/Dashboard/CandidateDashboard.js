/* eslint-disable jsx-a11y/iframe-has-title */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CandidateDashboard = () => {
    const [file, setFile] = useState()
    useEffect(() => {
        axios.get('http://localhost:8000/api/jobs/application')
            .then(res => {
                setFile(res.data.data)
            })
    })
    return (
        <div>
            {
                file?.map(resume =>
                    <div key={resume._id}>
                       
                        <div>
                        <iframe src={resume.resume} frameborder="0" style={{ width: "100%", height: "100vh" }}/>
                        </div>
                    </div>
                )

            }
        </div>
    );
};

export default CandidateDashboard;