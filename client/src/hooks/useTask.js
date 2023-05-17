import React, { useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";
import useAuth from "./useAuth";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { addTaskSuccess } from "../redux/slices/auth";
import { getTasksSuccess } from "../redux/slices/task";

const useTask = () => {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { pulled, tasks } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const addTask = useCallback(async (data, toggleModal) => {
    if (
      data.description == "" ||
      data.category == "" ||
      data.startTime == "" ||
      data.duration == ""
    ) {
      enqueueSnackbar("Please fill all the fields!", { variant: "error" });
      return;
    }

    if (!Number(data.duration) || Number(data.duration) > 1000) {
      enqueueSnackbar("Duration should be a valid number and less than 1000",{variant:"warning"});
      return;
    }
    const res = await axiosInstance.post(`/task/createTask/${user._id}`, data);
    //console.log(res);
    if (!res.data.ok) {
      enqueueSnackbar(res.data.message, { variant: "error" });
      toggleModal();
      return;
    }
    const task = res.data.task;
    //console.log(task, "hehehe");
    dispatch(addTaskSuccess({ task }));
    enqueueSnackbar(res.data.message, { variant: "success" });
    toggleModal();
  }, []);

  const getAllTasks = useCallback(async () => {
    if (pulled) return;
    const res = await axiosInstance.get("/task/allTasks");
    //console.log(res);
    if (!res.data.ok) {
      enqueueSnackbar(res.data.message, { variant: "error" });
      return;
    }
    dispatch(getTasksSuccess(res.data.tasks));
  }, []);

  return {
    addTask,
    getAllTasks,
    tasks,
  };
};

export default useTask;
