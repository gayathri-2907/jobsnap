import { Divider } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import PostedJob from '../Components/PostedJob/PostedJob';
import PostedJobDescription from '../Components/PostedJob/PostedJobDescription';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {  getJobsPostedByEmail } from '../Services/JobService';

export default function PostedJobPage() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [jobList, setJobList] = useState([]);
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    getJobsPostedByEmail(user.userEmail)
      .then((res) => {
        setJobList(res);
        if(res && res.length>0 && Number(id)===0)navigate(`/posted-job/${res[0].id}`);
        const selectedJob = res.data.find((item) => item.id === Number(id));
        setJob(selectedJob);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, [id]);

  return (
    <div className='m-3 px-4'>
      <Divider size='xs' />
      <div className='d-flex gap-3'>
        <PostedJob job={job} jobList={jobList} />
        <PostedJobDescription {...job} />
      </div>
    </div>
  );
}
