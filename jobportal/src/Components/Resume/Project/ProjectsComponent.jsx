import { Button, Divider, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import BackNextBtnComponent from "../../../CommonComponents/BackNextBtnComponent";
import { addProject, addAllProjects } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
// import { useForm } from "@mantine/form";
import InputComponent from "../../../CommonComponents/Input/InputComponent";
import "./ProjectsComponent.css"

const mapStateToProps = (state) => ({
  projects: state.projects?.projects,
});

const mapDispatchToProps = (dispatch) => ({
  setProject: (project) => dispatch(addProject(project)),
  setAllProjects: (projects) => dispatch(addAllProjects(projects)),
});

const ProjectsComponent = (props) => {
  const [loading, setLoading] = useState(false);
  const [localProjects, setLocalProjects] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    setLocalProjects(props.projects);
  }, [props.projects]);

  const handleBack = () => {
    props.setTab(props.tab - 1);
  };

  const handleSkip = () => {
    props.setTab(props.tab + 1);
  }
  const handleNext = (data) => {
    setLoading(true);

    let projectOne = {};
    let projectTwo = {};

    for (let index in data) {
      if (index.includes("1")) {
        projectOne[index.slice(0, index.length - 1)] = data[index];
      } else {
        projectTwo[index.slice(0, index.length - 1)] = data[index];
      }
    }

    if (Object.keys(projectTwo).length) {
      props.setAllProjects([
        { ...projectOne, id: 1 },
        { ...projectTwo, id: 2 },
      ]);
    } else {
      props.setAllProjects([{ ...projectOne, id: 1 }]);
    }

    setTimeout(() => {
      setLoading(false);
      props.setTab(props.tab + 1);
    }, 1000);
  };

  const addNewProject = () => {
    const newProject = {
      id: props.projects?.length + 1,
      projectName: "",
      techStack: "",
      description: "",
    };

    props.setProject(newProject);
    setLocalProjects([...localProjects, newProject]);
  };

  const handleInputChange = (id, field, value) => {
    const updatedProjects = localProjects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    );
    setLocalProjects(updatedProjects);
  };

  return (
    <Paper className="projects-paper" elevation={3}>
      <h2 className="projects-heading">Projects</h2>
      <form onSubmit={handleSubmit(handleNext)}>
        {localProjects && localProjects?.map((project) => (
          <div key={project.id} className="project-cont">
            <h3 className="project-heading">Project {project.id}</h3>
            <Divider sx={{ margin: "5px 0px" }} />
            <div className="project-form-cont">
              <InputComponent
                title={"Project Name"}
                type={"text"}
                name={"projectName" + project.id}
                register={register}
                multiline={false}
                value={project?.projectName}
                setValue={(value) => handleInputChange(project.id, 'projectName', value)}
                error={Boolean(errors[`projectName${project.id}`])}
                errorMessage={
                  errors[`projectName${project.id}`]
                    ? errors[`projectName${project.id}`].message
                    : null
                }
              />
              <InputComponent
                title={"Tech Stack"}
                type={"text"}
                name={"techStack" + project.id}
                register={register}
                multiline={false}
                value={project?.techStack}
                setValue={(value) => handleInputChange(project.id, 'techStack', value)}
                error={Boolean(errors[`techStack${project.id}`])}
                errorMessage={
                  errors[`techStack${project.id}`]
                    ? errors[`techStack${project.id}`].message
                    : null
                }
              />
              <InputComponent
                title={"Description"}
                type={"text"}
                name={"description" + project.id}
                register={register}
                multiline={false}
                value={project?.description}
                setValue={(value) => handleInputChange(project.id, 'description', value)}
                error={Boolean(errors[`description${project.id}`])}
                errorMessage={
                  errors[`description${project.id}`]
                    ? errors[`description${project.id}`].message
                    : null
                }
              />
            </div>
          </div>
        ))}
        {localProjects && localProjects.length === 2 ? null : (
          <div className="add-new-btn-cont">
            <Button onClick={addNewProject} variant="text">
              Add New
            </Button>
          </div>
        )}
        <Divider sx={{ margin: "10px 0px" }} />
        <BackNextBtnComponent
          onNext={handleNext}
          onBack={handleBack}
          loading={loading}
          tab={props.tab}
          nextTitle={"Next"}
          backTitle={"Back"}
          onSkip={handleSkip}
        />
      </form>
    </Paper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsComponent);
