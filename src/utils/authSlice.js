import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const loginUsers = createAsyncThunk(
  "user/login",
  async (param, { rejectWithValue }) => {
    try {
      const response = await axios.post(param.url, {
        email: param.enteredEmail,
        password: param.enteredPassword,
        returnSecureToken: true,
      });
      localStorage.setItem("userEmail", response.data.email);
      localStorage.setItem("token", response.data.idToken);
      param.dispatch(param.closeMenu());
      return response.data;
    } catch (error) {
      if (error?.response?.data?.error?.message === "EMAIL_NOT_FOUND") {
        toast.error("User does not Exists. Sign Up First", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error("Authentication Failed", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      return rejectWithValue(error);
    }
  }
);

const initialAuthState = {
  isLoading: false,
  token: "",
  userId: "",
  error: "",
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      state.isLoading = false;
      state.token = "";
      state.userId = "";
      state.error = "";
      state.isLoggedIn = false;
    },
    updateUserID(state, action) {
      state.userId = action.payload;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.idToken;
      state.userId = action.payload.email;
      state.error = "";
      state.isLoggedIn = true;
    });
    builder.addCase(loginUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.token = "";
      state.userId = "";
      state.error = action.error.message;
    });
  },
});

export const { logout, updateUserID } = authSlice.actions;

export default authSlice.reducer;
