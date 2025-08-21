import { ActionIcon, TagsInput, Tooltip } from '@mantine/core';
import { IconCheck, IconPencil, IconX } from '@tabler/icons-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeProfile } from '../../Slices/ProfileSlice';
import { successNotification } from '../../Services/NotificationService';
import labels from '../../Labels/ProfileLabel.json'
export default function Skills() {
        const dispatch = useDispatch();
        const [skills, addSkills] = useState([]);
        const [edit,setEdit] = useState(false);
        const profile=useSelector((state) => state.profile);
        const handleEdit=()=>{
            if(!edit){
                setEdit(true);
                addSkills(profile.skills)
               }else
               setEdit(false);
            }
            const handleSave=()=>{
                handleEdit();
                let updatedProfile={...profile,skills:skills}
                dispatch(changeProfile(updatedProfile))
                successNotification(labels.profilelabel.success, labels.skillsLabels.successMessage);
            }
  return (
    <div>
        <div className="fw-bold mb-3 d-flex justify-content-between">
                    {labels.skillsLabels.title}
                   <div>
                                       {edit && (
                                           <Tooltip label="Save" withArrow position="top-center" color="#ffa520" className="text-black">
                                               <ActionIcon onClick={handleSave} color="orange" variant="subtle">
                                                   <IconCheck color="green" />
                                               </ActionIcon>
                                           </Tooltip>
                                       )}
                                       <Tooltip label={edit ? "Cancel" : "Edit"} withArrow position="top-center" color="#ffa520" className="text-black">
                                           <ActionIcon onClick={handleEdit} color="orange" variant="subtle">
                                               {edit ? <IconX color="red" /> : <IconPencil stroke={1.5} color='orange' />}
                                           </ActionIcon>
                                       </Tooltip>
                                   </div>
                </div>
                {edit ? (
                    <>
                        <TagsInput
                            value={skills||""}
                            name='skills'
                            onChange={addSkills}
                            placeholder="Add your skills"
                            splitChars={[',', '', '|']}
                        ></TagsInput>
                    </>
                ) : (
                    <div className="d-flex flex-wrap gap-2">
                        {profile?.skills?.map((skill, index) => (
                            <div key={index} className="square rounded-3 bg-warning p-1">
                                {skill}
                            </div>
                        ))}
                    </div>
                )}
    </div>
  )
}
