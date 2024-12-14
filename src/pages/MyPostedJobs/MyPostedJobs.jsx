import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const MyPostedJobs = () => {
    const { user } = useAuth();
    const [myPostedJobs, setMyPostedJobs] = useState([]);
    useEffect(() => {
        fetch(`https://job-portal-server-one-beryl.vercel.app/jobs?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setMyPostedJobs(data);
            })
    }, [user.email]);
    return (
        <div>
            <h2 className="text-3xl">My Post Jobs: {myPostedJobs.length}</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Job Title</th>
                            <th>Deadline</th>
                            <th>Application Count</th>
                            <th>Applications</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                       {
                        myPostedJobs.map( (job,index)=>  <tr>
                            <th>{index+1}</th>
                            <td>{job.title}</td>
                            <td>{job.applicationDeadline}</td>
                            <td>{job.applicationCount}</td>
                            <td>
                               <Link to={`/ViewApplications/${job._id}`}>
                               <button className="btn btn-link">View Applications</button>
                            
                               </Link>
                            </td>
                        </tr>)
                       }
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPostedJobs;