import { styled, Box } from "@mui/material";
import palette from "../../theme/palette";

export const EmployeeDetailContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "row",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: "30px",
  },
}));

export const ContainerLeft = styled(Box)(({ theme }) => ({
  height: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    flex: 0.5,
  },
}));

export const ContainerRight = styled(Box)(() => ({
  height: "100%",
  flex: 3,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
}));

export const EmployeeProfileContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    flex: 1,
    height: "100%",
    justifyContent: "start",
  },
}));

export const EmployeeInfoContainer = styled(Box)(({ theme }) => ({
  width: "85%",
  height: "100%",
  backgroundColor: "#fff",
  borderRadius: "20px",
  boxShadow: palette.shadow1,
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "15px",
  [theme.breakpoints.down("lg")]: {
    width: "90%",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    flexDirection: "column",
  },
}));

export const EmployeeInfo = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  marginTop: "20px",
  gap: "15px",
  "& .flx": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
  },
  [theme.breakpoints.down("md")]: {
    flex: 3,
    gap: "7px",
    marginTop: "0px",
  },
}));

export const BarChartContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  borderRadius: "20px",
  boxShadow: palette.shadow1,
  backgroundColor: "#fff",
  padding: "30px 30px 0px 0px",
  flex: 1,
  [theme.breakpoints.down("md")]: {
    flex: 1.5,
  },
}));

export const PieChartsContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "row",
  gap: "30px",
  [theme.breakpoints.down("md")]: {
    flex: 2,
    flexDirection: "column",
  },
}));

export const PieChartContainer = styled(Box)(() => ({
  height: "100%",
  flex: 1,
  borderRadius: "20px",
  boxShadow: palette.shadow1,
  backgroundColor: "#fff",
  padding: "20px",
}));
