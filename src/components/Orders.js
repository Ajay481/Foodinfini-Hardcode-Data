import { useSelector, useDispatch } from "react-redux";
import { getOrderList } from "../utils/orderSlice";
import { getCartList } from "../utils/cartSlice";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
  const orderItems = useSelector((store) => store.order.items);
  const userId = useSelector((store) => store.auth.userId);
  const a = userId?.replace("@", "");
  const newEmailId = a?.replace(".", "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) dispatch(getOrderList(newEmailId));
    if (userId) dispatch(getCartList(newEmailId));
  }, [userId]);

  return userId ? (
    <div className="bg-gray-100 w-[100vw] overflow-scroll h-[51rem]">
      {orderItems?.length > 0 ? (
        <div className="w-[20%] m-auto mt-28">
          {orderItems?.map((item) => (
            <div key={item?.id} className="mt-5">
              <h1 className="text-2xl font-bold bg-gray-800 text-center p-2 text-white w-96">
                {item?.item[0]?.hotel}
              </h1>
              {item?.item?.map((dish) => (
                <div
                  className="w-96 p-2 bg-white flex justify-between"
                  key={dish?.id}
                >
                  <p className="w-1/3 text-gray-600">{dish?.name}</p>
                  <div>
                    <p className="font-bold text-green-700">
                      x{dish?.quantity}
                    </p>
                  </div>
                  <p className="text-gray-600">₹{dish?.totalPrice / 100}</p>
                </div>
              ))}
              <div className="w-96 p-2 border-t-2 border-green-400 bg-white flex justify-between">
                <p className="font-bold">PAID</p>
                <p className="font-bold">₹{item.amount}</p>
              </div>
            </div>
          ))}
          <ToastContainer />
        </div>
      ) : (
        <div className="w-[30%] m-auto mt-32">
          <img
            className="ml-28"
            alt="empty-orders"
            src="https://thumb.ac-illust.com/e0/e07c17aea7fdba32bc95020d7ac6e8c1_t.jpeg"
          />
          <h1 className="ml-48 mt-4 font-bold text-2xl">No Orders</h1>
          <p className="ml-16">
            Go ahead and find some awesome restaurants near you...
          </p>
          <button className="bg-red-500 ml-28 rounded-lg mt-10 text-white font-bold p-3">
            SEE RESTAURANTS NEAR YOU
          </button>
        </div>
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

export default Orders;
