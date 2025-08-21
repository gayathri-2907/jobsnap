import React, { useEffect, useState } from 'react'
import { Divider,Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import '../Components/TalentProfilePage/TalentProfilePage.css'
import { IconArrowLeft } from '@tabler/icons-react'
import Profile from '../Components/TalentProfilePage/Profile'
// import {profile} from '../Data/ProfileData'
import RecommendTalent from '../Components/TalentProfilePage/RecommendTalent'
import { getAllProfiles } from '../Services/ProfileService'

export default function TalentProfilePage() {
  const navigate=useNavigate();
  const [talents,setTalents]=useState([]);
  useEffect(()=>{
    getAllProfiles().then((res)=>{
      setTalents(res.data);
    }).catch((err)=>{
      console.error(err);
    })
  }, [])
  return (
    <div className='talent-profile-page'>
      <Divider size='xs' />
{/* back button */}

        <Button  onClick={()=>navigate(-1)} className='profilebtn'>
          <IconArrowLeft className='arrow-left' />
          <span className='btn-text'>Back</span>
        </Button>
      {/* talent profile page */}
      
            <div className='d-flex gap-5' >
              <Profile/>
              <RecommendTalent talents={talents}/>
            </div>

    </div>
  )
}
