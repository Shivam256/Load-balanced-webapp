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
} from '@mui/material';
import React, { useState } from 'react';
import { CustomButton } from '../../globals/styles';
import { ModalContainer } from './addEmployeeModal.styles';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAuth from '../../hooks/useAuth';
const AddEmployeeModal = ({ state, toggleModal }) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: 0,
    department: '',
    joiningDate: '',
    password: '',
  });
  const { registerClient } = useAuth();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    registerClient(data, toggleModal);
  };

  return (
    <Modal open={state} onClose={toggleModal}>
      <Slide direction="up" in={state}>
        <ModalContainer>
          <Typography sx={{ fontSize: '1.2em', fontWeight: 600 }}>
            ADD EMPLOYEE
          </Typography>
          <TextField
            name="name"
            label="Employee Name"
            variant="standard"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="Employee Email"
            variant="standard"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            name="password"
            label="Employee Password"
            variant="standard"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            name="phone"
            label="Employee Phone"
            variant="standard"
            fullWidth
            onChange={handleChange}
          />
          <FormControl fullWidth variant="standard">
            <InputLabel
              onChange={handleChange}
              name="department"
              id="demo-simple-select-label"
            >
              Department
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data.department}
              name="department"
              label="Department"
              onChange={handleChange}
            >
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="Production">Production</MenuItem>
              <MenuItem value="Transport">Transport</MenuItem>
            </Select>
          </FormControl>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              gap: '20px',
              color: 'gray',
            }}
          >
            <Typography>Date:</Typography>
            <input onChange={handleChange} name="joiningDate" type="date" />
          </Box>
          <CustomButton onClick={handleSubmit}>ADD</CustomButton>
        </ModalContainer>
      </Slide>
    </Modal>
  );
};

export default AddEmployeeModal;
