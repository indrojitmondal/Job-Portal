import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const MyApplication = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    
    console.log(search);
    useEffect(() => {

        fetch(`https://job-portal-server-one-beryl.vercel.app/job-application?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setJobs(data);
            })

    }, [user.email]);
  
    const handleDeleteJob = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't to delete this application!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://job-portal-server-one-beryl.vercel.app/job-application/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            const remainingApplication = jobs.filter(job => job._id !== id);
                            setJobs(remainingApplication);
                            Swal.fire({
                                title: "Deleted!",
                                text: "The application has been deleted.",
                                icon: "success"
                            });

                        }
                    })


            }
        });
    }
    return (
        <div>


         
            <h2 className="text-3xl">My Applications: {jobs.length} </h2>


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            jobs.map(job => <tr key={job._id}>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={job.company_logo}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{job.title}</div>
                                            <div className="text-sm opacity-50">{job.location}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Zemlak, Daniel and Leannon
                                    <br />
                                    <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                </td>
                                <td>Purple</td>
                                <th>
                                    <button onClick={() => handleDeleteJob(job._id)} className="btn btn-ghost btn-xs">X</button>
                                </th>
                            </tr>)
                        }



                    </tbody>


                </table>
            </div>

        </div>
    );
};

export default MyApplication;