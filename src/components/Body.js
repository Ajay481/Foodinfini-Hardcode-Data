import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import BodyShimmer from "./BodyShimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";
import useOnline from "../utils/useOnline";
import { FETCH_DATA } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getCartList } from "../utils/cartSlice";
import { DATA } from "../utils/constants";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  console.log(listOfRestaurants, "ckdcscnjnd")
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const userId = useSelector((store) => store?.auth?.userId);
  const a = userId?.replace("@", "");
  const newEmailId = a?.replace(".", "");
  console.log(DATA)

  const searchHandler = () => {
    const data = filterData(search, listOfRestaurants);
    setFilteredRestaurants(data);
  };

  useEffect(() => {
    getRestaurant();
    if (localStorage.getItem("token") && userId)
      dispatch(getCartList(newEmailId));
  }, []);

  const getRestaurant = async () => {
    const data = await fetch(FETCH_DATA);
    const json = await data.json();
    console.log(json?.data);

    setListOfRestaurants(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants || DATA
    );
    setFilteredRestaurants(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants || DATA
    );
  };

  const isOnline = useOnline();
  if (!isOnline) {
    return (
      <h1 className="text-2xl font-bold w-[30%] m-auto">
        Offline, Please Check Your Internet Connection
      </h1>
    );
  }

  return listOfRestaurants === 0 ? (
    <BodyShimmer />
  ) : (
    <div className="bg-white m-2 w-full h-[50rem] overflow-scroll">
      <div>
        <div>
          <div className="flex w-[100%] h-[21rem] p-5 justify-evenly bg-black">
            {
              <img
                className="w-72 h-72 cursor-pointer"
                alt="card-image-1"
                src="https://images.freekaamaal.com/featured_images/147505_tgydhfjxgtdcf.png"
              />
            }
            {
              <img
                className="w-72 h-72 cursor-pointer"
                alt="card-image-2"
                src="https://www.kindpng.com/picc/m/315-3150431_transparent-food-delivery-clipart-hd-png-download.png"
              />
            }
            {
              <img
                className="w-72 h-72 cursor-pointer"
                alt="card-image-3"
                src="https://www.onlinekaka.com/upload/onlinekaka.com/1650094309-Frame-1541.png"
              />
            }
            {
              <img
                className="w-72 h-72 cursor-pointer"
                src="https://pbs.twimg.com/media/EYnf_NUXYAEZ8fX.jpg"
              />
            }
          </div>
          <input
            className="border border-black p-2 rounded-lg mt-5 ml-[35%]"
            name="search"
            type="text"
            placeholder=""
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button
            className="p-2 ml-2 rounded-lg text-white bg-purple-500 hover:bg-purple-400 font-bold"
            onClick={searchHandler}
          >
            Search
          </button>
          <button
            className="ml-10 p-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-md"
            onClick={() => {
              const filteredItems = listOfRestaurants?.filter(
                (res) => res?.data?.avgRating > 3
              );
              setFilteredRestaurants(filteredItems);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
        <div className="flex flex-wrap">
          {filteredRestaurants?.map((restaurant) => (
            <Link
              to={"/restaurant/" + (restaurant?.info?.id || restaurant?.data?.data?.id)}
              key={restaurant?.info?.id}
            >
              <RestaurantCard resData={restaurant} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
