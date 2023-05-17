import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  pulled: false,
};

const slice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    getEmployeesSuccess(state, action) {
      state.employees = action.payload;
      state.pulled = new Date().toLocaleString();
      return state;
    },
  },
});

export const { getEmployeesSuccess } = slice.actions;

export default slice.reducer;
