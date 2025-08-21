import React, { useEffect } from 'react';
import { SelectInput } from './SelectInput';
import { fields } from '../../Data/Profile';
import { Button, Checkbox, Divider, Textarea } from '@mantine/core';
import { DatePickerInput, } from '@mantine/dates';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "@mantine/form";
import { changeProfile } from '../../Slices/ProfileSlice';
import { successNotification } from '../../Services/NotificationService';
import labels from '../../Labels/ProfileLabel.json'
export default function ExperienceInput(props) {
  const dispatch = useDispatch();
  const select = fields;
  const profile = useSelector((state) => state.profile);

  const form = useForm({
    mode: 'controlled',
    validateInputOnChange: true,
    initialValues: {
      title: props.title || '',
      company: props.company || '',
      location: props.location || '',
      startDate: props.startDate ? new Date(props.startDate) : null,
      endDate: props.endDate ? new Date(props.endDate) : null,
      working: props.working || false,
      description: props.description || '',
    },
    validate: {
      title: (value) => value ? undefined : labels.experienceLabels.titleValidation,
      company: (value) => value ? undefined : labels.experienceLabels.companyValidation,
      location: (value) => value ? undefined : labels.experienceLabels.locationValidation,
      startDate: (value) => value ? undefined : labels.experienceLabels.startDateValidation,
      description: (value) => value ? undefined : labels.experienceLabels.descriptionValidation,
    },
  });

  useEffect(() => {

    if (!props.add) {
      const startDate = props.startDate ? new Date(props.startDate) : null;
      const endDate = props.endDate ? new Date(props.endDate) : null;

      if (startDate && isNaN(startDate.getTime())) {
        console.error(labels.experienceLabels.startDateError, props.startDate);
        return;
      }
      if (endDate && isNaN(endDate.getTime())) {
        console.error(labels.experienceLabels.endDateError, props.endDate);
        return;
      }
      // Update form values only when props are different
      form.setValues({
        title: props.title || '',
        company: props.company || '',
        location: props.location || '',
        startDate: startDate || null,
        endDate: endDate || null,
        working: props.working || false,
        description: props.description || '',
      });

    }
    //eslint-disable-next-line
  }, [props.title, props.company, props.location, props.startDate, props.endDate, props.working, props.description, props.add]);

  const handleSave = () => {
    form.validate();
    if (!form.isValid) {
      console.log(labels.experienceLabels.formvalidationError);
      return;
    }
  
    let exp = [...profile.experiences];
    const values = form.getValues();
  
    if (props.add) {
      if (values.startDate && !isNaN(values.startDate.getTime())) {
        values.startDate = values.startDate.toISOString();
      } else {
        console.error(labels.experienceLabels.startDateError, values.startDate);
        return;
      }
  
      if (!values.working && values.endDate && !isNaN(values.endDate.getTime())) {
        values.endDate = values.endDate.toISOString();
      } else if (!values.working) {
        console.error(labels.experienceLabels.endDateError, values.endDate);
        return;
      }
  
      if (!values.title || !values.company || !values.location || !values.description) {
        console.error(labels.experienceLabels.formFieldsError);
        return;
      }
  
      exp.push(values);
    } else {
      if (values.startDate && !isNaN(values.startDate.getTime())) {
        values.startDate = values.startDate.toISOString();
      } else {
        console.error(labels.experienceLabels.startDateError, values.startDate);
        return;
      }
  
      if (!values.working && values.endDate && !isNaN(values.endDate.getTime())) {
        values.endDate = values.endDate.toISOString();
      } else if (!values.working) {
        console.error(labels.experienceLabels.endDateError, values.endDate);
        return;
      }
  
      if (!values.title || !values.company || !values.location || !values.description) {
        console.error(labels.experienceLabels.formFieldsError);
        return;
      }
  
      exp[props.index] = values;
    }
  
    let updatedProfile = { ...profile, experiences: exp };
    props.setEdit(false);
    dispatch(changeProfile(updatedProfile));
    successNotification(labels.profilelabel.success, `Experience ${props.add ? "Added" : "Updated"} Successfully`);
  };
    return (
    <div className='d-flex flex-column gap-3'>
      <div className='fs-6 fw-semibold'>
      <Divider className='m-3'/>
      {props.add ? "Add" : "Edit"} Experience</div>
      <div className='d-flex gap-5 p-2'>
        <SelectInput form={form} name="title" {...select[0]} />
        <SelectInput form={form} name="company" {...select[1]} />
      </div>
      <SelectInput form={form} name="location" {...select[2]} />
      <Textarea
        withAsterisk
        className='form-control autosize'
        label={labels.experienceLabels.summary}
        placeholder={labels.experienceLabels.summaryPlaceholder}
        {...form.getInputProps('description')} 
      />
      <div className='d-flex gap-5 w-50'>
        <DatePickerInput
          withAsterisk
          maxDate={form.getValues().endDate || undefined||new Date()}
          label={labels.experienceLabels.startDate}
          placeholder={labels.experienceLabels.pickDate}
          {...form.getInputProps("startDate")} 
        />
        <DatePickerInput
          withAsterisk
          minDate={form.getValues().startDate || undefined}
          maxDate={new Date()}
          label={labels.experienceLabels.endDate}
          placeholder={labels.experienceLabels.pickDate}
          {...form.getInputProps("endDate")} 
          disabled={form.getValues().working}
        />
      </div>
      <Checkbox
        label={labels.experienceLabels.currentlyWorkingHere}
        checked={form.getValues().working}
        onChange={(event) => {
          form.setFieldValue("working", event.currentTarget.checked);
        }}
      />
      <div className="d-flex m-2 gap-2">
        <Button onClick={handleSave} color="teal" variant="filled">{labels.experienceLabels.save}</Button>
        <Button onClick={() => props.setEdit(false)} color="red" variant="outline">{labels.experienceLabels.cancel}</Button>
      </div>
    </div>
  );
}


