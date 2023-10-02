import { CDN_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartList,
  deleteCartList,
  editCartList,
  getCartList,
} from "../utils/cartSlice";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ItemList = ({ items, hotel }) => {
  const cartItem = useSelector((store) => store?.cart?.items);
  const userId = useSelector((store) => store?.auth?.userId);
  const isLoading = useSelector((store) => store.cart.isLoading);
  const a = userId?.replace("@", "");
  const newEmailId = a?.replace(".", "");

  const dispatch = useDispatch();

  const addHandler = (item, title, newEmailId) => {
    const { id, price, name, defaultPrice } = item?.card?.info;
    dispatch(
      addCartList({
        id,
        price,
        name,
        defaultPrice,
        title,
        newEmailId,
        dispatch,
        getCartList,
      })
    );
  };

  const editHandler = (item, newEmailId, action, selectedCartItem, title) => {
    const { id, price, name, defaultPrice } = item?.card?.info;
    selectedCartItem.quantity === 1 && action === "remove"
      ? dispatch(
          deleteCartList({
            newEmailId,
            selectedCartItem,
            dispatch,
            getCartList,
          })
        )
      : dispatch(
          editCartList({
            id,
            price,
            name,
            defaultPrice,
            title,
            newEmailId,
            selectedCartItem,
            dispatch,
            getCartList,
          })
        );
  };

  useEffect(() => {
    dispatch(getCartList(newEmailId));
  }, []);

  return (
    <div>
      {items?.map((item) => (
        <div
          className="mt-2 w-[60rem] border-t-2 bg-white flex justify-between rounded-lg"
          key={item?.card?.info?.id}
        >
          <div>
            <p className="ml-3 text-lg text-gray-700 mt-3">
              {item?.card?.info?.name}
            </p>
            <p className="ml-3 text-sm text-gray-500">
              ₹
              {(item?.card?.info?.price || item?.card?.info?.defaultPrice) /
                100}
            </p>
            <p className="ml-3 w-[48rem] text-sm text-gray-400 mt-3">
              {item?.card?.info?.description}
            </p>
          </div>
          <div>
            {item?.card?.info?.imageId ? (
              <img
                className="w-36 rounded-lg mr-3 mt-3"
                alt="dish-image"
                src={CDN_URL + item?.card?.info?.imageId}
              />
            ) : null}
            {cartItem?.filter((items) => items?.itemId === item?.card?.info?.id)
              ?.length > 0 ? (
              <div className="flex border-2 border-gray-300 rounded-md mt-1 h-8 mr-3">
                <button
                  className="pl-4 pr-4 ml-7 bg-white font-bold text-gray-500"
                  onClick={() =>
                    editHandler(
                      item,
                      newEmailId,
                      "remove",
                      cartItem?.filter(
                        (items) => items?.itemId === item?.card?.info?.id
                      )?.[0],
                      hotel
                    )
                  }
                >
                  -
                </button>
                <p className="bg-white font-bold text-green-700 mt-[2px]">
                  {
                    cartItem.filter(
                      (items) => item?.card?.info?.id === items?.itemId
                    )[0].quantity
                  }
                </p>
                <button
                  className="pl-4 pr-4 bg-white font-bold text-green-700"
                  onClick={() =>
                    editHandler(
                      item,
                      newEmailId,
                      "add",
                      cartItem?.filter(
                        (items) => items?.itemId === item?.card?.info?.id
                      )?.[0],
                      hotel
                    )
                  }
                >
                  +
                </button>
                <ToastContainer />
              </div>
            ) : (
              <>
                {!isLoading &&
                cartItem?.filter(
                  (items) => items?.itemId === item?.card?.info?.id
                )?.length === 0 ? (
                  <button
                    className="px-5 py-1 bg-white font-bold text-green-700 ml-9 mt-1 rounded-lg border-2 border-gray-300 transition duration-500 ease-in-out hover:scale-105"
                    onClick={
                      userId
                        ? () => addHandler(item, hotel, newEmailId)
                        : () => {
                            toast.error("To Add Item Login Required", {
                              position: toast.POSITION.TOP_CENTER,
                            });
                          }
                    }
                  >
                    ADD
                  </button>
                ) : null}
                <ToastContainer />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
