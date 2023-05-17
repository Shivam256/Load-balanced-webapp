import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  pulled: false,
};

const slice = createSlice({
  name: "task",
  initialState,
  reducers: {
    getTasksSuccess(state, action) {
      state.tasks = action.payload;
      state.pulled = new Date().toLocaleString();
      return state;
    },
  },
});

export const { getTasksSuccess } = slice.actions;

export default slice.reducer;
