import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const JobApply = () => {
    const {user}= useAuth();
    const {id}= useParams();
    const handleApply = (e)=>{
        e.preventDefault();
        const form = e.target;
        const linkedIn = form.linkedIn.value;
        const github = form.github.value;
        const resume = form.resume.value;
        console.log(linkedIn, github, resume);
        const jobApplication ={
            job_id: id,
            applicant_email: user.email,
            linkedIn,
            github,
            resume
        }
        fetch('http://localhost:5000/job-applications',{
            method: 'POST',
            headers :{
                'content-type': 'application/json'
            },
            body: JSON.stringify(jobApplication)

        })
        .then(res=> res.json())
        .then(data=> {
            if(data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your application has been saved",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
        
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                {/* <div className="text-center lg:text-left">
                    
                </div> */}
                <div className="card bg-base-100 w-full  shrink-0 shadow-2xl">
                <h1 className="text-5xl font-bold">Apply Job and Good Luck</h1>
                   
                    <form onSubmit={handleApply} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">LinkedIn URL</span>
                            </label>
                            <input type="url" placeholder="linkedIn url"  name='linkedIn' className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Github URL</span>
                            </label>
                            <input type="url" name='github' placeholder="Github url" className="input input-bordered" required />
                           
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Resume URL</span>
                            </label>
                            <input type="url" placeholder="Resume url" name='resume' className="input input-bordered" required />
                           
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Apply</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobApply;