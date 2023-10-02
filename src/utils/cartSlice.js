import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const addCartList = createAsyncThunk(
  "users/cartListPost",
  async (param, { rejectWithValue }) => {
    console.log(param, "param");
    try {
      const response = await axios.post(
        `https://foodinfini-fae8d-default-rtdb.firebaseio.com/cartlist/${param.newEmailId}/cart.json`,
        {
          hotel: param.title,
          itemId: param.id,
          price: param.price,
          defaultPrice: param.defaultPrice,
          quantity: 1,
          totalPrice: param.price || param.defaultPrice,
          name: param.name,
        }
      );
      param.dispatch(param.getCartList(param.newEmailId));
      console.log(response.data);
    } catch (error) {
      toast.error("Cart List post unsuccessful", {
        position: toast.POSITION.TOP_CENTER,
      });
      return rejectWithValue(error);
    }
  }
);

export const getCartList = createAsyncThunk(
  "users/cartList",
  async (newEmailId) => {
    try {
      const response = await axios.get(
        `https://foodinfini-fae8d-default-rtdb.firebaseio.com/cartlist/${newEmailId}/cart.json`
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
      toast.error("Cart List fetched unsuccessful", {
        position: toast.POSITION.TOP_CENTER,
      });
      return error;
    }
  }
);

export const deleteCartList = createAsyncThunk(
  "users/cartDelete",
  async (param, { rejectWithValue }) => {
    console.log(param);
    try {
      const response = await axios.delete(
        `https://foodinfini-fae8d-default-rtdb.firebaseio.com/cartlist/${param.newEmailId}/cart/${param.selectedCartItem.id}.json`
      );
      console.log(response.data);
      param.dispatch(param.getCartList(param.newEmailId));
    } catch (error) {
      toast.error("Cart List delete unsuccessful", {
        position: toast.POSITION.TOP_CENTER,
      });
      return rejectWithValue;
    }
  }
);

export const clearCart = createAsyncThunk(
  "users/clearCart",
  async (param, { rejectWithValue }) => {
    console.log(param);
    try {
      const response = await axios.delete(
        `https://foodinfini-fae8d-default-rtdb.firebaseio.com/cartlist/${param.newEmailId}/cart.json`
      );
      console.log(response.data);
      param.dispatch(param.getCartList(param.newEmailId));
    } catch (error) {
      toast.error("Cart Item delete unsuccessful", {
        position: toast.POSITION.TOP_CENTER,
      });
      return rejectWithValue;
    }
  }
);

export const editCartList = createAsyncThunk(
  "users/cartListEdit",
  async (param, { rejectWithValue }) => {
    console.log(param);
    try {
      const response = await axios.put(
        `https://foodinfini-fae8d-default-rtdb.firebaseio.com/cartlist/${param.newEmailId}/cart/${param.selectedCartItem.id}.json`,
        {
          hotel: param.title,
          itemId: param.id,
          price: param.price,
          defaultPrice: param.defaultPrice,
          quantity:
            param.action === "add"
              ? param.selectedCartItem.quantity + 1
              : param.selectedCartItem.quantity - 1,
          totalPrice: param.price || param.defaultPrice,
          name: param.name,
        }
      );
      param.dispatch(param.getCartList(param.newEmailId));
      console.log(response.data);
    } catch (error) {
      toast.error("Cart List edit unsuccessful", {
        position: toast.POSITION.TOP_CENTER,
      });
      return rejectWithValue(error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    cartQuantity: 0,
    isSignUpOpen: false,
    isLoading: false,
    error: false,
  },
  reducers: {
    toggleMenu: (state) => {
      state.isSignUpOpen = !state.isSignUpOpen;
    },
    closeMenu: (state) => {
      state.isSignUpOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCartList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addCartList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.items = action.payload;
    });
    builder.addCase(addCartList.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(getCartList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCartList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.items = action.payload;

      const sum = action.payload.reduce(getSum, 0);

      function getSum(total, cartItem) {
        return total + cartItem.quantity;
      }
      state.quantity = sum;
    });
    builder.addCase(getCartList.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(editCartList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editCartList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.items = action.payload;
    });
    builder.addCase(editCartList.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(deleteCartList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCartList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.items = action.payload;
    });
    builder.addCase(deleteCartList.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(clearCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(clearCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.items = action.payload;
    });
    builder.addCase(clearCart.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const { toggleMenu, closeMenu } = cartSlice.actions;

export default cartSlice.reducer;
