import React, { useState } from 'react';
import { Button, Checkbox, PasswordInput, TextInput, Radio, Group, Tooltip } from '@mantine/core';
import { IconAt, IconInfoCircle, IconLock, IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../Services/UserService';
import { signupValidation } from '../../Services/FormValidation';
import './Signup.css';
import { errorNotification, successNotification } from '../../Services/NotificationService';
import labels from '../../Labels/Labels.json'
const form = { 
  userName: "", 
  userEmail: '', 
  userPassword: '', 
  confirmPassword: '', 
  accountType: "APPLICANT", 
  termsAccepted: false 
};

export default function SignUpContent() {
    const [data, setData] = useState(form);
    const [formError, setFormError] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target || {};
        if (type === "checkbox") {
            setData((prevState) => ({
                ...prevState,
                [name]: checked,
            }));
            setFormError((prevState) => ({
                ...prevState,
                [name]: !checked ? labels.signUp.errorMessages.checked : "",
            }));
        } else {
            setData((prevState) => ({
                ...prevState,
                [name]: value,
            }));

            if (name === "confirmPassword" && value !== data.userPassword) {
                setFormError((prevState) => ({
                    ...prevState,
                    [name]: labels.signUp.errorMessages.password,
                }));
            } else {
                setFormError((prevState) => ({
                    ...prevState,
                    [name]: signupValidation(name, value),
                }));
            }
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target || {};
        setFormError((prevState) => ({
            ...prevState,
            [name]: "",
        }));
    };

    const handleSubmit = () => {
        let errors = {};

        // Validate all fields
        for (let key in data) {
            if (data[key] === "" || signupValidation(key, data[key])) {
                errors[key] = signupValidation(key, data[key]) || `${key} is required`;
            }
        }

       // Confirm Password validation
       if (data.userPassword !== data.confirmPassword) {
        errors.confirmPassword = labels.signUp.errorMessages.password;
    }

    // Terms and Conditions validation
    if (!data.termsAccepted) {
        errors.termsAccepted = labels.signUp.errorMessages.checked;
    }

        // If validation errors exist, set the errors and do not proceed with form submission
        if (Object.keys(errors).length > 0) {
            setFormError(errors);
            console.log(labels.signUp.errorMessages.formValidation);
            return;
        }

        setLoading(true);
        registerUser(data)
            .then((res) => {
                successNotification(labels.signUp.default.success, labels.signUp.default.successMessage);
                setData(form);
                setFormError({});
                setTimeout(() => {
                    setLoading(false);
                    navigate('/login');
                }, 3000);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                errorNotification(labels.signUp.default.failure, error.response.data.errorMessage);
            });
    };

    return (
        <>
            <div className='d-flex flex-column text-black signuppage' style={{ width: "50vw", position: 'relative' }}>
                <div className='fs-2 fw-semibold login text-center'>Create Account</div>
                <div className='d-flex  flex-column gap-4  justify-content-center signupfields align-items-center'>
                    <TextInput
                        withAsterisk
                        className='w-75'
                        value={data.userName}
                        name={labels.signUp.names.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        leftSection={<IconUser />}
                        label={labels.signUp.labels.name}
                        placeholder={labels.signUp.placeholders.name}
                    />
                    {formError.userName && (
                        <div style={{ color: 'red', fontSize: '12px', position: 'absolute', top: '160px', left: '100px', }}>
                            {formError.userName}
                        </div>
                    )}

                    <TextInput
                        type='email'
                        className='w-75'
                        value={data.userEmail}
                        name={labels.signUp.names.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        withAsterisk
                        leftSection={<IconAt />}
                        label={labels.signUp.labels.email}
                        placeholder={labels.signUp.placeholders.email}
                    />
                    {formError.userEmail && (
                        <div style={{ color: 'red', fontSize: '12px', position: 'absolute', top: '250px', left: '100px' }}>
                            {formError.userEmail}
                        </div>
                    )}

                    <PasswordInput
                        type='password'
                        className='w-75'
                        value={data.userPassword}
                        name={labels.signUp.names.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        withAsterisk
                        leftSection={<IconLock stroke={1.5} />}
                        label={labels.signUp.labels.password}
                        placeholder={labels.signUp.placeholders.password}
                    />
                     {formError.userPassword && (
                        <div style={{ color: 'red', fontSize: '12px', position: 'absolute', top: '330px', left: '100px' }}>
                            {formError.userPassword}
                        </div>
                    )}
                    {formError.userPassword && (

                             <Tooltip
                                  label={
                                    <>
                                      {labels.signUp.tooltips.password} <br />
                                      {labels.signUp.tooltips.passwordContinuation}
                                    </>
                                  }
                                  withArrow
                                  position="bottom-middle"
                                >
                                  <div style={{
                                    position: 'absolute', top: '295px', left: '540px', cursor: 'pointer'
                                  }}>
                                    <IconInfoCircle color="red" size={18} />
                                  </div>
                                </Tooltip>
                              )}

                    <PasswordInput
                        type='password'
                        className=' w-75'
                        value={data.confirmPassword}
                        name={labels.signUp.names.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        withAsterisk
                        leftSection={<IconLock stroke={1.5} />}
                        label={labels.signUp.labels.confirmPassword}
                        placeholder={labels.signUp.placeholders.confirmPassword}
                    />
                    {formError.confirmPassword && (
                        <div style={{ color: 'red', fontSize: '12px', position: 'absolute', top: '420px', left: '100px' }}>
                            {formError.confirmPassword}
                        </div>
                    )}

                    <Radio.Group
                        value={data.accountType}
                        className='w-75'
                        onChange={(value) => setData((prevState) => ({ ...prevState, accountType: value }))}
                        name={labels.signUp.names.accountType}
                        label={labels.signUp.labels.accountType}
                    >
                        <Group className='justify-content-evenly'>
                            <Radio color='orange' value="APPLICANT" label="Applicant" style={{ cursor: "pointer" }} />
                            <Radio color='orange' value="EMPLOYER" label="Employer" style={{ cursor: "pointer" }} />
                        </Group>
                    </Radio.Group>

                    <Checkbox
                        size='15px'
                        color='orange'
                        className='text-black fw-semibold w-75 mt-2'
                        label={<span className='w-75'>I accept {''}<span style={{ color: "orange" }}>terms & conditions</span></span>}
                        name={labels.signUp.names.terms}
                        checked={data.termsAccepted}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {formError.termsAccepted && (
                        <div style={{ color: 'red', fontSize: '12px', position: 'absolute', top: '530px', left: '120px' }}>
                            {formError.termsAccepted}
                        </div>
                    )}

                    <Button onClick={handleSubmit} color='orange' className='' variant='filled' loading={loading}>Sign up</Button>

                    <div className=' text-black fw-semibold text-center cursor-pointer w-75'>
                    {labels.signUp.default.haveAccount}
                        <span
                            className='fw-semibold signuploginbtn '
                            style={{ cursor: "pointer",color:"darkorange" }}
                            onClick={() => { navigate("/login"); setFormError({}); setData(form) }}
                        >
                             {labels.buttons.login}
                        </span>

                    </div>
                </div>
            </div>
        </>
    );
}
