import { Button, Divider, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
// import "../Styles/CertificationsComponent.css";
import { connect } from "react-redux";
import BackNextBtnComponent from "../../../CommonComponents/BackNextBtnComponent";
import { addCertification, addAllCertifications } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
import InputComponent from "../../../CommonComponents/Input/InputComponent";
import "./CertificationsComponent.css"
import { DatePickerInput } from "@mantine/dates";

const mapStateToProps = (state) => ({
  certifications: state.certifications?.certifications || [],
});

const mapDispatchToProps = (dispatch) => ({
  setCertification: (certification) => dispatch(addCertification(certification)),
  setAllCertifications: (certifications) => dispatch(addAllCertifications(certifications)),
});

const CertificationsComponent = (props) => {
  const [loading, setLoading] = useState(false);
  const [localCertifications, setLocalcertifications] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    setLocalcertifications(props.certifications);
  }, [props.certifications]);

  const handleBack = () => {
    props.setTab(props.tab - 1);
  };
const handleSkip= () => {
    props.setTab(props.tab + 1);
}
  const handleNext = (data) => {
    setLoading(true);

    let certOne = {};
    let certTwo = {};

    for (let index in data) {
      if (index.includes("1")) {
        certOne[index.slice(0, index.length - 1)] = data[index];
      } else {
        certTwo[index.slice(0, index.length - 1)] = data[index];
      }
    }

    if (Object.keys(certTwo).length) {
      props.setAllCertifications([
        { ...certOne, id: 1 },
        { ...certTwo, id: 2 },
      ]);
    } else {
      props.setAllCertifications([{ ...certOne, id: 1 }]);
    }

    setTimeout(() => {
      setLoading(false);
      props.setTab(props.tab + 1);
    }, 1000);
  };

  const addNewCertification = () => {
    const newCertification = {
      id: (props.certifications && props.certifications.length) ? props.certifications.length + 1 : 1,
      name: "",
      issuingOrganization: "",
      issueDate: "",
    };
    props.setCertification(newCertification);
    setLocalcertifications([...localCertifications, newCertification]);
  };

  const handleInputChange = (id, field, value) => {
    const updatedProjects = localCertifications.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    );
    setLocalcertifications(updatedProjects);
  };

  return (
    <Paper className="certifications-paper" elevation={3}>
      <h2 className="certifications-heading">Certifications</h2>
      <form onSubmit={handleSubmit(handleNext)}>
        {localCertifications && localCertifications.map((certification) => (
          <div key={certification.id} className="certification-cont">
            <h3 className="certification-heading">Certification {certification.id}</h3>
            <Divider sx={{ margin: "5px 0px" }} />
            <div className="certification-form-cont">
              <InputComponent
                title={"Certification Name"}
                type={"text"}
                name={"name" + certification.id}
                register={register}
                multiline={false}
                value={certification.name}
                setValue={(value) => handleInputChange(certification.id, "name", value)}
                error={Boolean(errors[`name${certification.id}`])}
                errorMessage={
                  errors[`name${certification.id}`]
                    ? errors[`name${certification.id}`].message
                    : null
                }
              />
              <InputComponent
                title={"Issuing Organization"}
                type={"text"}
                name={"issuingOrganization" + certification.id}
                register={register}
                multiline={false}
                value={certification.issuingOrganization}
                setValue={(value) => handleInputChange(certification.id, "issuingOrganization", value)}
                error={Boolean(errors[`issuingOrganization${certification.id}`])}
                errorMessage={
                  errors[`issuingOrganization${certification.id}`]
                    ? errors[`issuingOrganization${certification.id}`].message
                    : null
                }
              />
              {/* <DatePickerInput
                title={"Issue Date"}
                placeholder="Pick Date"
                label="Issue date"
                type={"text"}
                name={"issueDate" + certification.id}
                register={register}
                multiline={false}
                value={certification.issueDate}
                setValue={(value) => handleInputChange(certification.id, "issueDate", value)}
                error={Boolean(errors[`issueDate${certification.id}`])}
                errorMessage={
                  errors[`issueDate${certification.id}`]
                    ? errors[`issueDate${certification.id}`].message
                    : null
                }
              /> */}
            </div>
          </div>
        ))}
        {localCertifications.length < 2 && (
          <div className="add-new-btn-cont">
            <Button onClick={addNewCertification} variant="text">
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

export default connect(mapStateToProps, mapDispatchToProps)(CertificationsComponent);
