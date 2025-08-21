import { ActionIcon } from '@mantine/core'
import { IconExternalLink } from '@tabler/icons-react'
import React from 'react'

export default function CompanyCard(props) {
  return (
    <div className='d-flex gap-3 align-items-center mb-3 square rounded-3 companyCard'>
      <div className='d-flex justify-content-between gap-3'>
        <div className='p-2 companyCardImage'>
          <img src={`/Assests/Icons/${props.name}.png`} alt='' />
        </div>
        <div className='d-flex flex-column gap-1'>
          <div className='fw-bold fs-4'>{props.name}</div>
          <div className='fs-6'>{props.employees} Employees</div>
        </div>
      </div>
      <ActionIcon color='orange' variant='subtle' className='m-3'>
        <IconExternalLink />
      </ActionIcon>
    </div>
  )
}
