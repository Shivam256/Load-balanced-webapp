import { Box, styled } from "@mui/material";

export const ModalContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "30vw",
  height: "fit-content",
  left: "35vw",
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
    width: "50vw",
    left: "25vw",
  },
  [theme.breakpoints.down("md")]: {
    width: "70vw",
    left: "15vw",
  },
  [theme.breakpoints.down("sm")]: {
    width: "90vw",
    left: "5vw",
  },
}));
