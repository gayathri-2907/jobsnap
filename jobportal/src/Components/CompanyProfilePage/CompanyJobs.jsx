import React from 'react'
import { jobList } from '../../Data/JobData'
import JobCard from '../FindJobs/JobCard';
import './CompanyPage.css'
export default function CompanyJobs() {
  return (
    <div className='d-flex mt-4 flex-wrap gap-5'>
         {
                  jobList.map((job,index)=><JobCard key={index} {...job}/>)
                }
    </div>
  )
}
