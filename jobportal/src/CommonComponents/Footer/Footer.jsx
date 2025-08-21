import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import '../Footer.css';
import labels from '../../Labels/LandingPageLabel.json'
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  return (
    location.pathname !== "/sign-up" && location.pathname !== "/login" &&
    <div className="mt-5 gap-3 p-2 d-flex bg-dark justify-content-evenly footer-outer-container">
      <div className="d-flex flex-column align-items-start text-white gap-2">
        <div className="d-flex flex-row align-items-center">
          <img
            src='/Assests/images/JobSnapIcon1.png'
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="iJobs Logo"
          />
          <p className="mb-0 ms-2 fw-bold fs-4 fst-italic">{labels.footerLabels.title}</p>
        </div>
        <div className="footer-text">
          {labels.footerLabels.description}
        </div>
        <div className="footer-icons d-flex align-items-center">
          <Link className="footer-icon" to={labels.footerLabels.socialMedia.facebook}><FaFacebookF /></Link>
          <Link className="footer-icon" to={labels.footerLabels.socialMedia.instagram}><FaInstagram /></Link>
          <Link className="footer-icon" to={labels.footerLabels.socialMedia.twitter}><FaXTwitter /></Link>
        </div>
      </div>
      {
        labels.footerLabels.footerLinks?.map((item, index) => (
          <div key={index}>
            <div className="text-lg fw-bold mb-2 text-warning">{item.title}</div>
            {
              item.link?.map((link, linkIndex) => (
                <div key={linkIndex} className="mb-1 text-white">{link}</div>
              ))
            }
          </div>
        ))
      }
    </div>
  );
}
