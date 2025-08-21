import { ActionIcon, Tooltip } from '@mantine/core';
import { IconPencil, IconPlus, IconX } from '@tabler/icons-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import CertificateCard from './CertificateCard';
import CertificateInput from './CertificateInput';
import labels from '../../Labels/ProfileLabel.json'
export default function Certification() {
    const profile = useSelector((state) => state.profile);
    const [edit, setEdit] = useState(false);
    const [addCertification, setAddCertification] = useState(false);
    const handleEdit = () => {
        setEdit(!edit);
    }
    return (
        <div>
            <div className="px-3">
                <div className="fw-bold mb-3 d-flex justify-content-between">
                    {labels.certificationLabels.title}
                    <div>
                    <Tooltip label="Add" withArrow position="top-center" color="#ffa520" className="text-black">
                        <ActionIcon onClick={() => setAddCertification(true)} color="orange" variant="subtle">
                            <IconPlus stroke={1.8} color='orange' />
                        </ActionIcon>
                            </Tooltip>
                        <Tooltip label={edit ? "Cancel" : "Edit"} withArrow position="top-center" color="#ffa520" className="text-black">
                            <ActionIcon onClick={handleEdit} color="orange" variant="subtle">
                                {edit ? <IconX color="red" /> : <IconPencil stroke={1.5} color='orange' />}
                            </ActionIcon>
                        </Tooltip>
                    </div>
                </div>
                {profile?.certifications?.map((certification, index) => (
                    <CertificateCard key={index} index={index} edit={edit} {...certification} />
                ))}
                {addCertification && <CertificateInput add setEdit={setAddCertification} />}
            </div>
        </div>
    )
}
