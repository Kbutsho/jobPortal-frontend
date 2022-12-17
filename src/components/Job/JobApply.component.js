import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';

const JobApply = () => {
  const { id } = useParams();
  const [uploading, setUploading] = useState(false)
  const [imageURL, setImageURL] = useState()
  const imageUpload = (e) => {
    setUploading(!uploading)
    const imgFile = e.target.files[0];
    let imageData = new FormData();
    imageData.set("key", "0bdc42b3cf235e6981d19573c2c5875f");
    imageData.append("image", imgFile);
    axios.post("https://api.imgbb.com/1/upload", imageData)
      .then((res) => {
        setUploading(false)
        setImageURL(res.data.data.display_url)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const applyJob = (event) => {
    event.preventDefault();
    axios.post(`https://jobportal-api.onrender.com/api/${id}/apply`
    ).then(res => {
      console.log(res.data)
    })
  }
  return (
    <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "85vh" }}>
      <div style={{ width: "300px", background: "rgba(0, 0, 0, 0.1)",  boxShadow:  "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} className="p-4 my-5">
        <h4 className='my-4 fw-bold text-center'>Apply Here</h4>
        {uploading ? "uploading" : null}
        {imageURL ? "pdf upload successfully" : null}
        <form onSubmit={applyJob}>
          <label>Your Name</label>
          <input style={{ fontSize: "14px",boxShadow: "inset rgba(0, 0, 0, 0.35) 0px 3px 5px"  }}  type="text" name="name" placeholder='Name' className='form-control my-3' />
          <label>Your Address</label>
          <input style={{ fontSize: "14px",boxShadow: "inset rgba(0, 0, 0, 0.35) 0px 3px 5px"  }}  type="text" name="address" placeholder='Address' className='form-control my-3' />
          <label>Your Resume</label>
          <input style={{ fontSize: "14px",boxShadow: "inset rgba(0, 0, 0, 0.35) 0px 3px 5px"  }}  type="file" onChange={imageUpload} placeholder="Resume" className='form-control my-3' />
          {imageURL ? <button type='submit' className='btn btn-primary w-100'>submit</button> : <button disabled className='btn btn-primary w-100' type='submit'>submit</button>}
        </form>
      </div>
    </div>
  );
};

export default JobApply;