import { Button, Divider, Paper, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./WorkExperienceComponent.css";
import { connect } from "react-redux";
import BackNextBtnComponent from "../../../CommonComponents/BackNextBtnComponent";
import { addAllExperience, addExperience, removeExperience } from "../../../Redux/actions";
import { useForm, Controller } from "react-hook-form";
import InputComponent from "../../../CommonComponents/Input/InputComponent";
import SelectComponent from "../../../CommonComponents/Input/SelectComponent";
import { IconTrash } from "@tabler/icons-react";

const mapStateToProps = (state) => ({
  experiences: state.workExperience?.experiences,
});

const mapDispatchToProps = (dispatch) => ({
  setExperience: (experience) => dispatch(addExperience(experience)),
  setAllExperience: (experiences) => dispatch(addAllExperience(experiences)),
  removeExperience: (id) => dispatch(removeExperience(id)),
});

const WorkExperienceComponent = (props) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    props.experiences.forEach((experience, index) => {
      // Initialize or perform any side effects if needed
    });
  }, [props.experiences, setValue]);

  const handleBack = () => {
    props.setTab(props.tab - 1);
  };

  const handleSkip = () => {
    props.setTab(props.tab + 1);
    reset();
  };

  const handleNext = (data) => {
    setLoading(true);

    let experiences = [];
    props.experiences.forEach((experience) => {
      const expData = {
        ...experience,
        jobTitle: data[`jobTitle${experience.id}`],
        organizationName: data[`organizationName${experience.id}`],
        startYear: data[`startYear${experience.id}`],
        endYear: data[`endYear${experience.id}`],
      };
      experiences.push(expData);
    });

    props.setAllExperience(experiences);

    setTimeout(() => {
      setLoading(false);
      props.setTab(props.tab + 1);
    }, 1000);
  };

  const addNewExperience = () => {
    props.setExperience({
      id: props.experiences?.length + 1,
      jobTitle: "",
      organizationName: "",
      startYear: "",
      endYear: "",
    });
  };

  const deleteExperience = (id) => {
    const newExperiences = props.experiences.filter((experience) => experience.id !== id);
    props.setAllExperience(newExperiences);
  };

  const editJobTitleExperience = (value, id) => {
    const newExperiences = props.experiences.map((experience) => {
      if (experience.id === id) {
        return { ...experience, jobTitle: value };
      } else return experience;
    });

    props.setAllExperience(newExperiences);
  };

  const editOrganisationNameExperience = (value, id) => {
    const newExperiences = props.experiences.map((experience) => {
      if (experience.id === id) {
        return { ...experience, organizationName: value };
      } else return experience;
    });

    props.setAllExperience(newExperiences);
  };

  const editStartYearExperience = (value, id) => {
    const newExperiences = props.experiences.map((experience) => {
      if (experience.id === id) {
        return { ...experience, startYear: value };
      } else return experience;
    });

    props.setAllExperience(newExperiences);
  };

  const editEndYearExperience = (value, id) => {
    const newExperiences = props.experiences.map((experience) => {
      if (experience.id === id) {
        return { ...experience, endYear: value };
      } else return experience;
    });

    props.setAllExperience(newExperiences);
  };

  return (
    <>
      <Paper className="work-experience-paper" elevation={3}>
        <h2 className="work-experience-heading fs-5">Work Experience</h2>
        <form onSubmit={handleSubmit(handleNext)}>
          {props.experiences?.map((experience) => (
            <div key={experience.id} className="experience-cont">
              <div className="d-flex justify-content-between">
                <h3 className="experience-heading fs-6">Experience {experience.id}</h3>
                <IconTrash color="orange" onClick={() => deleteExperience(experience.id)} />
              </div>
              <Divider sx={{ margin: "5px 0px" }} />
              <div className="experience-form-cont">
                <InputComponent
                  title={"Job Title"}
                  type={"text"}
                  name={`jobTitle${experience.id}`}
                  register={register}
                  multiline={false}
                  value={experience.jobTitle}
                  setValue={(value) => editJobTitleExperience(value, experience.id)}
                  error={Boolean(errors[`jobTitle${experience.id}`])}
                  errorMessage={errors[`jobTitle${experience.id}`] ? errors[`jobTitle${experience.id}`].message : null}
                />
                <InputComponent
                  title={"Organization Name"}
                  type={"text"}
                  name={`organizationName${experience.id}`}
                  register={register}
                  multiline={false}
                  value={experience.organizationName}
                  setValue={(value) => editOrganisationNameExperience(value, experience.id)}
                  error={errors[`organizationName${experience.id}`] ? true : false}
                  errorMessage={errors[`organizationName${experience.id}`] ? errors[`organizationName${experience.id}`].message : null}
                />
                <SelectComponent
                  title={"Start Year"}
                  errorMessage={errors[`startYear${experience.id}`] ? errors[`startYear${experience.id}`].message : null}
                  error={errors[`startYear${experience.id}`] ? true : false}
                >
                  <Controller
                    render={(props) => (
                      <TextField
                        {...props.field}
                   
                        variant="outlined"
                        type="date"
                        fullWidth
                        value={props.field.value}
                        onChange={(e) => {
                          props.field.onChange(e.target.value);
                          editStartYearExperience(e.target.value, experience.id);
                        }}
                        error={Boolean(errors[`startYear${experience.id}`])}
                        helperText={errors[`startYear${experience.id}`] ? errors[`startYear${experience.id}`].message : null}
                      />
                    )}
                    name={`startYear${experience.id}`}
                    control={control}
                    rules={{ required: "*Please select start year" }}
                    defaultValue={experience.startYear}
                  />
                </SelectComponent>
                <SelectComponent
                  title={"End Year"}
                  errorMessage={errors[`endYear${experience.id}`] ? errors[`endYear${experience.id}`].message : null}
                  error={errors[`endYear${experience.id}`] ? true : false}
                >
                  <Controller
                    render={(props) => (
                      <TextField
                        {...props.field}
                        variant="outlined"
                        type="date"
                        fullWidth
                        value={props.field.value}
                        onChange={(e) => {
                          props.field.onChange(e.target.value);
                          editEndYearExperience(e.target.value, experience.id);
                        }}
                        error={Boolean(errors[`endYear${experience.id}`])}
                        helperText={errors[`endYear${experience.id}`] ? errors[`endYear${experience.id}`].message : null}
                      />
                    )}
                    name={`endYear${experience.id}`}
                    control={control}
                    rules={{ required: "*Please select end year" }}
                    defaultValue={experience.endYear}
                  />
                </SelectComponent>
              </div>
            </div>
          ))}
          <div className="add-new-btn-cont">
            <Button onClick={addNewExperience} variant="text" style={{ color: "orange" }}>
              Add New
            </Button>
          </div>
          <Divider sx={{ margin: "10px 0px" }} />
          <BackNextBtnComponent
            loading={loading}
            onNext={handleNext}
            onBack={handleBack}
            tab={props.tab}
            nextTitle={"Next"}
            backTitle={"Back"}
            onSkip={handleSkip}
          />
        </form>
      </Paper>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkExperienceComponent);
