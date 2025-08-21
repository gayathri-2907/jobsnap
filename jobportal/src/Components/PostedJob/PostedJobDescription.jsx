import { Badge, Tabs } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import JobDescription from '../JobDescription/JobDescription'
import TalentCard from '../FindTalent/TalentCard'
import labels from '../../Labels/JobLabel.json';
import './PostedJob.css'
export default function PostedJobDescription(props) {
  const [tab,setTab]=useState("overview");
  const [arr,setArr]=useState([])
  const handletabChange=(value)=>{
    setTab(value);
    if(value==="applicants"){
      setArr(props.applicants?.filter((x)=>x.applicationStatus==="APPLIED"))
    }else if(value==="invited"){
      setArr(props.applicants?.filter((x)=>x.applicationStatus==="INTERVIEWING"));
    }else if(value==="offered"){
      setArr(props.applicants?.filter((x)=>x.applicationStatus==="OFFERED"));
    }else if(value==="rejected"){
      setArr(props.applicants?.filter((x)=>x.applicationStatus==="REJECTED"));
    }
  }
  useEffect(()=>{
    handletabChange("overview");
    //eslint-disable-next-line
  },[props])
  return (
    <div className='mt-5 w-100'>
      {props.jobTitle?<>
      <div className='fs-3 fw-semibold d-flex align-items-center'>{props.jobTitle}
        <Badge variant='light' color='orange' ml='sm' size='sm'>{props.jobStatus}</Badge>
      </div>
      <div className='fw-200 mb-5'>{props.location}</div>
      <div>
        <Tabs variant="outline" radius='md' value={tab} onChange={handletabChange}>
          <Tabs.List className='fw-semibold gap-1 mb-3'>
          <Tabs.Tab value="overview" className='square rounded-1'>{labels.labels.postedJobDescription.tabs.overview}</Tabs.Tab>
            <Tabs.Tab value="applicants" className='square rounded-1'>{labels.labels.postedJobDescription.tabs.applicants}</Tabs.Tab>
            <Tabs.Tab value="invited" className='square rounded-1'>{labels.labels.postedJobDescription.tabs.invited}</Tabs.Tab>
            <Tabs.Tab value="offered" className='square rounded-1'>{labels.labels.postedJobDescription.tabs.offered}</Tabs.Tab>
            <Tabs.Tab value="rejected" className='square rounded-1'>{labels.labels.postedJobDescription.tabs.rejected}</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="overview" className='w-100'>
          <JobDescription {...props} edit={true} closed={props.jobStatus==='CLOSED'}/>
          </Tabs.Panel>
          <Tabs.Panel value="applicants" className='justify-content-center'>
          <div className='d-flex flex-wrap gap-5 justify-content-around'>
            {
              arr.length?arr.map((talent, index) =>  <TalentCard key={index} {...talent} posted={true}/>):<div className='fs-4 fw-semibold m-5'>{labels.labels.postedJobDescription.default.applicants}</div>
            }
          </div>
          </Tabs.Panel>
          <Tabs.Panel value="invited" className='justify-content-center'>
          <div className='d-flex flex-wrap justify-content-around'>
            {
              arr.length?arr.map((talent, index) =>  <TalentCard key={index} {...talent} invited={true}/>):<div className='fs-4 fw-semibold m-5'>
              {labels.labels.postedJobDescription.default.invited}
              </div>
            }
          </div>
          </Tabs.Panel>
          <Tabs.Panel value="offered" className='justify-content-center'>
          <div className='d-flex m-10 flex-wrap justify-content-around'>
            {
              arr.length?arr.map((talent, index) =>  <TalentCard key={index} {...talent} offered={true}/>):<div className='fs-4 fw-semibold m-5'>
              {labels.labels.postedJobDescription.default.offered}
              </div>
            }
          </div>
          </Tabs.Panel>
          <Tabs.Panel value="rejected" className='justify-content-center'>
          <div className='d-flex m-10 flex-wrap justify-content-around'>
            {
              arr.length?arr.map((talent, index) =>  <TalentCard key={index} {...talent} rejected={true}/>):<div className='fs-4 fw-semibold m-5'>
              {labels.labels.postedJobDescription.default.rejected}
              </div>
            }
          </div>
          </Tabs.Panel>
        </Tabs>
      </div>
      </>:<div className='fs-3 fw-semibold text-center'>{labels.labels.postedJobDescription.default.noJobs}</div>}
    </div>
  )
}
