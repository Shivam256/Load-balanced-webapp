import { Box, styled } from "@mui/material";
import palette from "../../theme/palette";

export const ModalContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "60vw",
  height: "70vh",
  left: "20vw",
  top: "15vh",
  backgroundColor: "#fff",
  borderRadius: "10px",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  outline: "none",
  gap: "20px",
  [theme.breakpoints.down("lg")]: {
    width: "80vw",
    left: "10vw",
  },
  [theme.breakpoints.down("md")]: {
    width: "90vw",
    left: "5vw",
    height: "80vh",
    top: "10vh",
  },
  [theme.breakpoints.down("sm")]: {
    width: "94vw",
    left: "3vw",
  },
}));

export const CustomDatePicker = styled("input")(() => ({
  height: "100%",
  borderRadius: "5px",
  padding: "5px 10px",
  border: "none",
  borderColor: palette.primary,
  border: `1px solid ${palette.primary}`,
  color: palette.primary,
  outline: "none",
  "&:focus": { outline: "none" },
}));

export const PieContainer = styled(Box)(({ theme }) => ({
  height: "100%",
  flex: 1,
  // border:`2px solid ${palette.primary}`,
  // borderRadius:'10px',
  [theme.breakpoints.down("md")]: {
    height: "50%",
    width: "100%",
    flex: 1,
  },
}));

export const TasksContainer = styled(Box)(({ theme }) => ({
  height: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  // padding: "0px 10px",
  // border:`2px solid ${palette.primary}`,
  // borderRadius:'10px',
  [theme.breakpoints.down("md")]: {
    height: "50%",
    width: "100%",
    flex: 1,
  },
}));

export const TaskOverview = styled(Box)(() => ({
  width: "100%",
  height: "fit-content",
  padding: "10px",
  boxShadow: palette.shadow1,
  borderRadius: "5px",
}));
