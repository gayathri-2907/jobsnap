import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Info from './Info';
import { changeProfile,} from '../../Slices/ProfileSlice';
import AboutSection from './AboutSection';
import Skills from './Skills';
import Experience from './Experience';
import Certification from './Certification';
import { Avatar, Divider, FileInput, Overlay } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { successNotification } from '../../Services/NotificationService';
import { getBase64 } from '../../Services/Utilities';
import labels from '../../Labels/ProfileLabel.json';

export default function Profile() {
    const dispatch = useDispatch();
   
    const profile = useSelector((state) => state.profile);
    const [hovered, setHovered] = useState(false);

    const handleFileChange = async (image) => {
        if (!image) {
            console.log("No file selected");
            return;
        }
        let picture = await getBase64(image);
        let updatedProfile = { ...profile };
        if (picture) {
            updatedProfile.profilePicture = picture.split(',')[1];
        } else {
            updatedProfile.profilePicture = null; 
        }
        dispatch(changeProfile(updatedProfile));
        successNotification(labels.profilelabel.success, labels.profilelabel.successMessage);
    };

    

    // Trigger FileInput click when IconEdit is clicked
    const triggerFileInput = () => {
        document.getElementById('file-input').click();
    };

    return (
        <div id='profile-container' style={{ marginLeft: '10%', width: '70vw' }}>
            <div className="position-relative">
                <img
                    className="square rounded-3 w-100"
                    style={{ height: '150px' }}
                    src='/Assests/images/profilebanner.avif'
                    alt="Profile Banner"
                />
                <div
                    className="position-absolute d-flex align-items-center justify-content-center"
                    style={{ top: '60px', left: '50px' }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    {/* Avatar */}
                    <Avatar
                        className="square rounded-pill"
                        src={profile.profilePicture ? `data:image/jpeg;base64,${profile.profilePicture}` : '/Assests/images/profileavatar.png'}
                        alt="Avatar"
                        style={{
                            width: '130px',
                            height: '130px',
                            position: 'relative',
                            zIndex: 201,
                        }}
                    />
                    {/* Overlay and Edit Icon visible on hover */}
                    {hovered && (
                        <>
                            <Overlay
                                className="square rounded-pill"
                                color="#000"
                                backgroundOpacity={0.55}
                                zIndex={203}
                            />
                            <IconEdit
                                className="position-absolute"
                                color="orange"
                                size={35}
                                style={{
                                    bottom: '50px', 
                                    right: '40px', 
                                    zIndex: 300,
                                    cursor: 'pointer',
                                }}
                                onClick={triggerFileInput}  
                            />
                        </>
                    )}
                    {/* Hidden FileInput for avatar update */}
                    {hovered && (
                        <FileInput
                            id="file-input" 
                            className="position-absolute"
                            variant="unstyled"
                            size="lg"
                            radius="xl"
                            accept="image/png,image/jpeg"
                            style={{
                                width: '130px',
                                height: '130px',
                                opacity: 0, 
                                zIndex: 200,
                            }}
                            onChange={ handleFileChange} 
                        />
                    )}
                </div>
            </div>

            {/* Profile Info Section */}
            <div className="px-3 mt-5 d-flex">
                <Info />
            </div>
            <Divider mx="xs" my="xl" />

            {/* About Section */}
            <div className="px-3">
                <AboutSection />
            </div>
            <Divider mx="xs" my="xl" />

            {/* Skills Section */}
            <div className="px-3">
                <Skills />
            </div>

            {/* Experience Section */}
            <Divider mx="xs" my="xl" />
            <div className="px-3">
                <Experience />
            </div>

            {/* Certifications Section */}
            <Divider mx="xs" my="xl" />
            <Certification />
        </div>
    );
}
