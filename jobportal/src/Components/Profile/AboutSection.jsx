import { ActionIcon, Textarea, Tooltip } from '@mantine/core'
import { IconCheck, IconPencil, IconX } from '@tabler/icons-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeProfile } from '../../Slices/ProfileSlice';
import { successNotification } from '../../Services/NotificationService';
import labels from '../../Labels/ProfileLabel.json';
export default function AboutSection() {
    // const select=fields;
    const dispatch = useDispatch();
    const [edit, setEdit] = React.useState(false);
    const [about, setAbout] = useState('');

    const profile = useSelector((state) => state.profile);

    const handleEdit = () => {
        if (!edit) {
            setEdit(true);
            setAbout(profile.about)
        } else
            setEdit(false);
    }
    const handleSave = () => {
        handleEdit();
        let updatedProfile = { ...profile, about: about }
        dispatch(changeProfile(updatedProfile))
        successNotification(labels.profilelabel.success, labels.aboutLabels.successMessage)

    };

    return (
        <div>
            <div className="fw-bold mb-3 d-flex justify-content-between">
            {labels.aboutLabels.title}
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
                    <Textarea
                        className="form-control"
                        autosize
                        name='about'
                        value={about || ""}
                        placeholder="Enter about yourself..."
                        onChange={(e) => setAbout(e.currentTarget.value)}
                    ></Textarea>
                </>
            ) : (
                <div>{profile.about}</div>
            )}</div>
    )
}
