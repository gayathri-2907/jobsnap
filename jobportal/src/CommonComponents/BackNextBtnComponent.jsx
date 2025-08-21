import { Button, CircularProgress } from "@mui/material";
import React from "react";
import '../Styles/MyResumes.css';

const BackNextBtnComponent = (props) => {
  return (
    <div className="d-flex w-100 justify-content-end align-items-center">
      {props.tab === 0 ? null : (
        <Button
          onClick={props.onBack}
          className="outlined-btn"
          sx={{ marginRight: "20px" }}
          variant="outlined">
          {props.backTitle}
        </Button>
      )}
      {props.onSkip && (
        <Button
          onClick={props.onSkip}
          className="outlined-btn"
          sx={{ marginRight: "20px" }}
          variant="outlined">
          Skip
        </Button>
      )}
      {props.loading ? (
        <CircularProgress size={25} />
      ) : (
        <Button type="submit" className="contained-btn" variant="contained">
          {props.nextTitle}
        </Button>
      )}
    </div>
  );
};

export default BackNextBtnComponent;
