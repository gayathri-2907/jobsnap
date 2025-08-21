import { IconBookmark, IconBookmarkFilled, IconCalendarMonth, IconClockHour3 } from '@tabler/icons-react'
import React from 'react'
import './JobHistory.css'
import {Button, Divider, Text} from '@mantine/core';
import { Link } from 'react-router-dom';
import { formatInterviewTime, timeAgo } from '../../Services/Utilities';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfile } from '../../Slices/ProfileSlice';
import commonLabels from '../../Labels/Labels.json'
export default function Card(props) {
  const dispatch=useDispatch();
  const profile=useSelector((state)=>state.profile);

   const handleSaveJob=()=>{
      let savedJobs = profile.savedJobs || [];  
  
      if(savedJobs?.includes(props.id)){
        savedJobs=savedJobs?.filter((id)=>id!==props.id);
      }else{
        savedJobs=[...savedJobs,props.id];
      }
      let updatedProfile={...profile,savedJobs:savedJobs};
      dispatch(changeProfile(updatedProfile));
    }
    const defaultImage = '/Assests/images/CompanyImage.jpg'; 

  // Path for company logo, fallback to default image
  const companyImage = `/Assests/Icons/${props.company}.png`;

  return (
    <div className='d-flex flex-column gap-1 historycard mt-3 p-2'>
      <div className='d-flex justify-content-between p-1 flex-wrap'>
        <div className='d-flex align-items-center gap-1'>
          <div>
          <img
              style={{ width: "50px", height: "50px" }}
              // Fallback to default image if company image is missing
              src={companyImage}
              onError={(e) => e.target.src = defaultImage}  
              alt={props.company}
            />
          </div>
          <div>
            <div className='fw-semibold '>{props.jobTitle}</div>
            <div className='Applicant-count-historycard '> <Link className='text-decoration-none text-warning' to="/company">{props.company}</Link> &#x2022; {props.applicants?props.applicants.length:0} Applicants</div>
          </div>
        </div>
         { profile.savedJobs?.includes(props.id)?<IconBookmarkFilled className='bookmark' onClick={handleSaveJob} stroke={1.5}/>:
                <IconBookmark onClick={handleSaveJob} className="bookmark" stroke={1.5}/>}
      </div>
      <div className='d-flex gap-2 p-2 historycard-requirements'>
        <div>{props.experience}</div>
        <div>{props.jobType}</div>
        <div>{props.location}</div>

      </div>
      <Text size='xs' lineClamp={5} className='historycard-description'> {props.about}</Text>
      <Divider size="xs" color='lightgrey' className='m-2'/>
      <div className='d-flex justify-content-between p-2'>
        <div className='fw-semibold'>&#8377;{props.packageOffered} LPA</div>
        <div>
        <IconClockHour3 color='orange' stroke={1.5}/>{props.applied||props.interviewing?"Applied":props.offered?"Interviewed":"Posted"} {timeAgo(props.postTime)}
        </div>
      </div>
      {(props.offered|| props.interviewing)&&<Divider size='xs' color='lightgrey' className='m-2'/>}
      {
        props.offered &&<div className='d-flex gap-4 m-3' >
            <Button color='orange' variant='outline'  fullWidth>{commonLabels.buttons.accept}</Button>
            <Button color='orange' variant='light' fullWidth>{commonLabels.buttons.reject}</Button>
        </div>
      }
      {
        props.interviewing && <div className='d-flex gap-1 align-items-center m-3'>
            <IconCalendarMonth color='orange' stroke={1.5}/>{formatInterviewTime(props.applicants[0].interviewTime)}
        </div>
      }
      
      <div className='jobcard-btn'>
            <Link to={`/jobs/${props.id}`}>
              <Button fullWidth color='rgba(255, 166, 0, 0.71)' className='text-white' variant='filled'>View Job</Button>
            </Link>
            </div>
    </div>
  )
}
