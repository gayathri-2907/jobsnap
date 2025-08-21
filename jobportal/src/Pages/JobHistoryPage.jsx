import { Divider } from '@mantine/core'
import React from 'react'
import JobHistory from '../Components/JobHistory/JobHistory'

export default function JobHistoryPage() {
  return (
     <div className='m-2 px-4'>
            <Divider size='xs'/>
            <div className='mt-3'>
                <JobHistory/>
            </div>
        </div>
    
  )
}
