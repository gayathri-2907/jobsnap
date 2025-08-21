import React, {  } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';
import '../NavLinks.css'; 
import labels from '../../Labels/LandingPageLabel.json';
export default function NavLinks() {
    const links = [
        { name: labels.navLinksLabels.findJobs, href: "find-jobs" },
        { name: labels.navLinksLabels.findTalent, href: "find-talent" },
        { name: labels.navLinksLabels.postJob, href: "post-job/0" },
        { name: labels.navLinksLabels.postedJob, href: "posted-job/0" },
        { name: labels.navLinksLabels.jobHistory, href: "job-history" },
    ];
    const location = useLocation();

    return (
        <div>
            <Nav className="d-flex ms-auto m-2 gap-1 h-full items-center">
                {
                    links.map((link, index) => (
                        <div
                            key={index}
                            className={`h-full d-flex flex-column justify-center items-center`}
                        >
                            <Link 
                                to={`/${link.href}`} 
                                className={`nav-link text-center py-2 px-3 transition-all ${location.pathname.includes(link.href) ? 'active' : ''}`} 
                            >
                                {link.name}
                            </Link>
                        </div>
                    ))
                }
            </Nav>
        </div>
    );
}
