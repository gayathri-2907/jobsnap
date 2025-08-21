import { Divider } from '@mantine/core';
import React from 'react';
import ApplicationForm from './ApplicationForm'
import { timeAgo } from '../../Services/Utilities';
export default function ApplyJob(props) {
  const defaultImage = '/Assests/images/CompanyImage.jpg';

  // Path for company logo, fallback to default image
  const companyImage = `/Assests/Icons/${props.company}.png`;
  return (
    
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-md-6 mx-auto">
            <div className="d-flex flex-column justify-content-between">
              <div className="d-flex gap-2 align-items-center">
                <div className="p-2 bg-secondary rounded-3">
                <img
                            style={{ width: "50px", height: "50px" }}
                            src={companyImage}
                            onError={(e) => e.target.src = defaultImage}
                            alt={props.company}
                        />
                </div>
                <div className="d-flex flex-column gap-1">
                  <div className="fw-semibold fs-4">{props.jobTitle}</div>
                  <div className="fs-6">
                    {props.company} &#x2022; {timeAgo(props.postTime)} &#x2022; {props.applicants?props.applicants.length:0} Applicants
                  </div>
                </div>
              </div>
              <Divider my="xl" />
              <ApplicationForm/>
            </div>
          </div>
        </div>
      </div>
    
  );
}
