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
  Avatar,
  Badge,
} from "@mui/material";
import { Fade } from "react-reveal";
import React, { useState, useEffect, useCallback } from "react";
import { CustomButton } from "../../globals/styles";
import { ModalContainer } from "./editProfile.styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../hooks/useAuth";
import { useDropzone } from "react-dropzone";
import { Icon } from "@iconify/react";
import useEmployees from "../../hooks/useEmployees";

const EditProfileModal = ({ state, toggleModal }) => {
  const [isUploadActive, setIsUploadActive] = useState(false);
  const [data, setData] = useState({
    name: "",
    department: "",
    profilePic: "",
  });
  const [imageToUpload, setImageToUpload] = useState(null);

  const { user } = useAuth();
  const { editProfile, apiloading } = useEmployees();

  const toggleIsUploadActive = () => {
    setIsUploadActive(!isUploadActive);
  };

  const onDrop = useCallback((acceptedFiles) => {
    //console.log(acceptedFiles);
    setData({
      name: user.name,
      department: user.department,
      profilePic: URL.createObjectURL(acceptedFiles[0]),
    });
    setImageToUpload(acceptedFiles[0]);
  }, []);

  const { getRootProps, isDragActive, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    if (user) {
      setData({
        name: user.name,
        department: user.department,
        profilePic: user?.profilePic?.path,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    //console.log(data);
    const formdata = new FormData();
    formdata.append("image", imageToUpload);
    formdata.append("name", data.name);
    formdata.append("department", data.department);
    editProfile(formdata, toggleModal);
  };

  return (
    <Modal open={state} onClose={toggleModal}>
      <Slide direction="up" in={state}>
        <ModalContainer>
          <Typography sx={{ fontSize: "1.2em", fontWeight: 600 }}>
            EDIT PROFILE
          </Typography>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Box
                sx={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "40px",
                  backgroundColor: "#8e8e8e",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  "& svg": {
                    transform: "scale(1.8)",
                  },
                }}
                onClick={toggleIsUploadActive}
              >
                {isUploadActive ? (
                  <Icon icon="ep:close-bold" color="white" />
                ) : (
                  <Icon icon="ci:edit" color="white" />
                )}
              </Box>
            }
          >
            <Avatar
              sx={{ width: "120px", height: "120px" }}
              src={data.profilePic}
            />
          </Badge>
          {isUploadActive ? (
            <Box sx={{ width: "100%" }}>
              <Fade>
                <Box
                  sx={{
                    border: isDragActive
                      ? "2px dashed #109ece"
                      : "2px dashed #a4a4a4",
                    width: "100%",
                    padding: "55px 20px",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  drag and drop the image here!
                </Box>
              </Fade>
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <TextField
                name="name"
                label="Name"
                variant="standard"
                fullWidth
                onChange={handleChange}
                value={data.name}
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
            </Box>
          )}

          <CustomButton onClick={handleSubmit} disabled={apiloading}>
            SAVE
          </CustomButton>
        </ModalContainer>
      </Slide>
    </Modal>
  );
};

export default EditProfileModal;
