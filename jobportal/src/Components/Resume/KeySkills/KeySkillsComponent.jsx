import { Paper, Divider, Button } from "@mui/material";
import React, { useState } from "react";
import InputComponent from "../../../CommonComponents/Input/InputComponent";
import "./KeySkillsComponent.css";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { connect } from "react-redux";
import { addNewSkills, deleteSkill, editSkill } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
import BackNextBtnComponent from "../../../CommonComponents/BackNextBtnComponent";
import { IconTrash } from "@tabler/icons-react";

const mapStateToProps = (state) => ({
  skills: state.keySkills?.skills,
});

const mapDispatchToProps = (dispatch) => ({
  onAddNewSkill: () => dispatch(addNewSkills()),
  onEditSkill: (skills) => dispatch(editSkill(skills)),
  onDeleteSkill: (index) => dispatch(deleteSkill(index)),
});

function KeySkillsComponent(props) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onEditSkill = (value, id) => {
    const newSkills = props.skills.map((skill, index) => {
      if (index === id) {
        return value;
      } else return skill;
    });

    props.onEditSkill(newSkills);
  };

  const handleBack = () => {
    props.setTab(props.tab - 1);
  };
  const handleSkip=()=>{
    props.setTab(props.tab + 1);
  }

  const handleNext = () => {
    setLoading(true);
    props.setTab(props.tab + 1);
  };

  return (
    <Paper elevation={3} className="key-skills-paper">
      <h2 className="key-skills-heading">Key Skills</h2>
      <Divider />
      <form onSubmit={handleSubmit(handleNext)}>
        <div className="key-skills-form-fields">
          {props.skills?.map((skill, index) => (
            <div key={index} className="key-input-with-delete">
              <InputComponent
                type="text"
                name={`skill${index + 1}`}
                register={register}
                multiline={false}
                value={skill}
                setValue={(skill) => onEditSkill(skill, index)}
                error={errors[`skill${index + 1}`] ? true : false}
                errorMessage={
                  errors[`skill${index + 1}`]
                    ? errors[`skill${index + 1}`].message
                    : null
                }
              />
              {props.skills?.length > 1 && (
                <IconTrash
                  sx={{ marginLeft: "10px" }}
                  onClick={() => props.onDeleteSkill(index)}
                />
              )}
            </div>
          ))}
        </div>
        {props.skills?.length < 6 && (
          <Button
            className="add-new-btn"
            variant="text"
            onClick={props.onAddNewSkill}>
            Add new
          </Button>
        )}
        <Divider className="key-skills-divider" />
        {/* <BackNextBtnComponent
          onNext={handleSubmit(handleNext)}
          tab={props.tab}
          onBack={handleBack}
          nextTitle={"Next"}
          backTitle={"Back"}
        /> */}
        <BackNextBtnComponent
          loading={loading}
          onNext={handleNext}
          onBack={handleBack}
          tab={props.tab}
          nextTitle={"Next"}
          backTitle={"Back"}
          onSkip={handleSkip} // Pass the skip handler here
        />
      </form>
    </Paper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(KeySkillsComponent);
