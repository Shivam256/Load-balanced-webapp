import { styled, Box } from "@mui/material";
import palette from "../../theme/palette";

export const ProfileContainer = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const BannerImage = styled(Box)(({ url,theme }) => ({
  width: "100%",
  height: "300px",
  backgroundImage: `url(${url})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  [theme.breakpoints.down("md")]:{
    height:'200px'
  }
}));

export const ProfileCard = styled(Box)(({ theme }) => ({
  width: "40%",
  height: "fit-content",
  padding: "30px 30px",
  borderRadius: "30px",
  // boxShadow: "24px 24px 48px #e7e9e9,-24px -24px 48px #ffffff",
  display: "flex",
  boxShadow:palette.shadow1,
  flexDirection: "row",
  gap: "30px",
  alignItems: "center",
  backgroundColor: "#fff",
  transform: 'translateY(-100px)',
  [theme.breakpoints.down("lg")]: {
    width: "60%",
  },
  [theme.breakpoints.down("md")]: {
    width: "80%",
    borderRadius: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "94%",
    borderRadius: "10px",
  },
}));
