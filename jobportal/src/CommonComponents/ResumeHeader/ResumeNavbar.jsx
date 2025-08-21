import "./ResumeNavbar.css";
import * as React from "react";
import { NavLink } from "react-router-dom";

function ResumeNavbar() {
  return (
    <>
      <div className="home-templates-header">
            <div className="resume-header">
              <h2 className="template-header-title">Templates</h2>
              <p className="template-select-text">Select a template to get started</p>
            </div>
            <div className="d-flex gap-3 navbarlinks">
                <NavLink to="/resume" className="nav-links" color="inherit">
                  ResumeTemplates
                </NavLink>
                <NavLink to="/my/resumes" className="nav-links" color="inherit">
                  My Resumes
                </NavLink>

              </div>
          </div>
    </>
  );
}

export default ResumeNavbar;