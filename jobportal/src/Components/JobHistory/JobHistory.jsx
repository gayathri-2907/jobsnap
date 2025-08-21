import { Tabs } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import { getAllJobs } from '../../Services/JobService';
import { useSelector } from 'react-redux';
import labels from '../../Labels/JobLabel.json'
export default function JobHistory() {
  const [activeTab, setActiveTab] = useState('APPLIED');
  const [jobList, setJobList] = useState([]);
  const [showList, setShowList] = useState([])
  
  const profile=useSelector((state) => state.profile);
  const user=useSelector((state) => state.user);
  useEffect(() => {
    getAllJobs().then((res) => {
      setJobList(res.data.content);
      setShowList(res.data.content.filter((job)=>{
        let found=false;
        job.applicants?.forEach((applicant)=>{
          if(applicant.email===user.userEmail && applicant.applicationStatus==="APPLIED"){
            found=true;
          }
        })
        return found;
      }))
    }).catch((err) => {
      console.error(err);
    })
//eslint-disable-next-line
  },[])
  const handleTabChange = (value) => {
    setActiveTab(value);
    if (value === "SAVED") {
      const savedJobs = jobList.filter((job) => profile.savedJobs?.includes(job.id));
      setShowList(savedJobs);
    } else {
      setShowList(jobList.filter((job)=>{
        let found=false;
        job.applicants?.forEach((applicant)=>{
          if(applicant.email===user.userEmail && applicant.applicationStatus===value){
            found=true;
          }
        })
        return found;
      }))
    }
  };
  
  return (
    <div className=''>
      <div className='fs-3 fw-bold mb-3'>{labels.labels.jobHistory.title}</div>
      <div className='w-100 m-2'>
        <Tabs variant="outline" radius='md' value={activeTab} onChange={handleTabChange}>
          <Tabs.List className='fw-semibold gap-1 mb-3'>
            <Tabs.Tab value="APPLIED" className='square rounded-1'>Applied</Tabs.Tab>
            <Tabs.Tab value="SAVED" className='square rounded-1'>Saved</Tabs.Tab>
            <Tabs.Tab value="OFFERED" className='square rounded-1'>Offered</Tabs.Tab>
            <Tabs.Tab value="INTERVIEWING" className='square rounded-1'>interviewing</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={activeTab}>
            <div className='d-flex mt-10 flex-wrap gap-5'>
            {
      showList.length === 0 ? (
        <div className='m-5 fs-5 fw-semibold'>No Jobs Found</div> 
      ) : (
        showList.map((item, index) => <Card key={index} {...item} {...{[activeTab.toLowerCase()]:true}} />)
      )
    }
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  )
}
