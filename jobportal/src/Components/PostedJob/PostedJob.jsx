import React, { useEffect, useState } from 'react';
import { Tabs } from '@mantine/core';
import PostedJobCard from './PostedJobCard';
import labels from '../../Labels/JobLabel.json';

export default function PostedJob(props) {
    const [activeTab, setActiveTab] = useState('ACTIVE');

    useEffect(() => {
        setActiveTab(props.job?.jobStatus || 'ACTIVE');
    }, [props.job]);

    // Safely check if props.jobList?.data exists and is an array
    const jobList = Array.isArray(props.jobList?.data) ? props.jobList.data : [];

    return (
        <div className='mt-3 w-25'>
            <div className='fs-3 fw-semibold mt-3'>{labels.labels.postedJob.title}</div>
            <div>
                <Tabs autoContrast variant='pills' value={activeTab} onChange={setActiveTab}>
                    <Tabs.List>
                        
                        <Tabs.Tab value="ACTIVE">
                            {labels.labels.postedJob.tabs.active}[{jobList.filter((job) => job?.jobStatus === 'ACTIVE').length || 0}]
                        </Tabs.Tab>
                        <Tabs.Tab value="DRAFT">
                            {labels.labels.postedJob.tabs.drafts}[{jobList.filter((job) => job?.jobStatus === 'DRAFT').length || 0}]
                        </Tabs.Tab>
                        <Tabs.Tab value="CLOSED">
                            {labels.labels.postedJob.tabs.closed}[{jobList.filter((job) => job?.jobStatus === 'CLOSED').length || 0}]
                        </Tabs.Tab>
                    </Tabs.List>
                    <div className='d-flex flex-column gap-4 mt-3 tabs-outer-container'>
                        {jobList.filter((job) => job?.jobStatus === activeTab).map((item, index) => (
                            <PostedJobCard key={index} {...item} />
                        ))}
                    </div>
                </Tabs>
            </div>
        </div>
    );
}
