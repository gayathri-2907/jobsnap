import { TextInput, Button, Divider } from '@mantine/core'
import React, { useEffect } from 'react'
import { SelectInput } from './SelectInput'
import { fields } from '../../Data/Profile'
import { DatePickerInput, } from '@mantine/dates';
import { useDispatch, useSelector } from 'react-redux';
import { isNotEmpty, useForm } from '@mantine/form';
import { changeProfile } from '../../Slices/ProfileSlice';
import { successNotification } from '../../Services/NotificationService';
import labels from '../../Labels/ProfileLabel.json'
export default function CertificateInput(props) {
  const dispatch = useDispatch();
  const select = fields;
  const profile=useSelector((state) => state.profile);

  const form = useForm({
    mode: 'controlled',
    validateInputOnChange: true,
    initialValues: {
      title: props.title || '',
      issuer: props.issuer || '',
      issueDate: props.issueDate ? new Date(props.issueDate) : null,
      certificateID: props.certificateID || '',
    },
    validate: {
      title: isNotEmpty(labels.certificationLabels.titleValidation),
      issuer: isNotEmpty(labels.certificationLabels.issuerValidation),
      issueDate: isNotEmpty(labels.certificationLabels.issueDateValidation),
      certificateID: isNotEmpty(labels.certificationLabels.certificateIdValidation),
    },
  });
  useEffect(()=>{

    if(!props.add){
      const issueDate=props.issueDate? new Date(props.issueDate): null;

      
      if (issueDate && isNaN(issueDate.getTime())) {
        console.error(labels.certificationLabels.dateValidation, props.issueDate);
        return;
      }
      form.setValues({
        title: props.title || '',
        issuer: props.issuer || '',
        issueDate:issueDate||null,
        certificateID: props.certificateID || '',
      })
    }
    //eslint-disable-next-line
  },[props.title, props.issuer, props.issueDate, props.certificateID])

  const handleSave = () => {
    form.validate();
    if (!form.isValid()) {
      console.log(labels.certificationLabels.formvalidationError);
        return;
    }

    let certificates = [...profile.certifications];
    const values = form.getValues();
    
    // Assuming shiftTimezone function here
    if (props.add) {
      if (values.issueDate && !isNaN(values.issueDate.getTime())) {
        values.issueDate = values.issueDate.toISOString();
      } else {
        console.error(labels.certificationLabels.dateValidation, values.issueDate);
        return;
      }
      if (!values.title || !values.issuer || !values.issueDate || !values.certificateID) {
        console.error(labels.certificationLabels.formFieldsError);
        return;
      }
      certificates.push(values);
  
    }else{
      if (values.issueDate && !isNaN(values.issueDate.getTime())) {
        values.issueDate = values.issueDate.toISOString();
      } else {
        console.error(labels.certificationLabels.dateValidation, values.issueDate);
        return;
      }
      
      if (!values.title || !values.issuer || !values.issueDate || !values.certificateID) {
        console.error(labels.certificationLabels.formFieldsError);
        return;
      }
  
      certificates[props.index]=values;
    }
    

    let updatedProfile = { ...profile, certifications: certificates };
    props.setEdit(false);
    dispatch(changeProfile(updatedProfile));
    successNotification(labels.profilelabel.success, `${props.add ? "Certificate Added" : "Certificate Updated"} Successfully`);
};

  return (
    <div className='d-flex flex-column gap-3'>
      <div className='fw-semibold'>
      <Divider className='m-3'/>
      {props.add? "Add" :"Edit"} Certificates</div>
      <div className='d-flex gap-5'>
        <TextInput label={labels.certificationLabels.titleLabel} {...form.getInputProps("title")} className='w-50' withAsterisk placeholder={labels.certificationLabels.titlePlaceholder} />
        <SelectInput form={form} name="issuer" {...select[3]} />
      </div>
      <div className='d-flex gap-5'>
        <DatePickerInput
        className='w-50'
          withAsterisk
          maxDate={new Date()}
          {...form.getInputProps("issueDate")} 
          label={labels.certificationLabels.issueDate}
          placeholder={labels.certificationLabels.pickDate}
        />
         <TextInput label={labels.certificationLabels.certificateIdLabel} className='w-50'  {...form.getInputProps("certificateID")}  withAsterisk placeholder={labels.certificationLabels.certificateIdPlaceholder} />
      </div>
      <div className="d-flex m-2 gap-3">
        <Button color='teal' onClick={handleSave} bg='green' variant="Filled">{labels.certificationLabels.save}</Button>
        <Button onClick={() => props.setEdit(false)} color="red" variant="light">{labels.certificationLabels.cancel}</Button>
      </div>
    </div>
  )
}
