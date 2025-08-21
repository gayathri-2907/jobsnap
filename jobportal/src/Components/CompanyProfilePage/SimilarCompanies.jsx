import React from 'react'
import { similar } from '../../Data/CompanyData'
import CompanyCard from './CompanyCard'
export default function SimilarCompanies() {
  return (
    <div>
        <div className='fs-4 fw-semibold mb-3'>Similar Companies</div>
            <div className='d-flex flex-column flex-wrap gap-2 justify-content-between w-25'>
                {
                    similar.map((company,index) =><CompanyCard key={index} {...company}/>)
                }
            </div>
        
    </div>
  )
}
