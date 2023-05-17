import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import { CircularProgress } from "@mui/material";

const Loadable = (Component) => (props) => {
  return (
    <Suspense
      fallback={
        <CircularProgress
          sx={{
            ...{
              width: 1,
              zIndex: 9999,
              position: "fixed",
              top: "50vh",
              left: "50vw",
            },
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/employee",
      element: <MainLayout />,
      children: [
        {
          path: "home",
          element: <EmployeeDashboard />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "home",
          element: <AdminDashboard />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "employee/:id",
          element: <EmployeeDetail />,
        },
      ],
    },
  ]);
}

//layouts
const MainLayout = Loadable(
  lazy(() => import("../layouts/mainLayout/mainLayout.component"))
);

const AdminLayout = Loadable(
  lazy(() => import("../layouts/adminLayout/adminLayout.component"))
);

const Login = Loadable(lazy(() => import("../pages/login/login.component")));

//employee pages
const EmployeeDashboard = Loadable(
  lazy(() => import("../pages/employeeDashboard/employeeDashboard.component"))
);

//admin pages
const AdminDashboard = Loadable(
  lazy(() => import("../pages/adminDashboard/adminDashboard.component"))
);

const Profile = Loadable(
  lazy(() => import("../pages/profile/profile.component"))
);

const EmployeeDetail = Loadable(
  lazy(() => import("../pages/employeeDetail/employeeDetail.component"))
);
