import React from 'react';
import { FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
const HotJobCard = ({ job }) => {

    const { title, location, jobType, category, applicationDeadline, salaryRange, description, company, requirements, responsibilities, status, hr_email, hr_name, company_logo } = job;
    return (
        <div className="card bg-base-100  shadow-xl">
            <div className='flex gap-2 m-2'>
                <figure>
                    <img className='w-16'
                        src={company_logo} />
                </figure>
                <div>
                    <h4 className='text-2xl'>{company}</h4>
                    <p className='flex gap-1 items-center'> <FaMapMarkerAlt /> {location}</p>
                </div>
            </div>
            <div className="card-body">
                <h2 className="card-title">{title}
                <div className="badge badge-secondary">NEW</div>
                 </h2>
                <p>{description}</p>
                <div className='flex gap-2 flex-wrap'>
                    {requirements.map(skill=><p className='border rounded-md text-center px-2 hover:bg-pink-500'>{skill}</p>)}
                </div>
                <div className="card-actions justify-end items-center">
                    <p className='flex items-center'>Salary Range: <FaDollarSign></FaDollarSign> {salaryRange.min} - {salaryRange.max} {salaryRange.currency}
                    </p>
                    <button className="btn btn-primary">Apply</button>
                </div>
            </div>
        </div>
    );
};

export default HotJobCard;