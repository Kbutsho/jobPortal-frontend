import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import './apply.css';



const JobApply = () => {
  //let token = localStorage.getItem('token')
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    name: '',
    email: '',
    coverLetter: '',
    errors: []
  })
  const [file, setFile] = useState()
  const handelInfo = (e) => {
    e.preventDefault();
    setInfo({ ...info, [e.target.name]: e.target.value });
  }
  const handelFile = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      const fileItem = (e.target.files[0].name).split('.');
      const extension = fileItem[fileItem.length - 1];
      if (extension === "pdf" || extension === "docx") {
        setFile(e.target.files[0]);
      } else {
        swal("warning", "upload a pdf or docx", "error")
      }
    } else {
      swal("warning", "select a file", "error")
    }
  }

  const submit = async (event) => {
    event.preventDefault();
    if (file) {
      try {
        setLoading(!loading);
        let formData = new FormData();
        formData.append("name", info.name)
        formData.append("email", info.email)
        formData.append("coverLetter", info.coverLetter)
        formData.append("resume", file)
        console.log(file)
        await axios.post(`https://jobportal-api.onrender.com/api/jobs/${id}/apply`, formData,{
          headers: {
            'Content-Type' : 'multipart/form-data'
          }
        }
        ).then(res => {
          console.log(res)
          if (res.data.error) {
            if (res.data.error === 'you have already applied!') {
              setLoading(false);
              swal("warning", res.data.error, "error")
            } else if (res.data.error === 'deadline is over!') {
              setLoading(false);
              swal("warning", res.data.error, "error")
            }
            else {
              setLoading(false);
              swal("Application not submit!", res.data.message, "error")
              setInfo({ ...info, errors: res.data.error });
            }
          } else if (res.data.data) {
            setLoading(false);
            setInfo({
              errors: ''
            })
            swal("Application not submit!", res.data.message, "success")
            navigate('/dashboard/candidate/application')
          }
        })



        // await axios.post(`https://jobportal-api.onrender.com/api/jobs/${id}/apply`, formData)
        //   .then(res => {
        //     console.log(res);
        //     if (res.data.error) {
        //       if (res.data.error === 'you have already applied!') {
        //         setLoading(false);
        //         swal("warning", res.data.error, "error")
        //       } else if (res.data.error === 'deadline is over!') {
        //         setLoading(false);
        //         swal("warning", res.data.error, "error")
        //       }
        //       else {
        //         setLoading(false);
        //         swal("Application not submit!", res.data.message, "error")
        //         setInfo({ ...info, errors: res.data.error });
        //       }
        //     } else if (res.data.data) {
        //       setLoading(false);
        //       setInfo({
        //         errors: ''
        //       })
        //       navigate('/home')
        //     }
        //   }).catch((err) => {
        //     setLoading(false);
        //     swal("warning", err.message, "error")
        //   })
      } catch (error) {
        setLoading(false);
        swal("warning", error.message, "error")
      }
    } else {
      swal("warning", "upload your resume/cv", "error")
    }
  }
  return (
    <div className='container' style={{ minHeight: "77vh" }}>
      <div style={{ background: "#F5F7FC", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} className="p-4 my-5 container">
        <h4 className=' fw-bold text-white text-center btn-primary py-3 bg-primary my-4' style={{ borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 3px 5px" }}>Application for Job ID #{id.slice(-6)}</h4>
        <span>{loading ? <p className='fw-bold text-danger text-center p-2' style={{ borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 3px 5px" }}>Uploading... please wait</p> : null}</span>
        <form onSubmit={submit}>
          {
            file ? <>
              <div className='row'>
                <div className='col-6'>
                  <label className='fw-bold mb-2'>Your Name</label>
                  <input onChange={handelInfo} type="text" placeholder='Name' name="name" className='form-control mb-3 w-100' />
                  <div style={{
                    color: "red", fontSize: "12px", fontWeight: "bold"
                  }}>{info.errors.name ? <span>{info.errors.name}</span> : null}</div>
                </div>
                <div className='col-6'>
                  <label className='fw-bold mb-2'>Your Email</label>
                  <input onChange={handelInfo} type="text" placeholder='Email' name="email" className='form-control mb-3' />
                  <div style={{
                    color: "red", fontSize: "12px", fontWeight: "bold"
                  }}>{info.errors.email ? <span>{info.errors.email}</span> : null}</div>
                </div>
              </div>

              <label className='fw-bold mb-2'>Cover Letter</label>

              <textarea rows="7" cols="50" onChange={handelInfo} type="text" placeholder='Cover Letter' name="coverLetter" className='form-control  mb-3' />
              <div className='mt-1' style={{
                color: "red", fontSize: "12px", fontWeight: "bold"
              }}>{info.errors.letter ? <span>{info.errors.coverLetter}</span> : null}</div>






            </> : null
          }
          {
            file ? null :


              <>
                <label className='fw-bold mb-3'>Upload your Resume or CV Here</label>
                <input onChange={handelFile} type="file" placeholder='upload your resume' className='form-control mb-3 custom-file-input' />
              </>
          }
          <div className='d-flex justify-content-end'>
            {
              file ? <button type='submit' className='btn px-4 btn-primary'>Submit</button> : <button type='submit' className='btn px-4 btn-primary'>Next</button>
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApply;