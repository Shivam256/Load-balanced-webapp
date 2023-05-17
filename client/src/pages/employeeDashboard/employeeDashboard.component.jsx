import { Typography, Box, Avatar, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  PieChartStyles,
  RightSide,
  Card,
  BarChartStyles,
} from "./employeeDashBoard.styles";
import { Icon } from "@iconify/react";
import palette from "../../theme/palette";
import useAuth from "../../hooks/useAuth";
import moment from "moment";
import PieChartCard from "./PieChartCard";
import { getPieData, getWeekData } from "../../utils/piedata";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { CustomButton, MainPage } from "../../globals/styles";
import EmployeeDetailsModal from "../../components/employeeDetailModal/employeeDetailModa.component";
import CountUp from "react-countup";
import AddTaskModal from "../../components/addTaskModal/addTaskModal.component";

const getTasksCount = (tasks) => {
  const meetings = tasks.filter((a) => a.category == "meeting").length;
  const breaks = tasks.filter((a) => a.category == "break").length;
  const works = tasks.filter((a) => a.category == "work").length;

  return {
    meetings,
    breaks,
    works,
  };
};

const minToHours = (mins) => {
  var hours = Math.trunc(mins / 60);
  var minutes = mins % 60;
  return hours + "." + minutes;
};

const getTaskDuration = (tasks) => {
  var meeting = 0;
  var work = 0;
  var totalbreak = 0;
  // //console.log(tasks)
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].category === "work") {
      work += tasks[i].duration;
    } else if (tasks[i].category === "break") {
      totalbreak += tasks[i].duration;
    } else if (tasks[i].category === "meeting") {
      meeting += tasks[i].duration;
    }
  }

  return {
    meeting: meeting,
    work: work,
    totalbreak: totalbreak,
  };
};

const StatCard = ({ type, iconName, duration }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { breakpoints } = useTheme();
  return (
    <Card
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <Icon icon={iconName} width="40px" height="40px" color="black" />
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          [breakpoints.down("md")]: {
            fontSize: "1.3em",
          },
          [breakpoints.down("md")]: {
            fontSize: "1.1em",
          },
        }}
      >
        {isHovered ? (
          minToHours(duration)
        ) : (
          <CountUp end={duration || 0} duration={1.5} />
        )}
      </Typography>
      <Typography
        sx={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#888FA3",
          [breakpoints.down("md")]: {
            fontSize: "1em",
          },
          [breakpoints.down("md")]: {
            fontSize: "0.8em",
          },
        }}
      >
        {type} {isHovered ? "hours" : "minutes"}
      </Typography>
    </Card>
  );
};

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const data = getTasksCount(user.tasks);
  const duration = getTaskDuration(user.tasks);
  var yesterday = new Date(Date.now() - 864e5);
  const cDate = moment(new Date()).format("MMM Do YY");
  const yDate = moment(yesterday).format("MMM Do YY");
  const [showDateModal, setShowDateModal] = useState(false);
  const { breakpoints } = useTheme();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [greeting, setGreeting] = useState("");

  const toggleTaskModal = () => {
    setShowTaskModal(!showTaskModal);
  };

  const toggleDateModal = () => {
    setShowDateModal(!showDateModal);
  };

  useEffect(() => {
    let d = new Date();
    let time = d.getHours();
    if (time < 12) {
      setGreeting("Good Morning");
    } else if (time < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  return (
    <MainPage>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            marginBottom: "20px",
            justifyContent: "space-between",
            paddingRight: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "2em",
              letterSpacing: "2px",
              fontWeight: 600,
              [breakpoints.down("md")]: {
                fontSize: "1.2em",
              },
            }}
          >
            {greeting || "Good Morning"},{" "}
            <u style={{ color: palette.primary }}>{user?.name}</u>!
          </Typography>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <CustomButton onClick={toggleDateModal} size="small">
              FILTER BY DATE
            </CustomButton>
            <CustomButton onClick={toggleTaskModal} size="small">
              ADD TASK
            </CustomButton>
          </Box>
          <EmployeeDetailsModal
            state={showDateModal}
            toggleModal={toggleDateModal}
            tasks={user.tasks}
          />
          <AddTaskModal state={showTaskModal} toggleModal={toggleTaskModal} />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flex: 1,
            gap: "25px",
            [breakpoints.down("md")]: {
              flexDirection: "column-reverse",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "column",
              width: "fit-content",
              gap: "1.5rem",
              width: "25%",
              [breakpoints.down("md")]: {
                width: "100%",
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "fit-content",
                padding: "20px",
                // backgroundColor: "#fff",
                boxShadow: "10px 10px 20px #cbcdce, -10px -10px 20px #ffffff;",
                borderRadius: "20px",
                display: "flex",
                gap: "20px",
                [breakpoints.down("md")]: {
                  borderRadius: "15px",
                },
                [breakpoints.down("md")]: {
                  borderRadius: "10px",
                },
              }}
            >
              <Avatar
                src={user?.profilePic?.path}
                sx={{ width: "80px", height: "80px" }}
              />
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <Typography sx={{ fontWeight: 600, fontSize: "1.2em" }}>
                  {user?.name}
                </Typography>
                <Typography sx={{ fontSize: "0.8em", color: "#7e7e7e" }}>
                  #{user?._id}
                </Typography>
                <Typography
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Icon icon="bxs:building-house" /> {user?.department}{" "}
                  Department
                </Typography>
              </Box>
            </Box>

            <PieChartStyles>
              <Typography
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                }}
              >
                Today
              </Typography>
              <PieChartCard data={getPieData(user.tasks, cDate)} />
            </PieChartStyles>

            <PieChartStyles>
              <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                Yesterday
              </Typography>

              <PieChartCard data={getPieData(user.tasks, yDate)}></PieChartCard>
            </PieChartStyles>
          </Box>
          {/* right */}
          <RightSide>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                width: "100%",
                gap: "1.5rem",
                height: "25%",
                [breakpoints.down("md")]: {
                  height: "50%",
                },
                [breakpoints.down("sm")]: {
                  height: "35%",
                },
              }}
            >
              <StatCard
                type="Meeting"
                duration={duration.meeting}
                iconName="clarity:employee-group-solid"
              />
              <StatCard
                type="Work"
                duration={duration.work}
                iconName="ic:baseline-work-history"
              />
              <StatCard
                type="Break"
                duration={duration.totalbreak}
                iconName="ci:coffee-togo"
              />
            </Box>

            <BarChartStyles>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width="100%"
                  height="100%"
                  data={getWeekData(user.tasks)}
                >
                  <CartesianGrid />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="meeting" stackId="a" fill="#0088FE" />
                  <Bar dataKey="break" stackId="a" fill="#00C49F" />
                  <Bar dataKey="work" stackId="a" fill="#FFBB28" />
                </BarChart>
              </ResponsiveContainer>
            </BarChartStyles>
          </RightSide>
        </Box>
      </Box>
    </MainPage>
  );
};

export default EmployeeDashboard;
