import React, { useEffect, useState } from 'react'
import { IconBriefcase, IconBriefcaseFilled, IconMapPin } from '@tabler/icons-react'
import { Divider } from '@mantine/core'
import ExperienceCard from './ExperienceCard'
import CertificateCard from './CertificateCard'
import { useParams } from 'react-router-dom'
import {  getProfile,} from '../../Services/ProfileService'

export default function Profile(props) {
    const {profileId}=useParams();
    const [profile,setProfile] = useState({});
    useEffect(() => {
        window.scrollTo(0,0)
        getProfile(profileId).then((res) => {
            setProfile(res.data);
        }).catch((error)=>{
            console.error(error);
        })
    },[profileId])
  return (
    <div className='profile-outer-container w-100 p-3'>
        <div className='profile-container'>
            <img className='profilebanner' src='/Assests/images/profilebanner.avif'alt=''></img>
            <img className='profileavatar' src={
              profile.profilePicture
                ? `data:image/jpeg;base64,${profile.profilePicture}`
                : '/Assests/images/profileavatar.png'
            } alt=''></img>
        </div>
        <div>
            <div className='px-3 profile-data'>
                <div className='profile-name'>{profile?.name}
                </div>
                <div className='profile-role'><IconBriefcase/> 
                {profile?.jobTitle} &bull; {profile?.company}
                </div>
                <div className='map-icon d-flex gap-3'>
                 <div><IconMapPin  stroke={1.5}/>{profile?.location}</div>
                 <div><IconBriefcaseFilled  stroke={1.5}/>Experience:{profile?.totalExperience} years</div>
                 </div>
                 </div>
                 
            <Divider mx="xs" my="xl"/>
            </div>
                <div className='px-3'>
                    <div className='fw-bold mb-3'>About</div>
                    <div style={{ textAlign: 'justify' }}>
                        {profile?.about}
                    </div>
            </div>
            {/* skill section */}
            <Divider mx="xs" my="xl"/>
                <div className='px-3'>
                    <div className='fw-bold mb-3'>Skills</div>
                    <div className='profile-skills'>
                       {
                         profile.skills?.map((skill, index) => (
                          <div key={index} className='skill-list'>{skill}</div>
                         ))
                        }
                    </div>
            </div>
            {/* Experience section */}
            <Divider mx="xs" my="xl"/>
            <div className='px-3'>
                <div className='fw-bold mb-3'>Experience</div>
                <div className='d-flex flex-column gap-5'>
                {
                    profile?.experiences?.map((experience,index)=>
                        <ExperienceCard key={index} {...experience}/>)
                }
                </div>
               
            </div>
             {/* Certifications section */}
             <Divider mx="xs" my="xl"/>
            <div className='px-3'>
                <div className='fw-bold mb-3'>Certifications</div>
                <div className='d-flex flex-column gap-5'>
                {
                    profile?.certifications?.map((certification,index)=>
                        <CertificateCard key={index} {...certification}/>)
                }
                </div>
            </div>
        </div>
  )
}
