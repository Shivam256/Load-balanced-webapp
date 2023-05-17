import {
  Avatar,
  Box,
  Typography,
  Popover,
  Button,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import palette from "../../theme/palette";
import { Icon } from "@iconify/react";
import useAuth from "../../hooks/useAuth";
import * as S from "./header.styles";
import AddTaskModal from "../addTaskModal/addTaskModal.component";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { breakpoints } = useTheme();

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { logout, user } = useAuth();

  const toggleTaskModal = () => {
    setShowTaskModal(!showTaskModal);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <S.HeaderContainer>
      <S.FlexRow
        onClick={() => {
          if (user?.isAdmin) {
            navigate("/admin/home");
          } else {
            navigate("/employee/home");
          }
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Icon
            icon="game-icons:air-zigzag"
            className="logo"
            width="40px"
            height="40px"
            color={palette.backgrond1}
          />
          <Typography
            sx={{
              fontSize: "1.2em",
              fontWeight: 700,
              color: palette.surface,
              cursor: "pointer",
            }}
          >
            workfloe
          </Typography>
        </Box>
        {/* <S.CustomSearchBar type="text" placeholder="Search anything!" /> */}
      </S.FlexRow>
      <S.FlexRow>
        {/* {!user?.isAdmin ? (
          <Button
            sx={{
              backgroundColor: "#fff",
              fontSize: "0.8em",
              padding: "5px 10px",
              "&:hover": { backgroundColor: "#fff" },
              [breakpoints.down("md")]: {
                padding: "5px 7px",
                fontSize: "0.7em",
              },
            }}
            onClick={toggleTaskModal}
          >
            ADD TASK
          </Button>
        ) : null} */}
        {/* <AddTaskModal state={showTaskModal} toggleModal={toggleTaskModal} /> */}
        <Avatar src={user?.profilePic?.path} onClick={handleClick} />

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <S.HeaderMenu>
            <S.HeaderItem
              onClick={() => {
                if (user?.isAdmin) {
                  navigate("/admin/profile");
                } else {
                  navigate("/employee/profile");
                }
              }}
            >
              <Icon icon="bx:user-circle" />
              <Typography>PROFILE</Typography>
            </S.HeaderItem>

            <S.HeaderItem
              onClick={() => {
                logout();
              }}
            >
              <Icon icon="ant-design:logout-outlined" />
              <Typography>LOGOUT</Typography>
            </S.HeaderItem>
          </S.HeaderMenu>
        </Popover>
      </S.FlexRow>
    </S.HeaderContainer>
  );
};

export default Header;
