import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/header/header.component";
import { Box } from "@mui/material";

const MainLayout = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    } else {
      if (pathname === "/") {
        if (user.isAdmin) {
          navigate("/admin/home");
        } else {
          navigate("/employee/home");
        }
      } else {
        navigate(pathname);
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!user || user.isAdmin) {
      navigate("/");
    }
  }, [user]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box sx={{ width: "100%", flex: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
