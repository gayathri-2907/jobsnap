import React from 'react';
import { IconHome,} from '@tabler/icons-react';
import SignUpContent from '../Components/SignUpLogin/SignUpContent';
import Login from '../Components/SignUpLogin/Login';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Tooltip } from '@mantine/core';
import '../Components/SignUpLogin/Signup.css';

export default function SignUp() {
  const location = useLocation();
  const navigate = useNavigate();


if (location.pathname === "/sign-up"){
  localStorage.setItem("count", 1);
}

  const handleRemoveCount = () => {
    localStorage.clear();
    navigate("/")
  }

  const count = localStorage.getItem("count");

  return (
    <div className='mb-2 d-flex position-relative SignUpPage overflow-hidden' style={{ height: "auto", width: "auto" }}>
      <Tooltip label="Home" withArrow position="top-center" color="#ffa520" className='text-black' >
      <Button
        color="black"
        className="position-absolute"
        m="xs"
        pr="1"
        onClick={handleRemoveCount}
        leftSection={<IconHome size={30} color="black" />}
        variant="light"
        style={{ zIndex: 10 }}
      />
    </Tooltip>
      <div className={`d-flex sign-up-container ${location.pathname === '/sign-up' ?  "slide-in": Number(count) === 1 ? "slide-out-active" : "slide-out" }`}>
        <Login />
        <div className={` separation-block ${location.pathname === '/sign-up' ? "curve-out-right" : "curve-out-left"} d-flex flex-column gap-2 align-items-center justify-content-center`}>
          <div className='d-flex align-items-center'>
            <img src='/Assests/images/JobSnapName.png' alt='' className='w-100 image-animation' stroke={1.5}  />
            </div>
          <div className='fs-5 fw-bold image-animation login'>Find your dream job today!</div>
        </div>
        <SignUpContent />
      </div>
    </div>
  );
}


