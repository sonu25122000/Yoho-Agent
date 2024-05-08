import { RootState } from "../../store";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import request from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const USERS_URL = "http://localhost:5000/api/recruiter";

type INITIAL_STATE = {
  userData: any;
  error: any;
  loading: Boolean;
  getUserById: any;
};

const initialState: INITIAL_STATE = {
  error: null,
  loading: false,
  userData: {},
  getUserById: {},
};
// phoneNumber, password
interface loginArgs {
  phoneNumber: number;
  password: string;
}

export const getRecruiterById = createAsyncThunk(
  "recruiter/getRecruiterById",
  async () => {
    try {
      const response = await axios.get(USERS_URL + "/login");
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const recruiterLogin = createAsyncThunk(
  "assignment/updateAssignment",
  async (args: loginArgs, { rejectWithValue }) => {
    try {
      const { phoneNumber, password } = args;
      const response = await axios.post(`${USERS_URL}/login`, {
        phoneNumber,
        password,
      });
      console.log(response.data);

      return response.data;
    } catch (error) {
      if (request.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Something went wrong");
      } else return rejectWithValue(error as Error);
    }
  }
);
const recruiterSlice = createSlice({
  name: "Recruiter",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      // get recruiter by id
      .addCase(getRecruiterById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getRecruiterById.fulfilled, (state, action) => {
        state.loading = false;
        const fetchedAssignment = action.payload.data;
        state.getUserById = fetchedAssignment;
      })

      .addCase(getRecruiterById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error("Fetch by ID failed:", action.error.message);
      })

      // recruiter login
      .addCase(recruiterLogin.pending, (state) => {
        state.loading = true;
        state.error = false;
      })

      .addCase(recruiterLogin.fulfilled, (state, action) => {
        state.loading = false;
        const loginData = action.payload.data;
        toast.success(action.payload.message);
        localStorage.setItem("isLoggedIn", "Yes");
        localStorage.setItem("loggedInUserId", loginData._id);
        state.userData = loginData;
      })

      .addCase(recruiterLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error("Fetch by ID failed:", action.error.message);
      });
  },
});
export const RecruiterData = (state: RootState) => state.recruiterSlice;
export default recruiterSlice.reducer;
