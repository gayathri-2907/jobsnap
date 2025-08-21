import { Button, Divider } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Company from '../Components/CompanyProfilePage/Company';
import SimilarCompanies from '../Components/CompanyProfilePage/SimilarCompanies';
import '../Components/CompanyProfilePage/CompanyPage.css'
export default function CompanyPage() {
    const navigate=useNavigate();
  return (
    <div className='m-3'>
        <Divider size='xs'/>
            <Button color='orange' my='md' onClick={()=>navigate(-1)} leftSection={<IconArrowLeft size={20}/>} variant='light' >Back</Button>
        <div className='d-flex gap-3 main-page'>
            <Company/>
            <SimilarCompanies/>
        </div>
    </div>
  )
}
