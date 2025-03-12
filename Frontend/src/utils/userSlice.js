import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  emailId: "",
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.name = action.payload.name;
      state.emailId = action.payload.emailId;
      state.role = action.payload.role;
    },
    removeUser: (state) => {
      state.name = "";
      state.emailId = "";
      state.role = "";
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
