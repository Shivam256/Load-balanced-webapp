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
import { ModalContainer } from './changePasswordModal.styles';
import { useSnackbar } from 'notistack';
import useAuth from '../../hooks/useAuth';

const ChangePasswordModal = ({ state, toggleModal }) => {
  const [data, setData] = useState({
    oldpassword: '',
    newpassword: '',
    cpassword: '',
  });
  const { changePassword } = useAuth();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = () => {
    //console.log(data);
    if (data.newpassword !== data.cpassword) {
      enqueueSnackbar('Passwords do not match', { variant: 'error' });
      return;
    }
    changePassword({
      newpassword: data.newpassword,
      oldpassword: data.oldpassword,
    });
    toggleModal();
    // registerClient(data, toggleModal);
  };

  return (
    <Modal open={state} onClose={toggleModal}>
      <Slide direction="up" in={state}>
        <ModalContainer>
          <Typography sx={{ fontSize: '1.2em', fontWeight: 600 }}>
            CHANGE PASSWORD
          </Typography>

          <TextField
            name="oldpassword"
            label="Old password"
            variant="standard"
            fullWidth
            type="password"
            onChange={handleChange}
          />
          <TextField
            name="newpassword"
            label="New password"
            variant="standard"
            fullWidth
            type="password"
            onChange={handleChange}
          />
          <TextField
            name="cpassword"
            label="Confirm new password"
            variant="standard"
            fullWidth
            type="password"
            onChange={handleChange}
          />
          <CustomButton onClick={handleSubmit}>CHANGE</CustomButton>
        </ModalContainer>
      </Slide>
    </Modal>
  );
};

export default ChangePasswordModal;
