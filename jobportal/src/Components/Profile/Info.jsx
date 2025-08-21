import React, { useState } from 'react'
import { fields } from '../../Data/ProfileInfo'
import { ActionIcon, NumberInput, Tooltip } from '@mantine/core';
import { IconBriefcase, IconBriefcaseFilled, IconBuildings, IconCheck,  IconMapPin, IconPencil, IconX } from '@tabler/icons-react';
import { SelectInput } from './SelectInput';
import { useForm } from '@mantine/form'
import { useDispatch, useSelector } from 'react-redux';
import { changeProfile } from '../../Slices/ProfileSlice';
import { successNotification } from '../../Services/NotificationService';
export default function Info() {
    const select = fields;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const profile = useSelector((state) => state.profile);
    const [edit, setEdit] = useState(false);

    
    const handleEdit = () => {

        if (!edit) {
            setEdit(true);
            form.setValues({ jobTitle: profile.jobTitle, company: profile.company, location: profile.location,totalExperience: profile.totalExperience })
        } else
            setEdit(false);
    }
    const form = useForm({
        mode: 'controlled',
        initialValues: {
            jobTitle: profile.jobTitle || "", 
            company: profile.company || "",    
            location: profile.location || "",
            totalExperience: profile.totalExperience ||""
        }
    });


    const handleSave = () => {
        handleEdit();
        let updatedProfile = { ...profile, ...form.getValues() }
        dispatch(changeProfile(updatedProfile))
        successNotification("Success", "Profile Info Updated successfully")
    }
    return (
        <div className="w-100">
            <div className="mb-2 d-flex fw-bold fs-3 justify-content-between">{user.userName}
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
                            {edit ? <IconX color="red" /> : <IconPencil stroke={2} color='orange' />}
                        </ActionIcon>
                    </Tooltip>
                </div>
            </div>
            {edit ? (
                <div>
                    <div className="d-flex gap-2 p-2">
                        <SelectInput form={form} name="jobTitle"  {...select[0]} />
                        <SelectInput form={form} name="company" {...select[1]} />
                    <SelectInput form={form} name="location" {...select[2]} />
                    <NumberInput label="Experience" withAsterisk hideControls placeholder='Enter Experience in years' clampBehavior='strict' min={1} max={50} {...form.getInputProps('totalExperience')}/>
                    </div>
                </div>
            ) : (
                <>
                    <div className='d-flex mb-3 gap-3'>
                        <IconBriefcase /> {profile.jobTitle} &bull; <IconBuildings />{profile.company}
                    </div>
                    <div className='d-flex gap-2'>
                        <IconMapPin  stroke={1.5} /> {profile.location} &bull;<IconBriefcaseFilled/> Experience: {profile.totalExperience} years
                    </div>
                </>
            )}
        </div>
    )
}
