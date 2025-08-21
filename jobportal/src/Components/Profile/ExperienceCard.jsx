import React from "react";
import { ActionIcon, Tooltip, } from '@mantine/core'
import ExperienceInput from "./ExperienceInput";
import { formatDate } from "../../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import labels from '../../Labels/ProfileLabel.json'
export default function ExperienceCard(props) {
  const [edit, setEdit] = React.useState(false);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const handleDelete = () => {
    let exp = [...profile.experiences];
    exp.splice(props.index, 1);
    let updatedProfile = { ...profile, experiences: exp }
    dispatch(changeProfile(updatedProfile));
    successNotification(labels.profilelabel.success, labels.experienceLabels.successDeleteMessage);

  }
  
  const defaultImage = '/Assests/images/CompanyImage.jpg'; 

  const companyImage = `/Assests/Icons/${props.company}.png`;
  return (
    !edit ? <div className="ExperienceCard">
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div className="m-1">
            <img
              style={{ width: "90px", height: "50px" }}
              src={companyImage}
              onError={(e)=>e.target.src=defaultImage}
              alt={props.company}
            ></img>

          </div>
          <div>
            <div className="fw-semibold ">{props.title}</div>
            <div className="">
              {props.company} &#x2022;{props.location}
            </div>
          </div>
        </div>
        <div className="text-sm fw-semibold">{formatDate(props.startDate)}-{props.working ? "Present" : formatDate(props.endDate)}
          {
            props.edit &&
            <div className="d-flex m-2 gap-2 justify-content-end">
              <Tooltip label="Edit" withArrow position="top-center" color="#ffa520" className="text-black">
                <ActionIcon onClick={() => setEdit(true)} color="orange" variant="subtle"><IconEdit stroke={1.8} color="orange" /></ActionIcon>
              </Tooltip>
              <Tooltip label="Delete" withArrow position="top-center" color="#ffa520" className="text-black">
                <ActionIcon color="red" variant="subtle" onClick={handleDelete}><IconTrash stroke={1.5} color="red" /></ActionIcon>
              </Tooltip></div>}
        </div>
      </div>
      <div className="text-center mb-3" style={{ textAlign: 'justify' }}>
        <strong> {labels.experienceLabels.description}</strong>: {props.description}
      </div>


    </div> : <ExperienceInput  {...props} setEdit={setEdit} />

  );
}
