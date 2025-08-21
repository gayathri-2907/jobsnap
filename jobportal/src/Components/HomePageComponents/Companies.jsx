import React from 'react'
import  Marquee  from 'react-fast-marquee'
import './Styles/HomePage.css'
import labels from '../../Labels/LandingPageLabel.json'
export default function Companies() {
  return (
    <div className='mt-20 pb-5 cursor-pointer'>
    <div className='text-center fw-bold fs-2 p-3'> {labels.companiesLabels.trustedBy} <span className='text-warning'>{labels.companiesLabels.count}</span> {labels.companiesLabels.company}</div>
    <Marquee pauseOnHover={true}>
    {
      labels.companiesLabels.companies.map((company,index)=><div key={index} className='company-outer-container'>
      <img className='companies-images' src={`/Assests/Companies/${company}.png`} alt={company} /> 
      </div>)
    }
    </Marquee>
    </div>
  )
}
