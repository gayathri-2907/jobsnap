import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../Components/TalentProfilePage/TalentProfilePage.css';
import { IconArrowLeft } from '@tabler/icons-react';
import JobDescription from '../Components/JobDescription/JobDescription';
import RecommendedJob from '../Components/JobDescription/RecommendedJob';
import { getPostedJobById } from '../Services/JobService';
import { Button } from '@mantine/core';

export default function JobDescriptionPage() {
  const { id } = useParams();  
  const [job, setJob] = useState(null);
  const navigate=useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    getPostedJobById(id).then((res) => {
      setJob(res.data);
    }).catch((err) => {
      console.error(err);
    });
  }, [id]);

  return (
    <div className='talent-profile-page'>
      {/* Back button */}
      <Link to="/find-jobs">
        <Button color='orange' my='md' className='m-2'  onClick={()=>navigate(-1)} leftSection={<IconArrowLeft size={20}/>} variant='light' >Back</Button>
      </Link>

      <div className='d-flex gap-5 m-2 justify-content-around'>
        <JobDescription {...job} />
        <RecommendedJob currentJobId={id} /> 
      </div>
    </div>
  );
}
