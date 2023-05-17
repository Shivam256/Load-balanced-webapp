import {
  MenuItem,
  Modal,
  Select,
  Slide,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { ModalContainer, PieChartContainer } from "./pieModal.styles";
import PieChartCard from "../../pages/employeeDashboard/PieChartCard";

const PieModal = ({ state, toggleModal, data, header }) => {
  return (
    <Modal open={state} onClose={toggleModal}>
      <Slide direction="up" in={state}>
        <ModalContainer>
          <Typography sx={{ fontSize: "1.2em", fontWeight: 600 }}>
            {header || "PIE CHART"}
          </Typography>
          <PieChartContainer>
            <PieChartCard data={data} />
          </PieChartContainer>
        </ModalContainer>
      </Slide>
    </Modal>
  );
};

export default PieModal;
