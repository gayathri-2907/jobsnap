import React from 'react'
import {talents} from '../../Data/TalentData'
import TalentCard from '../FindTalent/TalentCard'
export default function CompanyEmployees() {
  return (
    <div className='d-flex mt-10 flex-wrap gap-5 justify content-between'>
        {
            talents.map((talent,index)=>index<6 &&<TalentCard key={index} {...talent}/>)
        }
    </div>
  )
}
