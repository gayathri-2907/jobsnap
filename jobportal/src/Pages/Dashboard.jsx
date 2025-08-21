import React from 'react'
import DreamJob from '../Components/HomePageComponents/DreamJob';
import Companies from '../Components/HomePageComponents/Companies';
import JobCategory from '../Components/HomePageComponents/JobCategory';
import Working from '../Components/HomePageComponents/Working';
import Testimonials from '../Components/HomePageComponents/Testimonials';
import Subscribe from '../Components/HomePageComponents/Subscribe';

// localStorage.clear();

export default function Dashboard() {
  return (
    <div className='mt-5'>
      <DreamJob/>  
      <Companies/>
      <JobCategory/>
      <Working/>
      <Testimonials/>
      <Subscribe/>
    </div>
   
  )
}
