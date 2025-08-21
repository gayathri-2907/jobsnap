import { ActionIcon, Divider, Button } from '@mantine/core'
import { IconBookmark, IconBookmarkFilled } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { Link,  } from 'react-router-dom'
import { card } from '../../Data/JobDescriptionData'
import DOMPurify from 'dompurify';
import { timeAgo } from '../../Services/Utilities'
import './RecommendedJob.css'
import { useDispatch, useSelector } from 'react-redux'
import { changeProfile } from '../../Slices/ProfileSlice'
import { jobPosting } from '../../Services/JobService'
import { errorNotification, successNotification } from '../../Services/NotificationService'
import labels from '../../Labels/JobLabel.json'
export default function JobDescription(props) {
    const dispatch = useDispatch();
    const [applied, setApplied] = useState(false);
    const profile = useSelector((state) => state.profile);
    const user = useSelector((state) => state.user);
    // const navigate = useNavigate();

    const data = DOMPurify.sanitize(props.description);
    // const handleCompanyPage = () => {
    //     navigate(`/company-page/${props.company}`);
    //     window.scrollTo(0, 0);
    // }
    const handleSaveJob = () => {
        let savedJobs = profile.savedJobs || [];

        if (savedJobs?.includes(props.id)) {
            savedJobs = savedJobs?.filter((id) => id !== props.id);
        } else {
            savedJobs = [...savedJobs, props.id];
        }
        let updatedProfile = { ...profile, savedJobs: savedJobs };
        dispatch(changeProfile(updatedProfile));
    }

    useEffect(() => {
        if (props.applicants?.filter((applicant) => applicant.email === user.userEmail).length > 0) {
            setApplied(true);
        } else {
            setApplied(false);
        }
    }, [props, user.userEmail]);

    const handleClose = () => {
        jobPosting({ ...props, jobStatus: "CLOSED" }).then((res) => {
            successNotification("Success", "Job closed successfully")
        }).catch((error) => {
            errorNotification("Error", error.response.data.errorMessage)
        })
    }
    const defaultImage = '/Assests/images/CompanyImage.jpg';

    // Path for company logo, fallback to default image
    const companyImage = `/Assests/Icons/${props.company}.png`;
    return (
        <div className='w-100 m-3'>
            <div className='d-flex justify-content-between'>
                <div className='d-flex'>
                    <div className='p-1 square rounded-3'>
                        <img
                            style={{ width: "50px", height: "50px" }}
                            src={companyImage}
                            onError={(e) => e.target.src = defaultImage}
                            alt={props.company}
                        />
                    </div>
                    <div>
                        <div className='fw-semibold fs-4 '>{props.jobTitle}</div>
                        <div className='Applicant-count fs-6.5 '>{props.company} &#x2022; {timeAgo(props.postTime)} &#x2022; {props.applicants ? props.applicants.length : 0} Applicants</div>
                    </div>
                </div>
                <div className='d-flex gap-2'>
                    {(props.edit || !applied) && <Link to={props.edit ? `/post-job/${props.id}` : `/apply-job/${props.id}`}>
                        <Button color='#ffa500' className='square rounded-2 m-2 p-2 w-100 '>{props.closed ? "Re-open" : props.edit ? "Edit" : "Apply"}</Button>
                    </Link>}
                    {
                        !props.edit && applied && <Button color='green' className='square rounded-2 fs-7 p-2 border ' variant='light'>Applied</Button>
                    }
                    {props.edit && !props.closed ? <Button color='red' className='square rounded-2 p-2 m-2 w-100' onClick={handleClose} variant='outline'>Close</Button>
                        : profile.savedJobs?.includes(props.id) ? <IconBookmarkFilled className='bookmark m-2' onClick={handleSaveJob} stroke={1.5} /> :
                            <IconBookmark onClick={handleSaveJob} className="bookmark m-2" stroke={1.5} />}
                </div>
            </div>
            <Divider my="xl" />
            <div className='m-2 d-flex flex-row justify-content-around'>
                {
                    card.map((item, index) => <div key={index} className='d-flex flex-column align-items-center gap-1'>
                        <ActionIcon className='p-7' variant="light" color="orange" aria-label="Settings">
                            <item.icon className='h-100 w-100' stroke={1.5} />
                        </ActionIcon>
                        <div className='fs-8'>{item.name}</div>
                        <div className='fw-semibold'>{props ? props[item.id] : "NA"}{item.id === "packageOffered" && <> LPA</>}</div>
                    </div>)
                }
            </div>
            <Divider my="xl" />
            <div className='m-2'>
                <div className='fw-bold fs-4 mb-3'>{labels.labels.jobDescription.requiredSkills}</div>
                <div className='p-2'>
                    {
                        props?.skillsRequired?.map((skill, index) =>
                            <ActionIcon key={index} style={{ width: "90px", border: "1px solid orange" }} className='m-2 p-3 square rounded-pill fw-semibold' variant="light" color="orange" aria-label="Settings">
                                {skill}
                            </ActionIcon>
                        )}
                </div>
            </div>
            <Divider my="xl" p="2" />
            <div className='m-2 d-flex flex-column align-items-start' style={{ justifyContent: 'center', textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: data }}>
            </div>
            <Divider my="xl" />
            <div>
                <div className='fw-bold fs-4 mb-5 m-2 '>{labels.labels.jobDescription.aboutCompany}</div>
                <div className='d-flex flex-column'>
                    <div className='d-flex justify-content-between'>
                        <div className='p-1 square rounded-3 d-flex gap-2'>
                            <img
                                style={{ width: "50px", height: "50px" }}

                                src={companyImage}
                                onError={(e) => e.target.src = defaultImage}
                                alt={props.company}
                            />
                            <div>
                                <div className='fw-semibold fs-4 '>{props.company}</div>
                                <div className='Applicant-count fs-6.5 '>10k+ Employees</div>
                            </div>
                        </div>

                        {/* <div>
                            <Button color='#ffa500' className='square rounded-2 fs-7 p-2 m-2' onClick={handleCompanyPage}>Company Page</Button>
                        </div> */}
                    </div>
                    {/* <div className='mt-3' style={{ justifyContent: 'center', textAlign: 'justify' }} >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div> */}
                </div>
            </div>
        </div>
    )

}
