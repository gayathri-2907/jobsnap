import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, PasswordInput, TextInput, LoadingOverlay, Tooltip } from '@mantine/core';
import { IconAt, IconLock, IconInfoCircle } from '@tabler/icons-react';
import { loginValidation } from '../../Services/FormValidation';
import { useDisclosure } from '@mantine/hooks';
import ResetPassword from './ResetPassword';
import { useDispatch } from 'react-redux';
import { successNotification, errorNotification } from '../../Services/NotificationService';
import { setUser } from '../../Slices/UserSlice';
import { setJwt } from '../../Slices/JWTSlice';
import { loginUser } from '../../Services/AuthService';
import { jwtDecode } from 'jwt-decode';
import './Signup.css';
import labels from '../../Labels/Labels.json'
const form = {
  userEmail: '',
  userPassword: '',
};

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(form);
  const [formError, setFormError] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    // Validate field on change
    setFormError((prevState) => ({
      ...prevState,
      [name]: loginValidation(name, value),
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    // Clear validation error when field is blurred
    setFormError((prevState) => ({
      ...prevState,
      [name]: '',
    }));
  };

  const handleSubmit = () => {
    setErrorMessage(''); // Reset error message before form validation
    let errors = {};
  
    // Validate all fields before submission
    for (let key in data) {
      if (data[key] === '' || loginValidation(key, data[key])) {
        errors[key] = loginValidation(key, data[key]) || `${key} is required`;
      }
    }
  
    // If no validation errors, proceed to submit the form
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      loginUser(data)
        .then((res) => {
          successNotification(labels.login.default.success, labels.login.default.successMessage);
          setTimeout(() => {
            setLoading(false);
            dispatch(setJwt(res.jwt));
            const decoded = jwtDecode(res.jwt);
            dispatch(setUser({ ...decoded, userEmail: decoded.sub }));
            navigate('/');
          }, 1000);
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
          errorNotification(labels.login.default.failure, error.message); 
          setErrorMessage(error.message);
          setTimeout(() => {
            navigate('/login');
          }, 1000);
        });
    } else {
      setFormError(errors);
    }
  };
  

  return (
    <>
      <LoadingOverlay
        className="position-fixed"
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{
          color: 'orange',
          type: 'bars',
          alignmentBaseline: 'central',
        }}
      />
      <div className="p-5 d-flex flex-column justify-content-center text-black" style={{ width: '50vw' }}>
        <div className="fs-1 p-3 text-center fw-bold login" tabIndex="0">Login</div>

       <div className='d-flex flex-column w-75 p-5 loginfields fw-semibold flip-horizontal'>
       <TextInput
          className="p-3 "
          type="email"
          withAsterisk
          leftSection={<IconAt />}
          label={labels.login.fields.email}
          value={data.userEmail}
          name={labels.login.names.useremail}
          error={formError.userEmail}
          onChange={handleChange}
          onBlur={handleBlur} 
          placeholder={labels.login.placeholders.email}
        />

        <div className='position-relative'>
          <PasswordInput
            type="password"
            className="p-3"
            withAsterisk
            leftSection={<IconLock stroke={1.5} />}
            value={data.userPassword}
            name={labels.login.names.password}
            error={formError.userPassword ? formError.userPassword: ''}
            onChange={handleChange}
            onBlur={handleBlur} 
            label={labels.login.fields.password}
            placeholder={labels.login.placeholders.password}
          />
          
          {formError.userPassword && (
            <Tooltip
              label={
                <>
                  {labels.login.tooltips.password} <br />
                  {labels.login.tooltips.passwordContinuation}
                </>
              }
              withArrow
              position="bottom-middle"
            >
              <div style={{
                position: 'absolute', top: '45px', left: '300px', cursor: 'pointer'
              }}>
                <IconInfoCircle color="red" size={18} />
              </div>
            </Tooltip>
          )}
       </div>

        <Button
          color="orange"
          className="mx-auto mb-3 mt-3 fw-bold"
          variant="filled"
          onClick={handleSubmit}
          loading={loading}
        >
          {labels.buttons.login}
        </Button>

        {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}

        <div className="mx-auto mb-2 text-black fw-semibold">
        {labels.login.default.dontHaveAccount}{' '}
          <span
            className="fw-semibold loginsignupbtn"
            style={{ cursor: 'pointer',color:"darkorange" }}
            onClick={() => {
              navigate('/sign-up');
              setFormError(form);
              setData(form);
            }}
          >
           {labels.buttons.signUp}
          </span>
        </div>

        <span className='forget-password w-50 text-center fw-semibold ml-5' onClick={open}>Forgot Password?</span>
      </div>

      <ResetPassword opened={opened} close={close} />
      </div>
    </>
  );
}
