import React from 'react'
import { Divider } from '@mantine/core'
import '../Components/TalentProfilePage/TalentProfilePage.css'
import PostingJob from '../Components/PostJob/PostingJob'

export default function PostJobPage() {
  return (
    <div className='post-job-page'>
      <Divider size='xs' />
      <PostingJob/>
      </div>

)}