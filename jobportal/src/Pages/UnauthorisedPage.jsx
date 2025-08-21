import { Button } from '@mantine/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/UnauthorisedPage.css'
export default function UnauthorisedPage() {
    const navigate=useNavigate();
  return (
    <div className='d-flex justify-content-center mt-5 p-5'>
        <div className='d-flex flex-column border bg-dark bg-opacity-10 border-2px p-5 square rounded-2 text-center align-items-center'>
            <h2 className='text-danger fw-bold '>401</h2>
            <h4 className='text-warning fw-semibold'>Unauthorized Access</h4>
            <p className='text-dark'>Sorry, you don't have permission to view this page</p>
            <Button className='w-50 mt-2' color='orange' onClick={()=>navigate('/')}>Go To Home</Button>
        </div>
    </div>
  )
}
