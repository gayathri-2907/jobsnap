import React from 'react'
import { Avatar } from "@mui/material";

import Rating from '@mui/material/Rating';
import './Styles/Testimonial.css'
import labels from '../../Labels/LandingPageLabel.json'
export default function Testimonials() {
  return (
    <div className="mt-20 pb-5">
    <div className="text-center fw-bold fs-2 p-3">
      {labels.testmonialLabels.what}<span className="text-warning"> {labels.testmonialLabels.user} </span>{labels.testmonialLabels.says}</div>
      <div className='testimonials-outer-container'>
      {
        labels.testmonialLabels.testimonials.map((data,index)=> <div key={index} className=' gap-3 testimonial-rating'>
        <div className='d-flex flex-row gap-2 align-items-center'>
            <Avatar src='/Assests/images/avatar.png' alt="testimonial-user"  />
            <div>
                <div>{data.name}</div>
                <Rating name="half-rating-read" defaultValue={data.rating} precision={0.5} readOnly />
            </div>
        </div>
        <div className='text-xs'> {data.testmonial}</div>
    </div>)
      }
      </div>
    </div>
  )
}
