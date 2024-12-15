import React, { useEffect, useState } from 'react';
import HotJobCard from './HotJobCard';

const HotJobs = () => {
    const [jobs, setJobs]= useState([]);
    const [search, setSearch]= useState('');
    
    useEffect(()=>{
       fetch('https://job-portal-server-one-beryl.vercel.app/jobs')
       .then(res=>res.json())
       .then(data=> {
          setJobs(data);
       });
    },[])
    useEffect(()=>{
      fetch(`https://job-portal-server-one-beryl.vercel.app/jobSearch?searchParams=${search}`)
      .then(res=>res.json())
      .then(data=> {
         setJobs(data);
      });
   },[search])

    return (   
        <div>
             <label className="input input-bordered flex items-center gap-2">
                <input type="text" onChange={(e)=>setSearch(e.target.value)} className="grow" placeholder="Search" />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd" />
                </svg>
            </label>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                 {
                    jobs.map(job=> <HotJobCard key={job._id} job={job} ></HotJobCard>)
                 }
              </div>
        </div>
    );
};

export default HotJobs;