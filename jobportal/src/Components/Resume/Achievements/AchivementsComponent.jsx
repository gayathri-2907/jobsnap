import { Button, Divider, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import BackNextBtnComponent from "../../../CommonComponents/BackNextBtnComponent";
import { addAchievement, addAllAchievements } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
import InputComponent from "../../../CommonComponents/Input/InputComponent";
import "./AchievementsComponent.css"

const mapStateToProps = (state) => ({
  achievements: state.achievements?.achievements,
});

const mapDispatchToProps = (dispatch) => ({
  setAchievement: (achievement) => dispatch(addAchievement(achievement)),
  setAllAchievements: (achievements) => dispatch(addAllAchievements(achievements)),
});

const AchievementsComponent = (props) => {
  const [loading, setLoading] = useState(false);
  const [localAchievements, setLocalAchievements] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    setLocalAchievements(props.achievements);
  }, [props.achievements]);

  const handleBack = () => {
    props.setTab(props.tab - 1);
  };
  const handleSkip=()=>{
    props.setTab(props.tab+1)
  }

  const handleNext = (data) => {
    setLoading(true);

    let achOne = {};
    let achTwo = {};

    for (let index in data) {
      if (index.includes("1")) {
        achOne[index.slice(0, index.length - 1)] = data[index];
      } else {
        achTwo[index.slice(0, index.length - 1)] = data[index];
      }
    }

    if (Object.keys(achTwo).length) {
      props.setAllAchievements([
        { ...achOne, id: 1 },
        { ...achTwo, id: 2 },
      ]);
    } else {
      props.setAllAchievements([{ ...achOne, id: 1 }]);
    }

    setTimeout(() => {
      setLoading(false);
      props.setTab(props.tab + 1);
    }, 1000);
  };

  const addNewAchievement = () => {
    const newAchievement = {
      id: props.achievements.length + 1,
      title: "",
      date: "",
    };

    props.setAchievement(newAchievement);
    setLocalAchievements([...localAchievements, newAchievement]);
  };

  const handleInputChange = (id, field, value) => {
    const updatedAchievements = localAchievements.map(achievement => 
      achievement.id === id ? { ...achievement, [field]: value } : achievement
    );
    setLocalAchievements(updatedAchievements);
  };

  return (
    <Paper className="achievements-paper" elevation={3}>
      <h2 className="achievements-heading">Achievements</h2>
      <form onSubmit={handleSubmit(handleNext)}>
        {localAchievements && localAchievements.map((achievement) => (
          <div key={achievement.id} className="achievement-cont">
            <h3 className="achievement-heading">Achievement {achievement.id}</h3>
            <Divider sx={{ margin: "5px 0px" }} />
            <div className="achievement-form-cont">
              <InputComponent
                title={"Title"}
                type={"text"}
                name={"title" + achievement.id}
                register={register}
                multiline={false}
                value={achievement.title}
                setValue={(value) => handleInputChange(achievement.id, 'title', value)}
                error={Boolean(errors[`title${achievement.id}`])}
                errorMessage={
                  errors[`title${achievement.id}`]
                    ? errors[`title${achievement.id}`].message
                    : null
                }
              />
              {/* <InputComponent
                title={"Date"}
                type={"text"}
                name={"date" + achievement.id}
                register={register}
                multiline={false}
                value={achievement.date}
                setValue={(value) => handleInputChange(achievement.id, 'date', value)}
                error={Boolean(errors[`date${achievement.id}`])}
                errorMessage={
                  errors[`date${achievement.id}`]
                    ? errors[`date${achievement.id}`].message
                    : null
                }
              /> */}
            </div>
          </div>
        ))}
        {localAchievements && localAchievements.length === 2 ? null : (
          <div className="add-new-btn-cont">
            <Button onClick={addNewAchievement} variant="text">
              Add New
            </Button>
          </div>
        )}
        <Divider sx={{ margin: "10px 0px" }} />
        <BackNextBtnComponent
          onNext={handleSubmit(handleNext)}
          onBack={handleBack}
          loading={loading}
          tab={props.tab}
          nextTitle={"Preview"}
          backTitle={"Back"}
          onSkip={handleSkip}
        />
      </form>
    </Paper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AchievementsComponent);
