// import React from "react";
// import { useEffect, useState } from "react";
// import {
//   Divider,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
// } from "@mui/material";
// import IconButton from "@mui/material/IconButton";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import { Box } from "@mui/system";
// import { IconBriefcase, IconCarambola, IconDotsVertical, IconRosetteDiscountCheck, IconSchool, IconTool, IconTrophy, IconUserCircle } from "@tabler/icons-react";
// import './DetailsFillingSidebar.css'
// const ITEM_HEIGHT = 48;

// const DetailFillingSidebar = (props) => {
//   const getWindowSize = () => {
//     const { innerWidth, innerHeight } = window;
//     return { innerWidth, innerHeight };
//   };

//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [windowSize, setWindowSize] = useState(getWindowSize());
//   const open = Boolean(anchorEl);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   useEffect(() => {
//     function handleWindowResize() {
//       setWindowSize(getWindowSize());
//     }

//     window.addEventListener("resize", handleWindowResize);

//     return () => {
//       window.removeEventListener("resize", handleWindowResize);
//     };
//   }, []);

//   return (
//     <div>
//       {windowSize.innerWidth > 850 ? (
//         <Box
//           sx={{
//             width: "100%",
//             maxWidth: 360,
//             boxShadow: "0px 0px 4px 0px rgb(228, 228, 228)",
//             height: "fit-content",
//           }}>
//           <List disablePadding>
//             <ListItem disablePadding>
//               <ListItemButton
//                 component="a"
//                 sx={
//                   props.tab === 0
//                     ? { borderLeft: "3px solid #ffa550" }
//                     : null
//                 }>
//                 <IconUserCircle
//                   color={props.tab === 0 ? "info" : "disabled"}
//                 />
//                 <ListItemText
//                   className="IcoSpace p-1"
//                   primary="Personal Info"
//                   sx={
//                     props.tab === 0
//                       ? { color: "#ffa550", paddingLeft: "8px", }
//                       : null
//                   }
//                 />
//               </ListItemButton>
//             </ListItem>
//             <Divider />
//             <ListItem disablePadding>
//               <ListItemButton
//                 component="a"
//                 sx={
//                   props.tab === 1
//                     ? { borderLeft: "3px solid #ffa550" }
//                     : null
//                 }>
//                 <IconBriefcase
//                   color={props.tab === 1 ? "info" : "disabled"}
//                 />
//                 <ListItemText
//                   className="IcoSpace p-1"
//                   primary="Work Experience"
//                   sx={
//                     props.tab === 1
//                       ? { color: "#ffa550", paddingLeft: "8px" }
//                       : null
//                   }
//                 />
//               </ListItemButton>
//             </ListItem>
//             <Divider />
//             <ListItem disablePadding>
//               <ListItemButton
//                 component="a"
//                 sx={
//                   props.tab === 2
//                     ? { borderLeft: "3px solid #ffa550" }
//                     : null
//                 }>
//                 <IconSchool
//                   color={props.tab === 2 ? "info" : "disabled"}
//                 />
//                 <ListItemText
//                   className="IcoSpace p-1"
//                   primary="Education"
//                   sx={
//                     props.tab === 2
//                       ? { color: " #ffa550", paddingLeft: "8px" }
//                       : null
//                   }
//                 />
//               </ListItemButton>
//             </ListItem>
//             <Divider />
//             <ListItem disablePadding>
//               <ListItemButton
//                 component="a"
//                 sx={
//                   props.tab === 3
//                     ? { borderLeft: "3px solid  #ffa550" }
//                     : null
//                 }>
//                 <IconCarambola
//                   color={props.tab === 3 ? "info" : "disabled"}
//                 />
//                 <ListItemText
//                   className="IcoSpace p-1"
//                   primary="Key Skills"
//                   sx={
//                     props.tab === 3
//                       ? { color: " #ffa550", paddingLeft: "8px" }
//                       : null
//                   }
//                 />
//               </ListItemButton>
//             </ListItem>
//             <Divider />
//             <ListItem disablePadding>
//               <ListItemButton
//                 component="a"
//                 sx={
//                   props.tab === 4
//                     ? { borderLeft: "3px solid  #ffa550" }
//                     : null
//                 }>
//                 <IconTool
//                   color={props.tab === 4 ? "info" : "disabled"}
//                 />
//                 <ListItemText
//                   className="IcoSpace p-1"
//                   primary="Projects"
//                   sx={
//                     props.tab === 4
//                       ? { color: " #ffa550", paddingLeft: "8px" }
//                       : null
//                   }
//                 />
//               </ListItemButton>
//             </ListItem>
//             <Divider />
//             <ListItem disablePadding>
//               <ListItemButton
//                 component="a"
//                 sx={
//                   props.tab === 5
//                     ? { borderLeft: "3px solid  #ffa550" }
//                     : null
//                 }>
//                 <IconRosetteDiscountCheck
//                   color={props.tab === 5 ? "info" : "disabled"}
//                 />
//                 <ListItemText
//                   className="IcoSpace p-1"
//                   primary="Certifications"
//                   sx={
//                     props.tab === 5
//                       ? { color: " #ffa550", paddingLeft: "8px" }
//                       : null
//                   }
//                 />
//               </ListItemButton>
//             </ListItem>
//             <Divider />
//             <ListItem disablePadding>
//               <ListItemButton
//                 component="a"
//                 sx={
//                   props.tab === 6
//                     ? { borderLeft: "3px solid  #ffa550" }
//                     : null
//                 }>
//                 <IconTrophy
//                   color={props.tab === 6 ? "info" : "disabled"}
//                 />
//                 <ListItemText
//                   className="IcoSpace p-1"
//                   primary="Achievements"
//                   sx={
//                     props.tab === 6
//                       ? { color: " #ffa550", paddingLeft: "8px" }
//                       : null
//                   }
//                 />
//               </ListItemButton>
//             </ListItem>
//           </List>
//         </Box>
//       ) : (
//         <div>
//           <IconButton
//             aria-label="more"
//             id="long-button"
//             aria-controls={open ? "long-menu" : undefined}
//             aria-expanded={open ? "true" : undefined}
//             aria-haspopup="true"
//             onClick={handleClick}>
//             <IconDotsVertical />
//           </IconButton>
//           <Menu
//             id="long-menu"
//             MenuListProps={{
//               "aria-labelledby": "long-button",
//             }}
//             anchorEl={anchorEl}
//             open={open}
//             onClose={handleClose}
//             PaperProps={{
//               style: {
//                 maxHeight: ITEM_HEIGHT * 4.5,
//                 width: "20ch",
//               },
//             }}>
//             <MenuItem
//               sx={props.tab === 0 ? { color: " #ffa550" } : null}
//               onClick={() => {
//                 handleClose();
//                 props.onTabChange(0);
//               }}>
//               <IconUserCircle
//                 color={props.tab === 0 ? "info" : "disabled"}
//               />
//               <ListItemText
//                 className="IcoSpace p-1"
//                 primary="Personal Info"
//                 sx={
//                   props.tab === 0
//                     ? { color: " #ffa550", paddingLeft: "8px",fontSize:"30px" }
//                     : null
//                 }
//               />
//             </MenuItem>
//             <Divider />
//             <MenuItem
//               sx={props.tab === 1 ? { color: " #ffa550" } : null}
//               onClick={() => {
//                 handleClose();
//                 props.onTabChange(1);
//               }}>
//               <IconBriefcase
//                 color={props.tab === 1 ? "info" : "disabled"}
//               />
//               <ListItemText
//                 className="IcoSpace p-1"
//                 primary="Work Experience"
//                 sx={
//                   props.tab === 1
//                     ? { color: " #ffa550", paddingLeft: "8px" }
//                     : null
//                 }
//               />
//             </MenuItem>
//             <Divider />
//             <MenuItem
//               sx={props.tab === 2 ? { color: " #ffa550" } : null}
//               onClick={() => {
//                 handleClose();
//                 props.onTabChange(2);
//               }}>
//               <IconSchool
//                 color={props.tab === 2 ? "info" : "disabled"}
//               />
//               <ListItemText
//                 className="IcoSpace p-1"
//                 primary="Education"
//                 sx={
//                   props.tab === 2
//                     ? { color: " #ffa550", paddingLeft: "8px" }
//                     : null
//                 }
//               />
//             </MenuItem>
//             <Divider />
//             <MenuItem
//               sx={props.tab === 3 ? { color: " #ffa550" } : null}
//               onClick={() => {
//                 handleClose();
//                 props.onTabChange(3);
//               }}>
//               <IconCarambola
//                 color={props.tab === 3 ? "info" : "disabled"}
//               />
//               <ListItemText
//                 className="IcoSpace p-1"
//                 primary="Key Skills"
//                 sx={
//                   props.tab === 3
//                     ? { color: " #ffa550", paddingLeft: "8px" }
//                     : null
//                 }
//               />
//             </MenuItem>
//             <Divider />
//             <MenuItem
//               sx={props.tab === 4 ? { color: " #ffa550" } : null}
//               onClick={() => {
//                 handleClose();
//                 props.onTabChange(4);
//               }}>
//               <IconTool
//                 color={props.tab === 4 ? "info" : "disabled"}
//               />
//               <ListItemText
//                 className="IcoSpace p-1"
//                 primary="Projects"
//                 sx={
//                   props.tab === 4
//                     ? { color: " #ffa550", paddingLeft: "8px" }
//                     : null
//                 }
//               />
//             </MenuItem>
//             <Divider />
//             <MenuItem
//               sx={props.tab === 5 ? { color: " #ffa550" } : null}
//               onClick={() => {
//                 handleClose();
//                 props.onTabChange(5);
//               }}>
//               <IconRosetteDiscountCheck
//                 color={props.tab === 5 ? "info" : "disabled"}
//               />
//               <ListItemText
//                 className="IcoSpace p-1"
//                 primary="Certifications"
//                 sx={
//                   props.tab === 5
//                     ? { color: " #ffa550", paddingLeft: "8px" }
//                     : null
//                 }
//               />
//             </MenuItem>
//             <Divider />
//             <MenuItem
//               sx={props.tab === 6 ? { color: " #ffa550)" } : null}
//               onClick={() => {
//                 handleClose();
//                 props.onTabChange(6);
//               }}>
//               <IconTrophy color={props.tab === 6 ? "info" : "disabled"}
//               />
//               <ListItemText
//                 className="IcoSpace p-1"
//                 primary="Achievements"
//                 sx={
//                   props.tab === 6
//                     ? { color: " #ffa550", paddingLeft: "8px" }
//                     : null
//                 }
//               />
//             </MenuItem>
//           </Menu>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DetailFillingSidebar;


import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/system";
import {
  IconBriefcase,
  IconCarambola,
  IconDotsVertical,
  IconRosetteDiscountCheck,
  IconSchool,
  IconTool,
  IconTrophy,
  IconUserCircle,
} from "@tabler/icons-react";
import './DetailsFillingSidebar.css';

const ITEM_HEIGHT = 48;

const DetailFillingSidebar = (props) => {
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div>
      {windowSize.innerWidth > 850 ? (
        <Box className="sidebar-container">
          <List disablePadding>
            {['Personal Info', 'Work Experience', 'Education', 'Key Skills', 'Projects', 'Certifications', 'Achievements'].map((item, index) => (
              <React.Fragment key={index}>
                <ListItem disablePadding>
                  <ListItemButton
                    component="a"
                    className={props.tab === index ? "active-tab" : null}>
                    {index === 0 && <IconUserCircle className={props.tab === 0 ? "active-icon" : "default-icon"} />}
                    {index === 1 && <IconBriefcase className={props.tab === 1 ? "active-icon" : "default-icon"} />}
                    {index === 2 && <IconSchool className={props.tab === 2 ? "active-icon" : "default-icon"} />}
                    {index === 3 && <IconCarambola className={props.tab === 3 ? "active-icon" : "default-icon"} />}
                    {index === 4 && <IconTool className={props.tab === 4 ? "active-icon" : "default-icon"} />}
                    {index === 5 && <IconRosetteDiscountCheck className={props.tab === 5 ? "active-icon" : "default-icon"} />}
                    {index === 6 && <IconTrophy className={props.tab === 6 ? "active-icon" : "default-icon"} />}
                    <ListItemText
                      className="IcoSpace"
                      primary={item}
                      sx={props.tab === index ? { color: "#ffa550", paddingLeft: "8px" } : null}
                    />
                  </ListItemButton>
                </ListItem>
                {index < 6 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      ) : (
        <div>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}>
            <IconDotsVertical />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}>
            {['Personal Info', 'Work Experience', 'Education', 'Key Skills', 'Projects', 'Certifications', 'Achievements'].map((item, index) => (
              <React.Fragment key={index}>
                <MenuItem
                  className={props.tab === index ? "menu-item-text-active" : null}
                  onClick={() => {
                    handleClose();
                    props.onTabChange(index);
                  }}>
                  {index === 0 && <IconUserCircle className={props.tab === 0 ? "menu-item-icon-active" : "default-icon"} />}
                  {index === 1 && <IconBriefcase className={props.tab === 1 ? "menu-item-icon-active" : "default-icon"} />}
                  {index === 2 && <IconSchool className={props.tab === 2 ? "menu-item-icon-active" : "default-icon"} />}
                  {index === 3 && <IconCarambola className={props.tab === 3 ? "menu-item-icon-active" : "default-icon"} />}
                  {index === 4 && <IconTool className={props.tab === 4 ? "menu-item-icon-active" : "default-icon"} />}
                  {index === 5 && <IconRosetteDiscountCheck className={props.tab === 5 ? "menu-item-icon-active" : "default-icon"} />}
                  {index === 6 && <IconTrophy className={props.tab === 6 ? "menu-item-icon-active" : "default-icon"} />}
                  <ListItemText
                    className="IcoSpace"
                    primary={item}
                    sx={props.tab === index ? { color: "#ffa550", paddingLeft: "8px", fontSize: "30px" } : null}
                  />
                </MenuItem>
                {index < 6 && <Divider className="menu-divider" />}
              </React.Fragment>
            ))}
          </Menu>
        </div>
      )}
    </div>
  );
};

export default DetailFillingSidebar;
