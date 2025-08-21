import { Modal, TextInput, Button, PinInput, PasswordInput } from '@mantine/core';
import { IconAt, IconLock } from '@tabler/icons-react';
import React, { useState } from 'react';
import { changePassword, sendOTP, verifyOTP } from '../../Services/UserService';
import { signupValidation } from '../../Services/FormValidation';
import { successNotification, errorNotification } from '../../Services/NotificationService';
import { useInterval } from '@mantine/hooks';

export default function ResetPassword(props) {
  const [userEmail, setUserEmail] = useState('');
  const [OTPSent, setOTPSent] = useState(false);
  const [OTPSending, setOTPSending] = useState(false);
  const [userPassword, setUserPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [verified, setVerified] = useState(false);
  const [resendLoader, setResendLoader] = useState(false);
  const [seconds,setSeconds] = useState(60);
  const interval=useInterval(()=>{
    if(seconds===0){
      setResendLoader(false);
      setSeconds(60);
      interval.stop();
    }else
    setSeconds((s)=>s-1)
  },1000);

  const handleSendOtp = () => {
    setOTPSending(true);
    sendOTP(userEmail).then((res) => {
      successNotification('OTP sent Successfully', 'Enter OTP to reset');
      setOTPSent(true);
      setOTPSending(false);
      setResendLoader(true);
      interval.start();
    }).catch((err) => {
      console.log(err);
      setOTPSending(false);
      errorNotification('OTP Sending Failed', err.response.data.message);
    });
  };

  const handleVerifyOTP = (otp) => {
    verifyOTP(userEmail, otp).then((res) => {
      successNotification('OTP verified Successfully', 'Enter New Password to reset');
      setVerified(true);
    }).catch((err) => {
      console.log(err);
      errorNotification('OTP Verification Failed', err.response.data.errorMessage);
    });
  };

  const resendOTP = () => {
    if(resendLoader)return;
    handleSendOtp();
  };

  const changeEmail = () => {
    setOTPSent(false);
    setResendLoader(false);
    setSeconds(60);
    setVerified(false);
    interval.stop();
  };

  const handleResetPassword = () => {
    changePassword(userEmail, userPassword).then((res) => {
      successNotification('Password changed Successfully', 'You can now login with your new password');
      props.close();
    }).catch((err) => {
      console.log(err);
      errorNotification('Password change Failed', err.response.data.errorMessage);
    });
  };

  return (
    <>
      <Modal opened={props.opened}  onClose={props.close} title="Reset password" >
        <div className='d-flex flex-column gap-6'>
          <TextInput
            type="email"
            withAsterisk
            leftSection={<IconAt />}
            label="Email"
            name="userEmail"
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Enter Your Email"
            rightSection={<Button size="xs" onClick={handleSendOtp}
              loading={OTPSending && !OTPSent}
              className="mr-1 bg-warning text-black"
              disabled={userEmail === '' || OTPSent}
              autoContrast variant="filled">sendOTP</Button>}
            rightSectionWidth="xl"
          />
          {
            OTPSent && <PinInput className='mx-auto p-3' onComplete={handleVerifyOTP} length={6} type="number" size='md' gap='lg' />
          }
          {
            OTPSent && !verified &&
            <div className='d-flex gap-2 p-3'>
              <Button size="xs" onClick={resendOTP} loading={OTPSending} fullWidth className="mx-auto bg-dark text-white" variant='light'>{resendLoader?seconds:"Resend"}</Button>
              <Button size="xs" onClick={changeEmail} fullWidth className="mx-auto bg-dark text-white" variant='filled'>Change Email</Button>
            </div>
          }
          {
            verified && <PasswordInput
              className='p-2 m-2'
              type="password" withAsterisk
              leftSection={<IconLock stroke={1.5} />}
              value={userPassword} name="userPassword" error={passwordError}
              onChange={(e) => { setUserPassword(e.target.value); setPasswordError(signupValidation('userPassword', e.target.value)) }}
              label="Password" placeholder="Enter Your Password"
            />}
          {
            verified && <Button onClick={handleResetPassword} variant='filled' className='bg-dark text-white'>Change Password</Button>
          }
        </div>
      </Modal>
    </>
  );
}
