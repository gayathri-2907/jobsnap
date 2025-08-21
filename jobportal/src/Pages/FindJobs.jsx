import React from 'react'
import SearchBar from '../Components/FindJobs/SearchBar'
import { Divider } from '@mantine/core'
import Jobs from '../Components/FindJobs/Jobs'
export default function FindJobs() {
  return (
     <div >
       <Divider size='xs' mx="md" />
          <SearchBar/>
          <Divider size='xs' mx="md" />
          <Jobs/>
        </div>
  )
}
