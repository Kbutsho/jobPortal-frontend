import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';

const JobApply = () => {
  const { id } = useParams();
  //const navigate = useNavigate()
  const [info, setInfo] = useState({
    "name": '',
    address: '',
    errors: ''
  })
  const [file, setFile] = useState();
  const handelResume = (event) => {
    if (event.target.files[0]) {
      if ((event.target.files[0].name).split('.')[1] === 'png' || (event.target.files[0].name).split('.')[1] === 'docx') {
        setFile(event.target.files[0]);
        console.log(event.target.files[0])
        localStorage.setItem("resume", event.target.files[0])
      } else {
        swal("warning", "upload a pdf or docx", "error")
      }
    } else {
      swal("warning", "select a file", "error")
    }
  }

  const handelChange = (event) => {
    event.preventDefault();
    setInfo({ ...info, [event.target.name]: event.target.value });
  };
  const applyJob = (e) => {
    e.preventDefault();
    const resume = localStorage.getItem('resume')
    let formData = new FormData();
    formData.append('name', info.name)
    formData.append('address', info.address)
    formData.append("resume", resume);
    // console.log(formData)
    axios.post("http://localhost:8000/api/jobs/upload", formData, {
    }).then(res => {
      console.log(res)
    })
    // axios.post(`http://localhost:8000/api/jobs/upload`, formData)
    //      .then(res=>{
    //     console.log(res.data);
    //      })
  }
  // const applyJob = async (event) => {
  //   event.preventDefault();
  //   if (pdf.pdf) {
  //     try {
  //       let formData = new FormData();
  //       formData.append('name', info.name)
  //       formData.append('address', info.address)
  //       //formData.append('resume', pdf.pdf)
  //       //console.log(data)

  //       const data = {
  //         name: "kb",
  //         "address": "narail"
  //       }
  //       console.log(formData)
  //       await axios.post(`http://localhost:8000/api/jobs/upload`,data)
  //       .then(res=>{
  //         console.log(res.data);
  //       }).catch((err)=>{
  //         console.log(err);
  //       })

  //       //await axios.post(`/jobs/${id}/apply`, data
  //      // ).then(res => {
  //       //  console.log(res.data);
  //         // if (res.data.error) {
  //         //   if (res.data.error === 'you have already applied!') {
  //         //     localStorage.removeItem('resume');
  //         //     swal("warning", res.data.error, "error")
  //         //   }
  //         //   else {
  //         //     console.log(res.data.error)
  //         //     swal("Application not submit!", res.data.message, "error")
  //         //     setInfo({ ...info, errors: res.data.error });
  //         //   }
  //         // } else if (res.data.data) {
  //         //   setInfo({
  //         //     errors: ''
  //         //   })
  //         //   localStorage.removeItem('resume');
  //         //   navigate('/dashboard')
  //         // }
  //       //})
  //     } catch (error) {
  //       console.log(error)
  //       //swal("warning",error.message, "error")
  //     }
  //   } else {
  //     swal("warning", "upload your cv/resume!", "error")
  //   }

  // }
  return (
    <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "85vh" }}>
      <div style={{ width: "300px", background: "rgba(0, 0, 0, 0.1)", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} className="p-4 my-5">
        <h6 className='bg-primary text-white p-2 my-3' style={{ borderRadius: "5px" }}>Application for Job ID #{id.slice(-6)}</h6>
        <form onSubmit={applyJob}>
          {file ?
            <>
              <label className='fw-bold mb-2'>Your Name</label>
              <input style={{ fontSize: "14px", boxShadow: "inset rgba(0, 0, 0, 0.35) 0px 3px 5px" }} type="text" onChange={handelChange} value={info.name} name="name" placeholder='Name' className='form-control' />
              <div className='mt-1' style={{
                color: "red", fontSize: "12px", fontWeight: "bold"
              }}>{info.errors.name ? <span>{info.errors.name}</span> : null}</div>
              <label className='fw-bold mb-2'>Your Address</label>
              <input style={{ fontSize: "14px", boxShadow: "inset rgba(0, 0, 0, 0.35) 0px 3px 5px" }} type="text" onChange={handelChange} value={info.address} name="address" placeholder='Address' className='form-control' />
              <div className='mt-1' style={{
                color: "red", fontSize: "12px", fontWeight: "bold"
              }}>{info.errors.address ? <span>{info.errors.address}</span> : null}</div>
            </> : null
          }
          {
            file ? null : <> <label className='fw-bold'>Upload your Resume</label>
              <input style={{ padding: "35px 0", fontSize: "14px", boxShadow: "inset rgba(0, 0, 0, 0.35) 0px 3px 5px" }} type="file" onChange={handelResume} placeholder="Resume" className='form-control my-3' />
            </>
          }
          <button type='submit' className='btn btn-primary w-100 mt-3'>submit</button>
        </form>
      </div>
    </div>
  );
};

export default JobApply;