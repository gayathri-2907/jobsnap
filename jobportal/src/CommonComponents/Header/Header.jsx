import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../Header.css';
import { IoClose } from "react-icons/io5";

import NavLinks from './NavLinks';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenu } from './ProfileMenu';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Tooltip } from '@mantine/core';
import { getProfile } from '../../Services/ProfileService';
import { setProfile } from '../../Slices/ProfileSlice';
import NotificationMenu from './NotificationMenu';
import {jwtDecode} from 'jwt-decode';
import { setUser } from '../../Slices/UserSlice';
import { setupResponseInterceptor } from '../../Interceptor/AxiosInterceptor';
import  labels  from '../../Labels/LandingPageLabel.json';
export default function Header() {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.jwt);
  const [expanded, ] = useState(false);
  const [sliderOpen, setSliderOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setupResponseInterceptor(navigate);
  }, [navigate]);

  useEffect(() => {
    if (token !== "") {
      const decoded = jwtDecode(localStorage.getItem("token"));
      dispatch(setUser({ ...decoded, userEmail: decoded.sub }));
    }
    if (user && user.profileId) {
      getProfile(user.profileId)
        .then((data) => {
          dispatch(setProfile(data.data));
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
        });
    }
    //eslint-disable-next-line 
  }, [token, navigate]);
  

  

  const toggleSlider = () => setSliderOpen(!sliderOpen);

  return (
    location.pathname !== "/sign-up" && location.pathname !== "/login" &&
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-dark p-3" expanded={expanded}>
        <Navbar.Brand className="d-flex align-items-center me-5">
          <div className="d-flex flex-row align-items-center me-5" onClick={() => navigate('/')}>
            <img
              src='/Assests/images/JobSnapIcon1.png'
              width="50px"
              height="50px"
              className="d-inline-block align-top"
              alt={labels.headerLabels.logoAlt}
            />
          <Tooltip label={labels.headerLabels.homeTooltip} withArrow position="bottom-center" color='#ffa510' className='text-black'>
            <p className="mb-0 ms-1 text-white fw-bold fs-2 fst-italic">{labels.headerLabels.applicationName}</p>
            </Tooltip>
          </div>
        </Navbar.Brand>
        <div className="d-flex align-items-center ms-auto">
          {!user && (
            <Link to='/login' className="d-lg-none me-2"> {/* Hide on large screens */}
              <Button variant='subtle' style={{ zIndex: "100" }} bg="white" color='black'>{labels.headerLabels.loginButton}</Button>
            </Link>
          )}
          <Navbar.Toggle 
            aria-controls="responsive-navbar-nav"
            onClick={toggleSlider}  
          />
        </div>
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
          <Nav>
            <NavLinks />
          </Nav>
          <Nav className='profile-section me-3'>
            {user ? <ProfileMenu /> : (
              <Link to='/login' className="d-none d-lg-block" > 
                <Button variant='subtle' style={{ zIndex: "100" }} bg="white" color='black'>{labels.headerLabels.loginButton}</Button>
              </Link>
            )}
            {user ? <NotificationMenu /> : null}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {sliderOpen && (
        <div className="navbar-slider-container">
          <div className="navbar-slider">
            <span className="close-slider" onClick={toggleSlider}><IoClose /></span>
            <NavLinks />
          </div>
        </div>
      )}
    </>
  );
}
