import { Divider } from '@mantine/core'
import React from 'react'
import Profile from '../Components/Profile/Profile'
import {profile} from '../Data/ProfileData'
export default function ProfilePage() {
  return (
    <div className='overflow-hidden'>
        <Divider mx='md' mb='xl'/>
        {
                  profile.map((person,index)=>(
                    <div className='profile' key={index}>
                      <Profile {...person}/>
                    </div>
                  ))
                }
    </div>
  )
}
