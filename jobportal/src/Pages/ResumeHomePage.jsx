import React from "react";
import "../Styles/ResumeHomePage.css";
import { templates } from "../Services/Utilities"
import BlackScreen from "../CommonComponents/BlackScreen";
import { Button, Stack } from "@mui/material";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTemplate } from "../Redux/actions";
import ResumeNavbar from "../CommonComponents/ResumeHeader/ResumeNavbar";

const mapStateToProps = (state) => ({
  selectedTemplateId: state.selectedTemplateReducer?.selectedTemplateId,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedTemplateId: (id) => dispatch(selectTemplate(id)),
});

const ResumeHomePage = (props) => {
  const navigate = useNavigate();

  const navigateToFillDetails = (id) => {
    props.setSelectedTemplateId(id);
    navigate("/template/fill-details");
  };
  
  return (
    <>
      
      <>
         <div className="home">
        <div className="home-templates-cont">
          <ResumeNavbar />
          
          <Stack
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: {
                sm: "1fr 1fr",
                md: "1fr 1fr",
                lg: "1fr 1fr 1fr",
                xl: "1fr 1fr 1fr 1fr",
              },
              gridGap: "0px",
            }}>
            {templates.map((template) => {
              return (
                <div key={template.id} id="template" className="templates-img-cont">
                  <img
                    className="template-img"
                    src={template.template_img}
                    alt={template.template_name}
                  />
                  <BlackScreen />
                  <Button
                    className="use-template-btn"
                    onClick={() => navigateToFillDetails(template.id)}
                    size="medium"
                    variant="contained">
                    Use Template
                  </Button>
                </div>
              );
            })}
          </Stack>
        </div>
      </div>
      </>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ResumeHomePage);
