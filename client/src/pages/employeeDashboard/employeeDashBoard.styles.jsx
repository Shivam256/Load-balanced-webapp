import { styled, Box } from "@mui/material";
import palette from "../../theme/palette";
export const PieChartStyles = styled(Box)(({theme}) => ({
  // width: "24rem",
  width: "100%",
  height: "14rem",
  // flex:1,
  padding: "15px",
  borderRadius: "30px",
  boxShadow: "10px 10px 20px #cbcdce, -10px -10px 20px #ffffff;",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  // margin: "1rem",
  [theme.breakpoints.down("md")]:{
    borderRadius:"20px",
  },
  [theme.breakpoints.down("md")]:{
    borderRadius:"10px",
  },
}));
export const RightSide = styled(Box)(({ theme }) => ({
  // width: "fit-content",
  // maxWidth:"68vw",
  flex: 1,
  height: "100%",
  // maxWidth:'70vw',
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  flexDirection: "column",
  padding: "0px 10px",
  gap: "30px",
  [theme.breakpoints.down("md")]: {
    height: "50vh",
  },
  [theme.breakpoints.down("sm")]: {
    height: "30vh",
  },
}));
export const Card = styled(Box)(({ theme }) => ({
  // width: "18rem",
  flex: 1,
  // height: "10rem",
  height: "100%",
  padding: "15px",
  borderRadius: "30px",
  boxShadow: "10px 10px 20px #cbcdce, -10px -10px 20px #ffffff;",
  display: "flex",
  flexDirection: "column",
  // backgroundColor:"#fff",
  // margin: "1rem",
  // marginTop: "0rem",
  justifyContent: "space-between",
  alignItems: "flex-start",
  padding: "1rem",
  transition: "0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.04)",
  },
  [theme.breakpoints.down("md")]:{
    borderRadius:"20px",
  },
  [theme.breakpoints.down("md")]:{
    borderRadius:"10px",
  },
}));

export const BarChartStyles = styled(Box)(({ theme }) => ({
  width: "100%",
  flex: 1,
  padding: "15px",
  borderRadius: "30px",
  boxShadow: "10px 10px 20px #cbcdce, -10px -10px 20px #ffffff;",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    height: "50vh",
    maxHeight: "50vh",
    borderRadius: "20px",
  },
  [theme.breakpoints.down("md")]: {
    height: "40vh",
    maxHeight: "40vh",
    borderRadius: "10px",
  },
}));
