import { FileInput, NumberInput, Textarea, TextInput,Button, LoadingOverlay } from '@mantine/core'
import { IconPaperclip } from '@tabler/icons-react'
import React from 'react'
import { useState } from 'react';

import { isNotEmpty, useForm } from '@mantine/form';
import { getBase64 } from '../../Services/Utilities';
import { useNavigate, useParams } from 'react-router-dom';
import { applyJob } from '../../Services/JobService';
import { errorNotification, successNotification } from '../../Services/NotificationService';
import { useSelector } from 'react-redux';
import labels from '../../Labels/JobLabel.json'
import commonlabels from '../../Labels/Labels.json'
export default function ApplicationForm() {
  const {id} =useParams();
  const user=useSelector((state)=>state.user)
    const [preview, setPreview] = useState(false);
    const [submit, setSubmit] = useState(false);
    const navigate=useNavigate();

    
  
    const handlePreview = () => {
      form.validate()
      if(!form.isValid()) return;
      setPreview(!preview);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      console.log(form.getValues())
    };
  
    const handleSubmit = async () => {
      setSubmit(true);
      let resume = await getBase64(form.getValues().resume);
      let applicant = { ...form.getValues(),email: user.userEmail,resume: resume.split(',')[1], // Check if base64 is correct
      };
  
  
      applyJob(id, applicant)
          .then((res) => {
              setSubmit(false);
              successNotification(labels.labels.success,labels.labels.successMessage);
              navigate('/job-history')
              window.scrollTo(0, 0);
          })
          .catch((error) => {
              setSubmit(false);
              console.error("Error applying for job:", error);
              errorNotification("Error", error.response.data.errorMessage);
          });
  };
  
    const form=useForm({
      mode:'controlled',
      validateInputOnChange:true,
      initialValues:{
        name:"",
        email:user.userEmail,
        phone:"",
        website:"",
        resume:null,
        coverLetter:null,
      },
      validate:{
        name:isNotEmpty(labels.validations.name),
        email:isNotEmpty(labels.validations.email),
        phone:isNotEmpty(labels.validations.phoneNumber),
        website:isNotEmpty(labels.validations.website),
        resume:isNotEmpty(labels.validations.resume),
      }
    });
  return (
    <div>
    <LoadingOverlay  className='position-fixed' visible={submit} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{color:'orange',type:'bars'}} />
          <div className="fs-3 fw-semibold mb-3">{labels.labels.submitYourApplication}</div>
              <div className="d-flex flex-column gap-3">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <TextInput
                      label={labels.labels.fullName}
                      {...form.getInputProps('name')}
                      style={{ width: '100%' }}
                      readOnly={preview}
                      variant={preview ? 'unstyled' : 'default'}
                      className={`${preview ? 'fw-semibold' : ''}`}
                      withAsterisk
                      placeholder={labels.placeholders.enterName}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <TextInput
                    {...form.getInputProps("email")}
                    disabled
                      label={labels.labels.email}
                      style={{ width: '100%' }}
                      readOnly={preview}
                      variant={preview ? 'unstyled' : 'default'}
                      className={`${preview ? 'fw-semibold' : ''}`}
                      withAsterisk
                      placeholder={labels.placeholders.enterEmail}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <NumberInput
                    {...form.getInputProps("phone")}
                      label={labels.labels.phoneNumber}
                      style={{ width: '100%' }}
                      readOnly={preview}
                      variant={preview ? 'unstyled' : 'default'}
                      className={`${preview ? 'fw-semibold' : ''}`}
                      withAsterisk
                      placeholder={labels.placeholders.enterPhoneNumber}
                      hideControls
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <TextInput
                      label={labels.labels.personalWebsite}
                      {...form.getInputProps("website")}
                      style={{ width: '100%' }}
                      readOnly={preview}
                      variant={preview ? 'unstyled' : 'default'}
                      className={`${preview ? 'fw-semibold' : ''}`}
                      withAsterisk
                      placeholder={labels.placeholders.enterURL}
                    />
                  </div>
                </div>

                {/* Attach CV (Full Width on Small Screens) */}
                <div className="row" style={{ width: '105%' }}>
                  <div className="col-12">
                    <FileInput
                      leftSection={<IconPaperclip stroke={1.5} />}
                      {...form.getInputProps("resume")}
                      accept='application/pdf'
                      style={{ width: '100%' }} 
                      readOnly={preview}
                      variant={preview ? 'unstyled' : 'default'}
                      className={`${preview ? 'fw-semibold' : ''}`}
                      label={labels.labels.attachCV}
                      withAsterisk
                      placeholder={labels.placeholders.yourCV}
                      leftSectionPointerEvents="none"
                    />
                  </div>
                </div>

                {/* Cover Letter (Full Width on Small Screens) */}
                <div className="row" style={{ width: '105%' }}>
                  <div className="col-12">
                    <Textarea
                    {...form.getInputProps('coverLetter')}
                      placeholder={labels.placeholders.typeSomethingAboutYourself}
                      readOnly={preview}
                      variant={preview ? 'unstyled' : 'default'}
                      className={`${preview ? 'fw-semibold' : ''}`}
                      label={labels.labels.coverLetter}
                      autosize
                      minRows={4}
                    />
                  </div>
                </div>

                {!preview && (
                  <Button onClick={handlePreview} color="orange" variant="light">
                    {commonlabels.buttons.preview}
                  </Button>
                )}
                {preview && (
                  <div className="d-flex gap-3">
                    <Button fullWidth onClick={handlePreview} color="orange" variant="outline">
                      {commonlabels.buttons.edit}
                    </Button>
                    <Button fullWidth onClick={handleSubmit} color="orange" variant="light">
                      {commonlabels.buttons.submit}
                    </Button>
                  </div>
                )}
              </div>
    </div>
  )
}
