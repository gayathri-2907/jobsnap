import React, { useEffect, useState } from 'react';
import JobCard from '../FindJobs/JobCard';
import './RecommendedJob.css';
import { getAllJobs } from '../../Services/JobService';
import labels from '../../Labels/JobLabel.json'
import { errorNotification } from '../../Services/NotificationService';
export default function RecommendedJob({ currentJobId }) {
  const [jobList, setJobList] = useState(null);

  useEffect(() => {
    getAllJobs().then((res) => {
      setJobList(res.data.content);
    }).catch((err) => {
      errorNotification(labels.errors.jobFetchingError,err)
    });
  }, [currentJobId]);

  // Filter the jobs and only keep active jobs that are not the current job
  const filteredJobs = jobList ? jobList
    .filter((job) => job.id !== parseInt(currentJobId) && job.jobStatus === 'ACTIVE')
    .slice(0, 3) : [];

  return (
    <div className='d-flex justify-content-between flex-wrap overflow-hidden w-50'>
      <div>
        <p className='fs-4 fw-bold'>{labels.labels.recommandedJobs}</p>
        <div>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => <JobCard key={index} {...job} />)
          ) : (
            <p>{labels.labels.loadingJobs}</p> 
          )}
        </div>
      </div>
    </div>
  );
}
