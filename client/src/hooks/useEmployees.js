import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../utils/axiosInstance";

import { getEmployeesSuccess } from "../redux/slices/employee";
import { editProfileSuccess } from "../redux/slices/auth";
import { useSnackbar } from "notistack";
import useAuth from "./useAuth";

const useEmployees = () => {
  const dispatch = useDispatch();
  const { employees, pulled } = useSelector((state) => state.employee);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const [apiloading, setapiloading] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const getAllEmployees = useCallback(async () => {
    if (pulled) return;
    const res = await axiosInstance.get("/user/employees");
    if (!res.data.ok) {
      enqueueSnackbar(res.data?.message || "Something went wrong", {
        variant: "error",
      });
      return;
    }
    dispatch(getEmployeesSuccess(res.data.employees));
    //console.log(res, "employee response");
  }, []);

  const editProfile = useCallback(async (data, toggleModal) => {
    setapiloading(true);
    const res = await axiosInstance.post(
      `/user/editProfile/${user._id}`,
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    setapiloading(false);
    if (!res.data.ok) {
      enqueueSnackbar(res.data.message || "Something went wrong", {
        variant: "error",
      });
      toggleModal();
      return;
    }
    enqueueSnackbar("Profile editied successfully!", { variant: "success" });
    dispatch(editProfileSuccess({ user: res.data.user }));
    toggleModal();
    //console.log(res, "edit profile result!");
  }, []);

  const getEmployeeDetails = useCallback(async (id) => {
    if (currentEmployee != null && id == currentEmployee._id) return;
    const res = await axiosInstance.get(`/user/employee/${id}`);
    //console.log(res, "employee details!");
    if (!res.data.ok) {
      enqueueSnackbar(res.data.message || "Something went wrong!", {
        variant: "error",
      });
      return;
    }
    setCurrentEmployee(res.data.employee);
  }, []);



  return {
    getAllEmployees,
    employees,
    editProfile,
    apiloading,
    getEmployeeDetails,
    currentEmployee,
  };
};

export default useEmployees;
