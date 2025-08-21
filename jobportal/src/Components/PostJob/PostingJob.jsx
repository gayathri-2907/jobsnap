import React, { useEffect, useState } from 'react'
import { SelectInput } from './SelectInput'
import {fields} from '../../Data/PostJob'
import { NumberInput, TagsInput, Textarea } from '@mantine/core';
import TextEditor from './RichTextEditor';
import {isNotEmpty, useForm} from '@mantine/form'
import { Button } from '@mantine/core';
import { content } from '../../Data/PostJob';
import { getPostedJobById, jobPosting } from '../../Services/JobService';
import {errorNotification, successNotification} from '../../Services/NotificationService'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function PostingJob() {
  const {id}=useParams();
  const user=useSelector((state)=>state.user);
  const [editorData,setEditorData]=useState(content);
  const select=fields;
  const navigate=useNavigate();
  
 
  const form=useForm({
    mode:"controlled",
    validateInputOnChange:true,
    initialValues:{
      jobTitle:"",
      company:"",
      experience:"",
      jobType:"",
      location:"",
      packageOffered:"",
      skillsRequired:[],
      about:"",
      description:content,
    },
    validate:{
      jobTitle:isNotEmpty("Title is required"),
      company:isNotEmpty("company is required"),
      experience:isNotEmpty("Experience is required"),
      jobType:isNotEmpty("Job Type is required"),
      location:isNotEmpty("Location is required"),
      packageOffered:isNotEmpty("Package offered is required"),
      skillsRequired:isNotEmpty("Skills required is required"),
      about:isNotEmpty("About is required"),
      description:isNotEmpty("Description is required")
    }
  })
  useEffect(()=>{
    window.scrollTo(0,0);
    if(id!=='0'){
      getPostedJobById(id).then((res)=>{
        form.setValues(res.data);
        setEditorData(res.data.description);
      }).catch((error)=>{
        console.error(error);
      })
    }
    else{
      form.reset();
      setEditorData(content);
    }
    //eslint-disable-next-line 
  },[id])
  const handlePost=()=>{
    form.validate();
    if(!form.isValid())return;
      jobPosting({...form.getValues(),postedBy:user.userEmail,jobStatus:"ACTIVE"}).then((response)=>{
        navigate(`/posted-job/${response.id}`);
        window.scrollTo(0, 1);
        successNotification("Success","Job Posted Successfully");
      }).catch((error)=>{
        console.log(error);
        errorNotification("Failed to post job", error.message);
      })
    }


    const handleDraft=()=>{
        jobPosting({...form.getValues(),postedBy:user.userEmail,jobStatus:"DRAFT"}).then((response)=>{
          navigate(`/posted-job/${response.id}`);
          window.scrollTo(0, 1);
          successNotification("Success","Job Drafted Successfully");
        }).catch((error)=>{
          console.log(error);
          errorNotification("Failed to post job", error.message);
        })
      }
  return (
    <div className='w-75 mx-auto'>
        <div className='fw-bold fs-3 mt-5 mb-3'>Post a Job</div>
        <div >
          <div className='d-flex gap-5 p-2 '>
            <SelectInput form={form} name="jobTitle" {...select[0]}/>
            <SelectInput form={form} name="company" {...select[1]}/>
          </div>
          <div className='d-flex gap-5 p-2'>
            <SelectInput form={form} name="experience" {...select[2]}/>
            <SelectInput form={form} name="jobType" {...select[3]}/>
          </div>
          <div className='d-flex gap-5 p-2'>
            <SelectInput form={form}  name="location" {...select[4]}/>
            <NumberInput label="Salary" {...form.getInputProps('packageOffered')} className='w-50' withAsterisk min={1} max={300} clampBehavior='strict' placeholder='Enter Salary in LPA' hideControls/>
          </div>
          <TagsInput withAsterisk {...form.getInputProps('skillsRequired')} className='p-2' label="Skills Required" placeholder='Enter Required Skills' splitChars={[',','','|']} clearable acceptValueOnBlur/>
          <Textarea {...form.getInputProps('about')} withAsterisk className='my-3' label="About Job" autosize minRows={2} placeholder='Enter about job..'/>
        </div>
        
        <div>
          <div className='fw-medium'>Job Description
          <span className='text-danger'>*</span>
          </div>
          <TextEditor form={form} data={editorData}/>
        </div>

        <div className='d-flex gap-4 p-3 justify-content-center'>
          <Button className='square rounded-2' color='#ffa500' onClick={handlePost} variant='filled'>Publish Job</Button>
          <Button className='btn btn-outline-secondary' color='#ffa500' variant='light' onClick={handleDraft}>Save as Draft</Button>
        </div>
    </div>
  )
}
