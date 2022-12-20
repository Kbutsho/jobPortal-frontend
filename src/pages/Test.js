import axios from 'axios';
import React, { useState } from 'react';

const Test = () => {
    const [profileImg, setProfileImg] = useState();

    const onFileChange = (e)=>{
        setProfileImg(e.target.files[0])
    }
    const onSubmit = (e)=> {
        e.preventDefault()
        const formData = new FormData()
        formData.append('resume', profileImg)
        console.log(formData.values());
        axios.post("http://localhost:8000/api/jobs/upload", formData, {
        }).then(res => {
            console.log(res)
        })
    }
    return (
        <div className="container">
                <div className="row">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input type="file" onChange={onFileChange} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
    );
};

export default Test;