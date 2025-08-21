import { ActionIcon, Tooltip } from '@mantine/core';
import { IconPencil, IconPlus, IconX } from '@tabler/icons-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import ExperienceCard from './ExperienceCard';
import ExperienceInput from './ExperienceInput';
import labels from '../../Labels/ProfileLabel.json'

export default function Experience() {

    const [edit, setEdit] = useState(false);
    const [addExperiences, setAddExperiences] = useState(false);
    const profile = useSelector((state) => state.profile);
    const handleEdit = () => {
        setEdit(!edit);
    }
    return (
        <div>
            <div className="fw-bold mb-3 d-flex justify-content-between">
                {labels.experienceLabels.title}
                <div>
                    <Tooltip label="Add" withArrow position="top-center" color="#ffa520" className="text-black">
                        <ActionIcon onClick={() => setAddExperiences(true)} color="orange" variant="subtle">
                            <IconPlus stroke={2} color='orange' />
                        </ActionIcon>
                    </Tooltip>

                    <Tooltip label={edit ? "Cancel" : "Edit"} withArrow position="top-center" color="#ffa520" className="text-black">
                        <ActionIcon onClick={handleEdit} color="orange" variant="subtle">
                            {edit ? <IconX color="red" /> : <IconPencil stroke={1.5} color='orange' />}
                        </ActionIcon>
                    </Tooltip>
                </div>
            </div>
            <div>
                {profile?.experiences?.map((experience, index) => (
                    <ExperienceCard key={index} index={index} {...experience} edit={edit} />
                ))}
                {addExperiences && <ExperienceInput add setEdit={setAddExperiences} />}
            </div>
        </div>
    )
}
