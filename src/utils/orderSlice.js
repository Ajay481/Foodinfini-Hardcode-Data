import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const addOrderList = createAsyncThunk(
  "users/orderListPost",
  async (param, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://foodinfini-fae8d-default-rtdb.firebaseio.com/orderlist/${param.userId}/order.json`,
        {
          item: param.item,
          amount: param.amount,
        }
      );
      console.log(response.data);
    } catch (error) {
      toast.error("Order List post unsuccessful", {
        position: toast.POSITION.TOP_CENTER,
      });
      return rejectWithValue(error);
    }
  }
);

export const getOrderList = createAsyncThunk(
  "users/orderList",
  async (newEmailId) => {
    try {
      const response = await axios.get(
        `https://foodinfini-fae8d-default-rtdb.firebaseio.com/orderlist/${newEmailId}/order.json`
      );
      console.log(response.data);
      const finalData = [];
      const objKeys = Object.keys(response.data === null ? {} : response.data);
      objKeys.forEach((keys) => {
        const objElement = response.data[keys];
        objElement.id = keys;
        finalData.push(objElement);
      });
      console.log(finalData);
      return finalData;
    } catch (error) {
        toast.error("Order List fetched unsuccessful", {
          position: toast.POSITION.TOP_CENTER,
        });
      return error;
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    items: [],
    isLoading: false,
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(addOrderList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addOrderList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.items = action.payload;
    });
    builder.addCase(addOrderList.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(getOrderList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrderList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.items = action.payload;
    });
    builder.addCase(getOrderList.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default orderSlice.reducer;
