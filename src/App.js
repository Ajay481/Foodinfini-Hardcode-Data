import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { Provider } from "react-redux";
import store from "./utils/store";
import Cart from "./components/Cart";
import Help from "./components/Help";
import MainContainer from "./components/MainContainer";
import Orders from "./components/Orders";
import { useDispatch } from "react-redux";
import { updateUserID } from "./utils/authSlice";

const AppLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");

    if (userEmail) dispatch(updateUserID(userEmail));
  }, []);

  return (
    <div>
      <Header />
      <MainContainer />
      <Footer />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <AppLayout />
      </Provider>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
