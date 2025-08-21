// import { IconBriefcaseFilled,  IconCalendarMonth, IconClock, IconMapPin } from '@tabler/icons-react'
// import React, { useEffect, useRef, useState } from 'react'
// import './TalentPage.css'
// import { Button, Divider, Modal, Text } from '@mantine/core';
// import { Link, useParams } from 'react-router-dom'
// import { useDisclosure } from '@mantine/hooks';
// import { DateInput, TimeInput } from '@mantine/dates';
// import { getProfileByEmail, } from '../../Services/ProfileService';
// import { changeApplicationStatus } from '../../Services/JobService';
// import { errorNotification, successNotification } from '../../Services/NotificationService';
// import { formatInterviewTime, openBase64PDF } from '../../Services/Utilities';
// import labels from '../../Labels/TalentLabel.json'
// import commonLabels from '../../Labels/Labels.json'
// export default function TalentCard(props) {
  //   const [opened, { open, close }] = useDisclosure(false);
  //   const [app,{open:openApp,close:closeApp}] = useDisclosure(false);
  //   const [date,setDate]=useState(null);
  //   const [time,setTime]=useState(null);
  //   const [profile,setProfile]=useState({});
  //   const {id}=useParams();
  //   useEffect(() => {
    //     if(props.email){
      //       getProfileByEmail(props.email).then((res)=>{
        //       setProfile(res.data);
        //     }).catch((error)=>{
          //       console.log(error)
          //     })}
          //     else{
//       setProfile(props)
//     }
//     //eslint-disable-next-line
//   }, [props.profileId]);
//   const ref=useRef(null);

//   const handleOffer = (status) => {
  //     const email = profile?.email;
  //     if (!email) {
    //         console.error(labels.errors.email);
//         return;
//     }

//     let interview = { id, email, applicationStatus: status };
//     if (status === "INTERVIEWING") {
  //         if (!time) {
    //             console.error(labels.errors.time);
    //             return;
    //         }
    
    //         const [hours, minutes] = time.split(":").map(Number);
    //         if (isNaN(hours) || isNaN(minutes)) {
//             console.error(labels.errors.invalidTimeFormat);
//             return;
//         }

//         if (!date) {
  //             console.error(labels.errors.date);
  //             return;
  //         }
  
  //         date.setHours(hours, minutes);
  //         interview = { ...interview, interviewTime: date };
  //     }
  
  //     changeApplicationStatus(interview)
  //         .then((res) => {
    //             if (status === "INTERVIEWING") {
      //               successNotification(labels.labels.interviewScheduled, labels.labels.interviewScheduledSuccessfully);
      //             } else if (status === "OFFERED") {
        //               successNotification(labels.labels.offered, labels.labels.offerSentSuccessfully);
//             } else if (status === "REJECTED") {
  //               successNotification(labels.labels.rejected, labels.labels.applicantRejected);
  //             }
  //             setProfile((prevProfile) => ({ ...prevProfile, applicationStatus: status }));
  //             window.location.reload();
  //         })
  //         .catch((error) => {
    //           const errorMessage = error.response?.data?.errorMessage || labels.labels.failedToScheduleInterview;
    //           errorNotification(labels.labels.failedToScheduleInterview, errorMessage);
    //         });
    // };

    
//   return (
  //     <div className='d-flex flex-column gap-1 talentCard mt-3 p-2'>
  //       <div className='d-flex justify-content-between p-2 flex-wrap'>
  //         <div className='d-flex align-items-center gap-1'>
  //           <div>
  //             <img
  //             className='square rounded-4 me-2'
  //               style={{ width: "auto", height: "60px" }}
  //               src={
    //               profile?.profilePicture
    //                 ? `data:image/jpeg;base64,${profile?.profilePicture}`
    //                 : '/Assests/images/profileavatar.png'
    //             }alt=''></img>
    //           </div>
    //           <div>
    //             <div className='fw-semibold fs-5 '>{profile?.name}</div>
    //             <div> {profile?.jobTitle} &#x2022; {profile?.company}</div>
//           </div>
//         </div>
//       </div>
//       <div className='d-flex gap-2 justify-content-center p-2 talentCard-requirements'>
//         {
  //           profile?.skills?.map((skills, index) =>
    //             <div key={index}>{skills}</div>)
  //         }
  //       </div>
  //       <Text size='xs' lineClamp={5} className='talentCard-description'> {profile?.about}</Text>
  //       <Divider size="xs" color='lightgrey' className='m-2' />
  //       {
    //         props.invited?<div className='d-flex gap-1 m-2 align-items-center fw-semibold'>
    //           <IconCalendarMonth stroke={1.5}/>{labels.labels.interview} : {formatInterviewTime(props.interviewTime)}
    //         </div>:
    //       <div className='d-flex justify-content-around'>
    //         <div>
    //           <IconBriefcaseFilled color='orange'/>{labels.labels.experience}:{profile?.totalExperience} years
    //         </div>
    //         <div >
    //           <IconMapPin stroke={1.5} color='orange' />{profile?.location}</div>
    //       </div>
    //       }
    //       <Divider size="xs" color='lightgrey' className='m-2' />
    //       <div className='d-flex justify-content-center m-1 mb-2'>
    //       {
      //         !props.invited&&<>
      //         <Link to={`/talent-profile/${profile?.profileId}`}>
      //           <Button className='fw-bold text-center' color='orange' variant='filled' >{labels.labels.profile}</Button>
      //         </Link>
      //         <div >
      //           {props.posted ? <Button onClick={open} rightSection={<IconCalendarMonth />} color='black' className='' variant='light' fullWidth>Schedule</Button> : null}
      //         </div>
      //         </>
      //       }
//       {
  //         props.invited &&
  //           <div className='d-flex gap-3'>
  //           <Button variant='outline'  color='#ffa500' onClick={()=>handleOffer("OFFERED")}>{commonLabels.buttons.accept}</Button>
  //           <Button  variant='outline'  color='#ffa500' onClick={()=>handleOffer("REJECTED")}>{commonLabels.buttons.reject}</Button>
  //           </div>
  //       }
  //       </div>
  //       {
    //         (props.invited|| props.posted) &&
//         <Button color='#ffa550' variant='filled' fullWidth onClick={openApp} autoContrast >{labels.labels.viewApplication}</Button>
//       }
//       <Modal opened={opened} onClose={close} title="Schedule Interview" centered>
//         <div className='d-flex flex-column gap-4'>
//           <DateInput value={date||""} minDate={new Date()} onChange={setDate} label="Date" placeholder={labels.placeholders.enterDate} />
//           <TimeInput leftSection={<IconClock/>} label="Time" value={time||""} onChange={(event)=>setTime(event.currentTarget.value)} ref={ref} onClick={()=>ref.current?.showPicker()}/>
//           <Button color='orange' onClick={()=>handleOffer("INTERVIEWING")} variant='light' fullWidth>Schedule</Button>
//         </div>
//       </Modal>

//       <Modal opened={app} onClose={closeApp} title="Application" centered>
//         <div className='d-flex flex-column gap-4'>
//           <div >
//             {labels.labels.email}:&emsp;<a className='text-center text-warning text-decoration-none cursor-pointer viewapplication-popup' href={`mailto:${props.email}`}>{props.email}</a>
//           </div>
//           <div>
//             {labels.labels.website}:&emsp;<a target='_blank' className='text-center text-warning text-decoration-none viewapplication-popup cursor-pointer' href={props.website} rel="noreferrer">{props.website}</a>
//           </div>
//           <div>
//             {labels.labels.resume}:&emsp;<span className='text-center text-warning text-decoration-none viewapplication-popup cursor-pointer' onClick={()=>openBase64PDF(props.resume)}>{props.name}</span>
//           </div>
//           <div>
//             {labels.labels.coverLetter}:&emsp;<div>{props.coverLetter}</div>
//         </div>
//         </div>
//       </Modal>
//     </div>
//   )
// }





import React from "react";
import { IconBriefcaseFilled, IconCalendarMonth, IconClock, IconMapPin } from '@tabler/icons-react';
import { Button, Modal } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { DateInput, TimeInput } from '@mantine/dates';
import { getProfileByEmail } from '../../Services/ProfileService';
import { changeApplicationStatus } from '../../Services/JobService';
import { errorNotification, successNotification } from '../../Services/NotificationService';
import { formatInterviewTime, openBase64PDF } from '../../Services/Utilities';
import labels from '../../Labels/TalentLabel.json';
import commonLabels from '../../Labels/Labels.json';
import './TalentPage.css'

const TalentCard = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [app, { open: openApp, close: closeApp }] = useDisclosure(false);
  const [date, setDate] = React.useState(null);
  const [time, setTime] = React.useState(null);
  const [profile, setProfile] = React.useState({});
  const { id } = useParams();
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (props.email) {
      getProfileByEmail(props.email).then((res) => {
        setProfile(res.data);
      }).catch((error) => {
        console.log(error)
      })
    } else {
      setProfile(props)
    }
    // eslint-disable-next-line
  }, [props.profileId]);

  const handleOffer = (status) => {
    const email = profile?.email;
    if (!email) {
      console.error(labels.errors.email);
      return;
    }

    let interview = { id, email, applicationStatus: status };
    if (status === "INTERVIEWING") {
      if (!time) {
        console.error(labels.errors.time);
        return;
      }

      const [hours, minutes] = time.split(":").map(Number);
      if (isNaN(hours) || isNaN(minutes)) {
        console.error(labels.errors.invalidTimeFormat);
        return;
      }

      if (!date) {
        console.error(labels.errors.date);
        return;
      }

      date.setHours(hours, minutes);
      interview = { ...interview, interviewTime: date };
    }

    changeApplicationStatus(interview)
      .then((res) => {
        if (status === "INTERVIEWING") {
          successNotification(labels.labels.interviewScheduled, labels.labels.interviewScheduledSuccessfully);
        } else if (status === "OFFERED") {
          successNotification(labels.labels.offered, labels.labels.offerSentSuccessfully);
        } else if (status === "REJECTED") {
          successNotification(labels.labels.rejected, labels.labels.applicantRejected);
        }
        setProfile((prevProfile) => ({ ...prevProfile, applicationStatus: status }));
        window.location.reload();
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.errorMessage || labels.labels.failedToScheduleInterview;
        errorNotification(labels.labels.failedToScheduleInterview, errorMessage);
      });
  };

  return (
    <div className="talent-card">
      <div className="header">
        <img
          src={
            profile?.profilePicture
              ? `data:image/jpeg;base64,${profile?.profilePicture}`
              : '/Assests/images/profileavatar.png'
          }
          alt={profile?.name}
          className="profile-image"
        />
      </div>
      <div className="content">
        <h2 className="name">{profile?.name}</h2>
        <p className="username">{profile?.jobTitle} • {profile?.company}</p>
        <div className="social-icons">
          {profile?.skills?.map((skill, index) =>
            <span key={index} className="skills-tags">{skill}</span>
          )}
        </div>
        <div className="profile-bottom">
          <p className="profile-desc">{profile?.about}</p>
          <p className="profile-text">
            <span><IconBriefcaseFilled stroke={1.5} color="orange" />Experience: {profile?.totalExperience} years</span>
            <span><IconMapPin color="orange"/>{profile?.location}</span>
          </p>
          {props.invited ? (
            <div className='d-flex gap-1 m-2 align-items-center fw-semibold'>
              <IconCalendarMonth stroke={1.5} /> {labels.labels.interview} : {formatInterviewTime(props.interviewTime)}
            </div>
          ) : null}
          <div className="button-container">
            {!props.invited && (
              <>
                <Link to={`/talent-profile/${profile?.profileId}`}>
                  <Button className="profile-button" color='orange' variant='filled'>{labels.labels.profile}</Button>
                </Link>
                {props.posted && (
                  <Button onClick={open} rightSection={<IconCalendarMonth />} color='black' className='schedule-button' variant='light'>{labels.labels.schedule}</Button>
                )}
              </>
            )}
            {props.invited && (
              <div className='d-flex gap-3'>
                <Button variant='outline' color='#ffa500' onClick={() => handleOffer("OFFERED")}>Offer</Button>
                <Button variant='outline' color='#ffa500' onClick={() => handleOffer("REJECTED")}>{commonLabels.buttons.reject}</Button>
              </div>
            )}
          </div>
          {(props.invited || props.posted) && (
            <Button color='#ffa550' className="m-2" variant='filled' fullWidth onClick={openApp} >{labels.labels.viewApplication}</Button>
          )}
        </div>
      </div>
      <Modal opened={opened} onClose={close} title="Schedule Interview" centered>
        <div className='d-flex flex-column gap-4'>
          <DateInput value={date || ""} minDate={new Date()} onChange={setDate} label="Date" placeholder={labels.placeholders.enterDate} />
          <TimeInput leftSection={<IconClock />} label="Time" value={time || ""} onChange={(event) => setTime(event.currentTarget.value)} ref={ref} onClick={() => ref.current?.showPicker()} />
          <Button color='orange' onClick={() => handleOffer("INTERVIEWING")} variant='light' fullWidth>{labels.labels.schedule}</Button>
        </div>
      </Modal>

      <Modal opened={app} onClose={closeApp} title="Application" centered>
        <div className='d-flex flex-column gap-4'>
          <div>
            {labels.labels.email}:&emsp;<a className='text-center text-warning text-decoration-none cursor-pointer viewapplication-popup' href={`mailto:${props.email}`}>{props.email}</a>
          </div>
          <div>
            {labels.labels.website}:&emsp;<a target='_blank' className='text-center text-warning text-decoration-none viewapplication-popup cursor-pointer' href={props.website} rel="noreferrer">{props.website}</a>
          </div>
          <div>
            {labels.labels.resume}:&emsp;<span className='text-center text-warning text-decoration-none viewapplication-popup cursor-pointer' onClick={() => openBase64PDF(props.resume)}>{props.name}</span>
          </div>
          <div>
            {labels.labels.coverLetter}:&emsp;<div>{props.coverLetter}</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TalentCard;