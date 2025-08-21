import React from "react";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { formatDate } from "../../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";
import CertificateInput from "./CertificateInput";
import labels from '../../Labels/ProfileLabel.json'
export default function CertificateCard(props) {
const [edit,setEdit] = React.useState(false);
const profile=useSelector((state)=>state.profile);
const dispatch = useDispatch();
const handleDelete=()=>{
  let certificate=[...profile.certifications];
  certificate.splice(props.index,1);
  let updatedProfile={...profile,certifications:certificate}
  dispatch(changeProfile(updatedProfile));
  successNotification(labels.profilelabel.success,labels.certificationLabels.successDeleteMessage);
}
const defaultImage = '/Assests/images/CompanyImage.jpg'; 

  const companyImage = `/Assests/Companies/${props.issuer}.png`;
  return (
      !edit?<div className="d-flex justify-content-between mb-3">
        <div className="d-flex ">
          <div className="m-1 me-2">
            <img
              style={{ width: "70px", height: "50px" }}
              src={companyImage}
              onError={(e)=>e.target.src=defaultImage}
              alt={props.issuer}
            ></img>
          </div>
          <div>
            <div className="fw-semibold ">{props.title}</div>
            <div> {labels.certificationLabels.issuedBy}: {props.issuer}</div>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3">
        <div className="d-flex flex-column align-items-end">
        <div > {labels.certificationLabels.issuedOn} {formatDate(props.issueDate)}</div>
        <div className="fw-semibold">{props.certificateID}</div>
        </div>
        {
          props.edit &&
        <div className="d-flex m-2 gap-2">
        <Tooltip label="Edit" withArrow position="top-center" color="#ffa520" className="text-black">
         <ActionIcon onClick={()=>setEdit(true)} color="orange" variant="subtle"><IconEdit stroke={1.8} color="orange"/></ActionIcon>
         </Tooltip>
         <Tooltip label="Delete" withArrow position="top-center" color="#ffa520" className="text-black">
        <ActionIcon color="red" variant="subtle" onClick={handleDelete}><IconTrash stroke={1.5} color="red"/></ActionIcon>
        </Tooltip>
        </div>
        }
        </div>
      </div>:<CertificateInput {...props} setEdit={setEdit}/>
  );
}
