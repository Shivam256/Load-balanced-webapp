import { Avatar, Typography, Box, useTheme } from "@mui/material";
import React, { useState } from "react";

import { MainPage } from "../../globals/styles";
import * as S from "./profile.styles";
import useAuth from "../../hooks/useAuth";
import { Icon } from "@iconify/react";
import EditProfileModal from "../../components/editProfileModal/editProfileModal.component";
import ChangePasswordModal from "../../components/changePasswordModal/changePasswordModal.component";

const Profile = () => {
  const { user } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const { breakpoints } = useTheme();

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  const togglePasswordModal = () => {
    setShowPasswordModal(!showPasswordModal);
  };

  return (
    <MainPage style={{padding:"0px"}} >
      <S.ProfileContainer>
        <S.BannerImage url="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
        <S.ProfileCard>
          <Avatar
            sx={{
              width: "150px",
              height: "150px",
              [breakpoints.down("lg")]: {
                width: "120px",
                height: "120px",
              },
              [breakpoints.down("md")]: {
                width: "100px",
                height: "100px",
              },
              [breakpoints.down("sm")]: {
                width: "80px",
                height: "80px",
              },
            }}
            src={user?.profilePic?.path}
          />
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <Typography
              sx={{
                fontSize: "2em",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              {user?.name}
              <Icon
                icon="akar-icons:edit"
                width="25px"
                height="25px"
                style={{ cursor: "pointer" }}
                onClick={toggleEditModal}
              />
              <Icon
                icon="bx:lock-open"
                width="25px"
                height="25px"
                style={{ cursor: "pointer" }}
                onClick={togglePasswordModal}
              />
              <EditProfileModal
                state={showEditModal}
                toggleModal={toggleEditModal}
              />
              <ChangePasswordModal
                state={showPasswordModal}
                toggleModal={togglePasswordModal}
              />
            </Typography>
            <Typography sx={{ fontWeight: 600, color: "#666666" }}>
              {user?.email}
            </Typography>
            <Typography>
              <Icon icon="bxs:building-house" /> {user?.department} Department
            </Typography>
            <Typography>
              <Icon icon="akar-icons:phone" /> {user?.phone}
            </Typography>
          </Box>
        </S.ProfileCard>
      </S.ProfileContainer>
    </MainPage>
  );
};

export default Profile;
