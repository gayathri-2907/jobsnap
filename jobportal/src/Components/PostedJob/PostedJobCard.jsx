import React from 'react'
import './PostedJob.css'
import { useParams,Link } from 'react-router-dom'
import { timeAgo } from '../../Services/Utilities';
export default function PostedJobCard(props) {
const {id}=useParams();
  return (
    <Link to={`/posted-job/${props.id}`} className={`square rounded-2 p-1 postedjobcard ${props.id===id ?'':'postinactive'}` }>
        <div className='fw-bold fs-6'>{props.jobTitle}</div>
        <div >{props.location}</div>
        <div className='postedtime'>{props.jobStatus==="DRAFT"?"Drafted":props.jobStatus==="CLOSED"?"Closed":"Posted"} {timeAgo(props.postTime)}</div>
    </Link>
  )
}
