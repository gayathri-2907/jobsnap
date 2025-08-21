import React from 'react';
import { companyData } from '../../Data/CompanyData';
export default function AboutCompany() {
    const company = companyData;

    return (
        <div className='d-flex flex-column'>
            {
                Object.keys(company).map((key, index) => {
                    if (key === 'name') return null;

                    const value = company[key];

                    // Check if the value is an object, and render its properties
                    if (typeof value === 'object') {
                        return (
                            <div key={index}>
                                <div>
                                    {Object.keys(value).map((subKey) => (
                                        <div key={subKey} className='mb-3'>
                                            <div className='fs-4 fw-semibold mb-2'>{subKey}:</div>
                                            
                                            {/* Handling Specialties */}
                                            {subKey !== "Website" && (
                                                <div style={{ textAlign: 'justify' }}>
                                                    {subKey !== "Specialties" 
                                                        ? value[subKey] 
                                                        : value[subKey].map((item, idx) => (
                                                            <div  key={idx} style={{ marginBottom: '5px' }}>
                                                                <span>&bull; {item}</span>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            )}

                                            {/* Website Link */}
                                            {subKey === "Website" && (
                                                <a 
                                                    href={value[subKey]} 
                                                    target='_blank' 
                                                    rel='noopener noreferrer' 
                                                    style={{ color: 'orange', textDecoration: 'none' }}
                                                >
                                                    {value[subKey]}
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    }

                    // If it's not an object, just render the value with justification
                    return (
                        <div key={index} className='mb-3'>
                            <div className='fw-semibold mb-2'>{key}</div>
                            <div className='fs-6' style={{ textAlign: 'justify' }}>{value}</div>
                        </div>
                    );
                })
            }
        </div>
    );
}
