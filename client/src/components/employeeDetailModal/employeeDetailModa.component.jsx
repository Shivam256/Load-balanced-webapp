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
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { CustomButton } from '../../globals/styles';
import {
  ModalContainer,
  CustomDatePicker,
  PieContainer,
  TasksContainer,
  TaskOverview,
} from './employeeDetailsModal.styles';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import PieChartCard from '../../pages/employeeDashboard/PieChartCard';
import { getPieData, getTasksFromDate } from '../../utils/piedata';

const EmployeeDetailsModal = ({ state, toggleModal, tasks }) => {
  const [date, setDate] = useState(null);
  const [dayTasks, setDayTasks] = useState([]);
  const [pieData, setPieData] = useState([
    { name: 'meetings', value: 0 },
    { name: 'break', value: 0 },
    { name: 'works', value: 0 },
  ]);
  const { breakpoints } = useTheme();

  const handleChange = (e) => {
    setDate(e.target.value);
  };
  const { enqueueSnackbar } = useSnackbar();
  const handleFetch = () => {
    //console.log(date);
    setDayTasks(getTasksFromDate(tasks, date));
    setPieData(getPieData(tasks, moment(date).format('MMM Do YY')));
  };

  return (
    <Modal open={state} onClose={toggleModal}>
      <Slide direction="up" in={state}>
        <ModalContainer>
          <Typography sx={{ fontSize: '1.2em', fontWeight: 600 }}>
            FILTER TASKS BY DATE
          </Typography>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ fontSize: '1.2em', fontWeigjht: 600 }}>
              Select date:
            </Typography>
            <CustomDatePicker type="date" onChange={handleChange} />
            <CustomButton onClick={handleFetch}>FETCH</CustomButton>
          </Box>
          <Box
            sx={{
              width: '100%',
              flex: 1,
              display: 'flex',
              gap: '20px',
              maxHeight: '80%',
              [breakpoints.down('md')]: {
                flexDirection: 'column',
              },
            }}
          >
            <PieContainer>
              <Typography sx={{ fontWeight: 700 }}>Pie Chart:</Typography>
              {date != null ? (
                <Box sx={{ width: '100%', height: '100%' }}>
                  <PieChartCard data={pieData} />
                </Box>
              ) : null}
            </PieContainer>
            <TasksContainer>
              <Typography sx={{ fontWeight: 700 }}>Tasks:</Typography>
              {dayTasks.length > 0 ? (
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    overflowY: 'auto',
                    padding: '10px',
                    flex: 1,
                    // backgroundColor: "red",
                  }}
                >
                  {dayTasks.map((task) => (
                    <TaskOverview>
                      <Typography sx={{ fontSize: '0.9em', fontWeight: 700 }}>
                        {task.category}
                      </Typography>
                      <Typography sx={{ color: '#a4a4a4' }}>
                        {task.description}
                      </Typography>
                      <Typography>
                        {moment(task.startTime).format('Do MMM YY')} -{' '}
                        {task.duration} min
                      </Typography>
                    </TaskOverview>
                  ))}
                </Box>
              ) : (
                <Box>
                  <Typography>No tasks on the selected day!</Typography>
                </Box>
              )}
            </TasksContainer>
          </Box>
        </ModalContainer>
      </Slide>
    </Modal>
  );
};

export default EmployeeDetailsModal;
