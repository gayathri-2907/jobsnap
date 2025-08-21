import React, { useState, useCallback, useEffect } from "react";
import { Menu, Avatar, Switch} from "@mantine/core";
import { IconUserCircle, IconFileText, IconMoon, IconSun, IconMoonStars, IconLogout2 } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, setUser } from "../../Slices/UserSlice";
import { successNotification } from "../../Services/NotificationService";
import { Link } from "react-router-dom";
import labels from '../../Labels/LandingPageLabel.json';
import commonLabels from "../../Labels/Labels.json";
export function ProfileMenu() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const [checked, setChecked] = useState(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser))); 
    }
  }, [dispatch]);
  const handleLogout = useCallback(() => {
    dispatch(removeUser());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("profile")
    successNotification(commonLabels.notifications.success, labels.profileMenuLabels.logoutSuccess);
    window.location.href = "/"; 
  }, [dispatch]);

  const toggleDarkMode = (event) => {
    setChecked(event.currentTarget.checked);
    if (event.currentTarget.checked) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  useEffect(() => {
    if (checked) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [checked]);

  return (
    <>
      <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
        <Menu.Target>
          <div className="d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
            <Avatar
              src={profile?.profilePicture ? `data:image/jpeg;base64,${profile.profilePicture}` : '/Assests/images/profileavatar.png'}
              alt={profile?.profilePicture}
            />
            <div className="text-white fw-bold">Hi, {user.userName}</div>
          </div>
        </Menu.Target>

        <Menu.Dropdown>
          <Link to="/profile" className="text-decoration-none">
            <Menu.Item leftSection={<IconUserCircle size={14} />}>{labels.profileMenuLabels.profile}</Menu.Item>
          </Link>
          {user.accountType === "APPLICANT" && (
            <Link to="/resume" className="text-decoration-none">
              <Menu.Item leftSection={<IconFileText size={14} />}>{labels.profileMenuLabels.resume}</Menu.Item>
            </Link>
          )}

          <Menu.Item
            leftSection={<IconMoon size={14} />}
            rightSection={
              <Switch
                checked={checked}
                onChange={toggleDarkMode}
                size="md"
                color="orange"
                onLabel={<IconSun stroke={2.5} color="yellow" />}
                offLabel={<IconMoonStars stroke={2.5} color="black" />}
              />
            }
          >
            {labels.profileMenuLabels.darkMode}
          </Menu.Item>

          <Menu.Divider />
          <Menu.Item onClick={handleLogout} color="red" leftSection={<IconLogout2 size={14} />}>
          {labels.profileMenuLabels.logout}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

    </>
  );
}