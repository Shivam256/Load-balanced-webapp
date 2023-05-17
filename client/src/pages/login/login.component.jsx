import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import EmployeeLottie from "../../assets/employee.json";
import * as S from "./login.styles";
import { CustomButton } from "../../globals/styles";
import { Icon } from "@iconify/react";
import palette from "../../theme/palette";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login, isLoggedIn, user, apiloading } = useAuth();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: EmployeeLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    login(data);
  };
  useEffect(() => {
    if (isLoggedIn) {
      if (user.isAdmin) {
        navigate("/admin/home");
      } else {
        navigate("/employee/home");
      }
    }
  }, [isLoggedIn]);

  return (
    <S.LoginPage>
      <div className="logo">
        <Typography sx={{ fontSize: "1.5em", fontWeight: 600 }}>
          workfloe
        </Typography>
      </div>
      <S.SectionsContainer>
        <S.LottieContainer>
          <Lottie options={defaultOptions} height="80%" width="80%" />
        </S.LottieContainer>
        <S.LoginFormContainer>
          {/* <Typography sx={{fontSize:'2em',fontWeight:600,textAlign:'center'}} >Login to your workfloe account!</Typography> */}
          <S.LoginCard>
            <Icon
              icon="game-icons:air-zigzag"
              className="logo"
              width="100px"
              height="100px"
              color={palette.primary}
            />
            <Typography sx={{ fontSize: "1.5em" }}>
              Login to your account!
            </Typography>
            <TextField
              variant="standard"
              label="Email"
              fullWidth
              name="email"
              value={data.email}
              onChange={handleChange}
            />
            <TextField
              variant="standard"
              label="Password"
              fullWidth
              type="password"
              name="password"
              value={data.value}
              onChange={handleChange}
            />
            <CustomButton onClick={handleLogin} disabled={apiloading}>
              LOGIN
              {apiloading ? (
                <CircularProgress size="15px"  />
              ) : null}
            </CustomButton>
          </S.LoginCard>
        </S.LoginFormContainer>
      </S.SectionsContainer>
    </S.LoginPage>
  );
};

export default Login;
