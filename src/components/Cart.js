import { useDispatch, useSelector } from "react-redux";
import {
  editCartList,
  clearCart,
  getCartList,
  deleteCartList,
  toggleMenu,
} from "../utils/cartSlice";
import { addOrderList } from "../utils/orderSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EMPTY_CART } from "../utils/constants";
import CartShimmer from "./CartShimmer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const cartItem = useSelector((store) => store.cart.items);
  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.auth.userId);
  const isLoading = useSelector((store) => store?.cart?.isLoading);

  const a = userId?.replace("@", "");
  const newEmailId = a?.replace(".", "");
  console.log(cartItem);

  const clearCartHandler = () => {
    dispatch(clearCart({ newEmailId, dispatch, getCartList }));
  };

  useEffect(() => {
    if (userId) dispatch(getCartList(newEmailId));
  }, [userId]);

  useEffect(() => {
    const total = cartItem?.reduce(getSum, 0);

    function getSum(total, cartItem) {
      return (
        total +
        ((cartItem?.price || cartItem?.defaultPrice) / 100) * cartItem?.quantity
      );
    }
    setAmount(total);
  }, [cartItem]);

  const editHandler = (item, newEmailId, action) => {
    console.log(item.quantity, action);
    const {
      id,
      price,
      name,
      defaultPrice,
      totalPrice,
      hotel,
      quantity,
      itemId,
    } = item;
    item.quantity === 1 && action === "remove"
      ? dispatch(
          deleteCartList({
            newEmailId,
            selectedCartItem: {
              id: id,
            },
            dispatch,
            getCartList,
          })
        )
      : dispatch(
          editCartList({
            id: itemId,
            price,
            name,
            defaultPrice,
            newEmailId,
            selectedCartItem: {
              id: id,
              quantity,
            },
            title: hotel,
            totalPrice,
            dispatch,
            getCartList,
            action,
          })
        );
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const submitHandler = async (amount, item, newEmailId) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("You are offline... Failed to load Razorpay SDK", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const options = {
      key: "rzp_test_QewTkWKuDN0n0D",
      currency: "INR",
      amount: amount * 100,
      name: "FOODINFINI",
      description: "Thanks for Order",

      handler: function (response) {
        setTimeout(() => {
          dispatch(
            addOrderList({
              item: item,
              amount: amount,
              userId: newEmailId,
            })
          );
          dispatch(clearCart({ newEmailId, dispatch, getCartList }));
        }, 1000);
        toast.success("Payment Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      },
      prefill: {
        name: "FOODINFINI",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return userId ? (
    <div className="bg-gray-100 h-[90vh] w-[100vw]">
      {cartItem?.length > 0 ? (
        <div className="w-[20%] m-auto mt-40">
          {cartItem?.map((item) => (
            <div
              key={item?.id}
              className="w-96 p-2 bg-white flex justify-between"
            >
              <p className="w-1/3 text-gray-600">{item?.name}</p>

              <div className="flex h-8 px-2 border border-gray-300">
                <button
                  className="pl-2 pr-2 bg-white font-bold text-gray-500"
                  onClick={() => editHandler(item, newEmailId, "remove")}
                >
                  -
                </button>
                <p className="bg-white font-bold text-green-700 mt-1">
                  {item?.quantity}
                </p>
                <button
                  className="pl-2 pr-2 bg-white font-bold text-green-700"
                  onClick={() => editHandler(item, newEmailId, "add")}
                >
                  +
                </button>
              </div>
              <p className="text-gray-600">₹{item?.totalPrice / 100}</p>
            </div>
          ))}
          <div className="w-96 p-2 border-t-2 border-green-400 bg-white flex justify-between">
            <p className="font-bold">TO PAY</p>
            <p className="font-bold">₹{amount}</p>
          </div>
          <div className="flex">
            <button
              className="font-bold rounded-lg ml-7 hover:bg-yellow-400 mt-5 bg-yellow-500 text-white p-2"
              onClick={clearCartHandler}
            >
              CLEAR CART
            </button>
            {isLoggedIn ? (
              <div>
                <button
                  onClick={() => submitHandler(amount, cartItem, newEmailId)}
                  className="font-bold rounded-lg ml-24 hover:bg-green-400 mt-5 bg-green-500 text-white p-2"
                >
                  PLACE ORDER
                </button>
                <ToastContainer />
              </div>
            ) : (
              <button
                onClick={() => dispatch(toggleMenu())}
                className="font-bold rounded-lg ml-24  hover:bg-green-400 mt-5 bg-green-500 text-white p-2"
              >
                SIGN UP
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {!isLoading && cartItem?.length === 0 ? (
            <div className="w-[30%] m-auto mt-32">
              <img alt="empty-cart" src={EMPTY_CART} />
              <h1 className="ml-32 font-bold text-2xl">Your cart is empty</h1>
              <p className="ml-12">
                You can go to home page to view more restaurants
              </p>
              <button
                className="bg-orange-500 ml-24 rounded-lg mt-10 text-white font-bold p-3"
                onClick={() => navigate("/")}
              >
                SEE RESTAURANTS NEAR YOU
              </button>
            </div>
          ) : (
            <CartShimmer />
          )}
        </>
      )}
    </div>
  ) : (
    <div>
      <h1>Oops!!</h1>
      <h2>Something went wrong!!</h2>
      <h2>404:Not Found</h2>
    </div>
  );
};

export default Cart;
