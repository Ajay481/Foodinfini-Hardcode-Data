import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUsers, logout } from "../utils/authSlice";
import { LOGIN_URL, SIGNUP_URL, AUTH_LOGO } from "../utils/constants";
import { closeMenu } from "../utils/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const navigate = useNavigate();

  const isSignUpOpen = useSelector((store) => store.cart.isSignUpOpen);
  const userId = useSelector((store) => store.auth.userId);

  const dispatch = useDispatch();

  const switchAuthHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let url;
    if (enteredEmail && enteredPassword === enteredConfirmPassword) {
      if (isLogin) {
        url = LOGIN_URL;
      } else {
        url = SIGNUP_URL;
      }
      dispatch(
        loginUsers({ url, enteredEmail, enteredPassword, dispatch, closeMenu })
      );
      setEnteredEmail("");
      setEnteredPassword("");
      setEnteredConfirmPassword("");
    } else if (
      enteredEmail.length === 0 ||
      enteredPassword.length === 0 ||
      enteredConfirmPassword.length === 0
    ) {
      toast.error("Enter All Required Details", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (enteredEmail && enteredPassword !== enteredConfirmPassword) {
      toast.error("Password Not Matched", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  if (!isSignUpOpen) return null;

  return (
    <div className="w-[22rem] p-3 fixed bg-blend-overlay top-20 h-[88vh] bg-white">
      <button
        className="bg-red-500 text-white font-bold px-2 py-1 ml-64 rounded-lg"
        onClick={() => dispatch(closeMenu())}
      >
        X
      </button>

      {userId ? (
        <div>
          <h1 className="text-2xl font-bold mt-5">WELCOME TO FOODINFINI</h1>
          <button
            className="w-40 ml-16 h-10 bg-blue-800 mt-[40rem] hover:bg-blue-600 text-white font-bold p-[2px] rounded-lg"
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <div className="flex shadow-lg">
            <img className="h-28 p-2" src={AUTH_LOGO} />
            <h2 className="font-bold text-2xl mt-10 ml-8">
              {isLogin ? "Login" : "Sign Up"}
            </h2>
          </div>
          <div className="block m-auto text-center p-5">
            <input
              className="h-10 p-2 rounded-md border border-black mb-5 mt-5"
              type="email"
              placeholder="Email"
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
              required
            />
            <input
              className="h-10 p-2 rounded-md border border-black mb-5"
              type="password"
              placeholder="Password"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              required
            />
            <input
              className="h-10 p-2 rounded-md border border-black"
              type="password"
              placeholder="Confirm Password"
              value={enteredConfirmPassword}
              onChange={(e) => setEnteredConfirmPassword(e.target.value)}
              required
            />
            <div>
              <button
                className="bg-cyan-700 text-white mt-4 p-3 rounded-full font-bold w-[80%] h-12"
                onClick={submitHandler}
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
              <ToastContainer />
            </div>
          </div>
          <div>
            <button
              className="bg-purple-600 text-white mt-4 p-2 rounded-full ml-9 font-bold w-[80%] h-14"
              onClick={switchAuthHandler}
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Have an account? Login"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
