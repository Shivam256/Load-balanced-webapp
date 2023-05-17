import moment from "moment";

export const getPieData = (tasks, date) => {
  let meetings = 0;
  let breaks = 0;
  let works = 0;

  tasks.map((t) => {
    const tDate = moment(t.startTime).format("MMM Do YY");

    if (tDate === date) {
      meetings += t.category === "meeting" ? parseInt(t.duration) : 0;
      breaks += t.category === "break" ? parseInt(t.duration) : 0;
      works += t.category === "work" ? parseInt(t.duration) : 0;
    }
  });

  const data = [
    { name: "meetings", value: meetings },
    { name: "break", value: breaks },
    { name: "works", value: works },
  ];

  return data;
};

export const getTasksFromDate = (tasks, date) => {
  const nd = moment(date).format("MMM Do YY");
  let newtasks = [];
  tasks.map((t) => {
    const tDate = moment(t.startTime).format("MMM Do YY");

    if (tDate === nd) {
      newtasks.push(t);
    }
  });
  return newtasks;
};

export const getTasksPieData = (tasks) => {
  let meetings = 0;
  let breaks = 0;
  let works = 0;
  tasks.map((t) => {
    meetings += t.category === "meeting" ? parseInt(t.duration) : 0;
    breaks += t.category === "break" ? parseInt(t.duration) : 0;
    works += t.category === "work" ? parseInt(t.duration) : 0;
  });

  const data = [
    { name: "meetings", value: meetings },
    { name: "break", value: breaks },
    { name: "works", value: works },
  ];

  return data;
};

export const getEmployeePieData = (employees) => {
  let production = 0;
  let it = 0;
  let transport = 0;

  employees.map((employee) => {
    if (employee.department == "Production") {
      production++;
    } else if (employee.department == "IT") {
      it++;
    } else {
      transport++;
    }
  });

  const data = [
    { name: "Production", value: production },
    { name: "IT", value: it },
    { name: "Transport", value: transport },
  ];

  return data;
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday",
];

export const getWeekData = (tasks) => {
  let week = [];
  let curr = new Date();

  for (let i = 0; i < 7; i++) {
    let first = curr.getDate() - curr.getDay() + i;
    let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
    let nd = moment(day).format("MMM Do YY");
    week.push({
      day: days[curr.getDay()],
      date: nd,
    });
  }

  const nd = [];
  week.forEach((a) => {
    let pd = getPieData(tasks, a.date);
    const ob = {
      name: a.day,
      meeting: pd[0].value,
      break: pd[1].value,
      work: pd[2].value,
    };

    nd.push(ob);
  });

  return nd;
};
