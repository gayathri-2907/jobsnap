import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectTemplate } from "../Redux/actions";

// const mapStateToProps = (state) => ({
//   selectedTemplateId: state.selectedTemplateReducer.selectedTemplateId,
// });
const mapStateToProps = (state) => ({
  selectedTemplateId: state.selectedTemplate.selectedTemplateId, // Correctly access the nested state
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedTemplateId: (id) => dispatch(selectTemplate(id)),
});

const CheckSelectedId = (props) => {
  const selectedId = props.selectedTemplateId;
  return selectedId ? props.children : <Navigate to={"/"} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckSelectedId);
