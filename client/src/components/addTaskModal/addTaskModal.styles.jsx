import { Box, styled } from "@mui/material";
import palette from "../../theme/palette";

export const ModalContainer = styled(Box)(({theme}) => ({
  position: "absolute",
  width: "40vw",
  height: "fit-content",
  left: "30vw",
  top: "20vh",
  backgroundColor: "#fff",
  borderRadius: "10px",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  outline: "none",
  gap: "20px",
  [theme.breakpoints.down("lg")]: {
    width: "60vw",
    left: "20vw",
  },
  [theme.breakpoints.down("md")]: {
    width: "80vw",
    left: "10vw",
  },
  [theme.breakpoints.down("sm")]: {
    width: "90vw",
    left: "5vw",
  },
}));

export const CustomDateInput = styled("input")(() => ({
  border: "none",
  border: `2px solid ${palette.primary}`,
  borderRadius: "5px",
  padding: "2px 10px",
  color: palette.primary,
  gap: "10px",
}));
