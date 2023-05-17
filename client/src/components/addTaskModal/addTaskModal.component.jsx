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
import { CustomButton } from "../../globals/styles";
import { ModalContainer, CustomDateInput } from "./addTaskModal.styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useTask from "../../hooks/useTask";

const AddTaskModal = ({ state, toggleModal }) => {
  const [data, setData] = useState({
    description: "",
    category: "",
    startTime: "",
    duration: "",
  });
  const { addTask } = useTask();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    //console.log(data);
    addTask(data, toggleModal);
    // registerClient(data, toggleModal);
  };

  const maxDate = () => {
    var today, dd, mm, yyyy;
    today = new Date();
    dd = today.getDate();
    mm = today.getMonth() + 1;
    yyyy = today.getFullYear();
    if (mm < 10) mm = "0" + mm.toString();
    if (dd < 10) dd = "0" + dd.toString();
    return yyyy + "-" + mm + "-" + dd;
  };

  return (
    <Modal open={state} onClose={toggleModal}>
      <Slide direction="up" in={state}>
        <ModalContainer>
          <Typography sx={{ fontSize: "1.2em", fontWeight: 600 }}>
            ADD TASK
          </Typography>
          <TextField
            name="description"
            label="Task Description"
            variant="standard"
            multiline
            rows={4}
            fullWidth
            onChange={handleChange}
          />

          <FormControl fullWidth variant="standard">
            <InputLabel
              onChange={handleChange}
              name="category"
              id="demo-simple-select-label"
            >
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data.category}
              name="category"
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value="work">WORK</MenuItem>
              <MenuItem value="break">BREAK</MenuItem>
              <MenuItem value="meeting">MEETING</MenuItem>
            </Select>
          </FormControl>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              color: "gray",
            }}
          >
            <Typography>Start time:</Typography>
            <CustomDateInput
              max={maxDate()}
              onChange={handleChange}
              name="startTime"
              type="date"
            />
          </Box>
          <TextField
            name="duration"
            type={"number"}
            label="Task duration(in mins)"
            variant="standard"
            fullWidth
            onChange={handleChange}
          />
          <CustomButton onClick={handleSubmit}>ADD</CustomButton>
        </ModalContainer>
      </Slide>
    </Modal>
  );
};

export default AddTaskModal;
