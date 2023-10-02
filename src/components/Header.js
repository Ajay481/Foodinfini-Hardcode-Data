import { LOGO_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/cartSlice";
import { useEffect, useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const cartQuantity = useSelector((store) => store.cart.quantity);
  const token = useSelector((store) => store.auth.token);
  const userId = useSelector((store) => store.auth.userId);

  const toggleHandler = () => {
    dispatch(toggleMenu());
  };

  useEffect(() => {
    localStorage.getItem("token")
      ? setUserLoggedIn(true)
      : setUserLoggedIn(false);
  }, [token, userId]);

  return (
    <div className="flex m-2 bg-white sticky top-0 w-full justify-evenly">
      <div onClick={() => navigate("/")}>
        <img className="h-20 p-2 cursor-pointer" src={LOGO_URL} />
      </div>
      <div>
        <ul className="flex m-7 mx-40 justify-between w-full">
          <Link to="/">
            <li className="hover:text-orange-400 flex font-bold">
              <img
                className="h-5 mr-1"
                alt="home"
                src="https://www.freeiconspng.com/thumbs/homepage-icon-png/home-page-icon-0.png"
              />
              Home
            </li>
          </Link>

          <Link to="/help">
            <li className="hover:text-orange-400 flex font-bold">
              <img
                className="h-5 mr-1 mt-[2px]"
                alt="help"
                src="https://static.thenounproject.com/png/1170443-200.png"
              />
              Help
            </li>
          </Link>
          {userLoggedIn ? (
            <Link to="/cart">
              <li className="font-bold hover:text-orange-400">
                {cartQuantity === 0 ? (
                  <button className="font-bold bg-white text-black border border-black px-1 mr-1">
                    {cartQuantity}
                  </button>
                ) : (
                  <button className="font-bold bg-green-500 text-white px-1 mr-1">
                    {cartQuantity}
                  </button>
                )}
                Cart
              </li>
            </Link>
          ) : null}
          {userLoggedIn ? (
            <Link to="/orders">
              <li className="hover:text-orange-400 flex font-bold">
                <img
                  className="h-5 mr-1 mt-[2px]"
                  alt="orders"
                  src="https://w7.pngwing.com/pngs/324/379/png-transparent-order-shopping-shop-ecommerce-cart-buy-bag-dashboard-interface-icon.png"
                />
                Orders
              </li>
            </Link>
          ) : null}
          <button onClick={toggleHandler}>
            <li className="hover:text-orange-400 flex font-bold">
              <img
                className="h-5 mr-1 mt-[2px]"
                alt="user"
                src="https://www.seekpng.com/png/detail/41-410093_circled-user-icon-user-profile-icon-png.png"
              />
              {userLoggedIn ? "User" : "Sign In"}
            </li>
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
