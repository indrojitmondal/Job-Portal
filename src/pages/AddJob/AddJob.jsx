import React from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
    const {user}= useAuth();
    const navigate= useNavigate();
    const handleAddJob=(e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const initialData=Object.fromEntries(formData.entries());
        console.log(initialData);
        const {min, max, currency, ...newJob}= initialData;
        newJob.salaryRange ={min, max, currency};
        console.log(newJob);
        newJob.requirements = newJob.requirements.split('\n');
        newJob.responsibilities = newJob.responsibilities.split('\n');
        console.log(newJob);
        fetch('hthttps://job-portal-server-one-beryl.vercel.app/jobs',{
            method:'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify(newJob)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "New Job has been added",
                    showConfirmButton: false,
                    timer: 1500
                  });

                  navigate('/myPostedJobs');


            }
        })
    }
    return (
        <div>
            <h2 className="text-3xl">Post a Job</h2>
            <form onSubmit={handleAddJob} className="card-body ">
                {/* Job Title */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Title</span>
                    </label>
                    <input type="text" name='title' placeholder="Job Title" className="input input-bordered" required />
                </div>
                {/* Job Location */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Location</span>
                    </label>
                    <input type="text" name='location' placeholder="Job Location" className="input input-bordered" required />

                </div>
                {/* Job Type */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Type</span>
                    </label>
                    <select defaultValue={'Pick a Job Type'} name='jobType' className="select select-ghost w-full max-w-xs">
                        <option disabled >Pick a Job Type</option>
                        <option>Full-Time</option>
                        <option>Intern</option>
                        <option>Part-Time</option>
                    </select>
                </div>
                {/* Job Field */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Category</span>
                    </label>
                    <select defaultValue={'Pick a Job Category'} name='category' className="select select-ghost w-full max-w-xs">
                        <option disabled >Pick a Job Category</option>
                        
                        <option>Engineering</option>
                        <option>Marketing</option>
                        <option>Finance</option>
                        <option>Teaching</option>
                    </select>
                </div>
                {/* Salary Range */}

                <div className='grid grid-cols-1 lg:grid-cols-3 items-end gap-4'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Salary Range</span>
                        </label>
                        <input type="text" name='min' placeholder="Min" className="input input-bordered" required />

                    </div>
                    <div className="form-control">

                        <input type="text" name='max' placeholder="Max" className="input input-bordered" required />

                    </div>
                    <div className="form-control">

                        <select defaultValue={'Pick a currency'} name='currency'  className="select select-ghost w-full max-w-xs">
                            <option disabled >Pick a currency</option>
                            <option>USD</option>
                            <option>BDT</option>
                            <option>INR</option>

                        </select>
                    </div>
                </div>

                {/* Job Description */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Description</span>
                    </label>
                    <textarea name='description' className="textarea textarea-bordered" placeholder="job description" required></textarea>
                </div>

                {/* Company */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Company Name</span>
                    </label>
                    <input  type="text" name='company' placeholder="Company Name" className="input input-bordered" required />

                </div>

                {/* requirements */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Requirements</span>
                    </label>
                    <textarea name='requirements' className="textarea textarea-bordered" placeholder="put each requirements in a new line"></textarea>
                </div>
                {/*Responsibilities */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Responsibilities</span>
                    </label>
                    <textarea required name='responsibilities' className="textarea textarea-bordered" placeholder="Write each responsibilities in a new line"></textarea>
                </div>

                {/* HR Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">HR Name</span>
                    </label>
                    <input type="text" name='hr_name' placeholder="HR Name" className="input input-bordered" required />
                </div>

                {/* HR Email */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">HR Email</span>
                    </label>
                    <input type="text" defaultValue={user?.email} name='hr_email' placeholder="HR Email" className="input input-bordered" required />
                </div>
                {/* Application Deadline */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Deadline</span>
                    </label>
                    <input type="date"  name='applicationDeadline' placeholder="Deadline" className="input input-bordered" required />
                </div>
               
               
                {/* Company logo */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Company Logo URL</span>
                    </label>
                    <input type="text" name='company_logo' placeholder="Company Logo URL" className="input input-bordered" required />
                </div>

                {/* submit */}
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddJob;