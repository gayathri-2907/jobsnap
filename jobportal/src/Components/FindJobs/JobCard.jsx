import { IconBookmark, IconBookmarkFilled, IconClockHour3, IconCurrencyRupee } from '@tabler/icons-react'
import React from 'react'
import './JobCard.css'
import { Button, Divider, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { timeAgo } from '../../Services/Utilities';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfile } from '../../Slices/ProfileSlice';

export default function JobCard(props) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  const handleSaveJob = () => {
    let savedJobs = profile.savedJobs || [];  

    if (savedJobs?.includes(props.id)) {
      savedJobs = savedJobs?.filter((id) => id !== props.id);
    } else {
      savedJobs = [...savedJobs, props.id];
    }

    let updatedProfile = { ...profile, savedJobs: savedJobs };
    dispatch(changeProfile(updatedProfile));
  };

  const defaultImage = '/Assests/images/CompanyImage.jpg'; 

  // Path for company logo, fallback to default image
  const companyImage = `/Assests/Icons/${props.company}.png`;

  return (
    <div className='d-flex flex-wrap flex-column gap-1 p-2 jobcard mt-3 m-2'>
      <div className='d-flex justify-content-between p-2 flex-wrap'>
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
            <div className='fw-semibold fs-5 '>{props.jobTitle}</div>
            <div> {props.company} &#x2022; {props.applicants ? props.applicants.length : 0} Applicants</div>
          </div>
        </div>
        {profile.savedJobs?.includes(props.id) ?
          <IconBookmarkFilled className='bookmark' onClick={handleSaveJob} stroke={1.5} /> :
          <IconBookmark onClick={handleSaveJob} className="bookmark" stroke={1.5} />}
      </div>
      <div className='d-flex gap-2 p-1 jobcard-requirements'>
        <div>{props.experience}</div>
        <div>{props.jobType}</div>
        <div>{props.location}</div>
      </div>
      <Text size='xs' lineClamp={5} className='job-description pt-2'>{props.about}</Text>
      <Divider size="xs" color='lightgrey' className='m-2' />
      <div className='d-flex justify-content-between p-1'>
        <div className='fw-semibold fs-6'>
          <IconCurrencyRupee color='orange' stroke={1.5} />{props.packageOffered} LPA
        </div>
        <div className='d-flex fs-6 align-items-center'>
          <IconClockHour3 stroke={1.8} color='orange' />Posted {timeAgo(props.postTime)}
        </div>
      </div>
      <div className='jobcard-btn'>
        <Link to={`/jobs/${props.id}`}>
          <Button fullWidth color='rgba(255, 166, 0, 0.71)' className='text-white' variant='filled'>View Job</Button>
        </Link>
      </div>
    </div>
  );
}
