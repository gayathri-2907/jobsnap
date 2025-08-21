import { Avatar, Divider } from '@mantine/core'
import { IconMapPin } from '@tabler/icons-react'
import React from 'react'
import { Tabs } from '@mantine/core';
import './CompanyPage.css'
import AboutCompany from './AboutCompany';
import CompanyJobs from './CompanyJobs';
import CompanyEmployees from './CompanyEmployees';
import { useParams } from 'react-router-dom';

export default function Company(props) {
    const {companyName}=useParams();
    const defaultImage = '/Assests/images/CompanyImage.jpg';

    // Path for company logo, fallback to default image
    const companyImage = `/Assests/Icons/${companyName}.png`;
    return (
        <div className="m-3 w-75 gap-2 company">
            <div className="position-relative banner">
                {/* Profile Banner */}
                <img
                    className="rounded-3 w-100" 
                    src='/Assests/images/profilebanner.avif'
                    alt="Profile Banner"
                    style={{
                        height: '150px', 
                        objectFit: 'cover',
                    }}
                />

                {/* Avatar */}
                <img
                    className="position-absolute rounded-4"
                    src={companyImage}
                    onError={(e) => e.target.src = defaultImage}
                    alt={companyName}
                    style={{
                        width: '100px',
                        height: '100px',
                        border: "1px solid orange",
                        background: "lightgrey",
                        top: '40%',
                        left: '10%',    
                        transform: 'translateX(-50%)',  
                        objectFit: 'cover', 
                    }}
                />
            </div>

            <div className="px-3 mt-4 w-100 company-details">
                {/* Name and Message Button */}
                <div className="fw-semibold fs-4 d-flex justify-content-between align-items-center company-data">
                    <div>{companyName}</div>
                    <Avatar.Group>
                        <Avatar src='/Assests/images/avatar.png' />
                        <Avatar src='/Assests/images/avatar1.png' />
                        <Avatar src='/Assests/images/avatar.png' />
                        <Avatar>+10</Avatar>
                    </Avatar.Group>
                </div>
                {/* Location */}
                <div className="d-flex gap-1 align-items-center mt-1 company-data">
                    <IconMapPin className="h-5 w-5" stroke={1.5} /> Bangalore, Karnataka
                </div>
            </div>

            {/* Divider */}
            <Divider my="xl" className="w-100" />
            <div className='w-100 m-2'>
                <Tabs variant="outline" radius='md' defaultValue="about">
                    <Tabs.List className='fw-semibold gap-1 mb-3'>
                        <Tabs.Tab value="about" className='square rounded-1'>About</Tabs.Tab>
                        <Tabs.Tab value="Jobs" className='square rounded-1'>Jobs</Tabs.Tab>
                        <Tabs.Tab value="employees" className='square rounded-1'>Employees</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="about"><AboutCompany/></Tabs.Panel>
                    <Tabs.Panel value="Jobs"><CompanyJobs/></Tabs.Panel>
                    <Tabs.Panel value="employees"><CompanyEmployees/></Tabs.Panel>
                </Tabs>
            </div>
        </div>
    );
}
