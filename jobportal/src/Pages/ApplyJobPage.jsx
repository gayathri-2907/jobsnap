import { Divider, Button } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ApplyJob from '../Components/ApplyJob/ApplyJob'
import { getPostedJobById } from '../Services/JobService'

export default function ApplyJobPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    getPostedJobById(id)
      .then((res) => {
        setJob(res.data);
      }).catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
      <div className='apply-job-page'>
        <Divider size='xs' />
        <Button color='orange' my='md' className='m-2' onClick={() => navigate(-1)} leftSection={<IconArrowLeft size={20} />} variant='light' >Back</Button>
        <ApplyJob {...job} />
      </div>
  )
}
