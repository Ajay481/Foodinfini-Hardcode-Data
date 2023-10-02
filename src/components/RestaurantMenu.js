import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CDN_URL } from "../utils/constants";
import MenuShimmer from "./MenuShimmer";
import useRestaurant from "../utils/useRestaurant";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const restaurant = useRestaurant(resId);

  const [prevIndex, setPrevIndex] = useState(0);

  const ShowIndex = (currentIndex) => {
    prevIndex === currentIndex ? setPrevIndex(-1) : setPrevIndex(currentIndex);
  };

  if (!restaurant) return <MenuShimmer />;

  const { name, costForTwoMessage, areaName, avgRating, cloudinaryImageId } =
    restaurant?.cards[0]?.card?.card?.info;

  const categories =
    restaurant?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="flex bg-white w-full justify-center">
      <div>
        <h2 className="font-bold text-2xl">{name}</h2>
        <img src={CDN_URL + cloudinaryImageId} alt="food" />
        <div className="flex w-full justify-evenly mt-5">
          <h3 className="bg-purple-500 text-white font-bold p-2 rounded-lg">
            {areaName}
          </h3>
          <h3 className="bg-white border border-green-500 text-green-500 flex font-bold p-2 rounded-lg">
            {avgRating === undefined ? 4.1 : avgRating}
            <img
              className="h-4 ml-1 mt-1"
              alt="star"
              src="https://icon2.cleanpng.com/20180327/wxe/kisspng-star-pink-color-clip-art-green-5abb01b39bc7c2.5535830315222051076381.jpg"
            />
          </h3>
          <h3 className="bg-indigo-500 text-white font-bold p-2 rounded-lg">
            {costForTwoMessage}
          </h3>
        </div>
      </div>
      <div className="ml-5">
        {categories.map((category, index) => (
          <RestaurantCategory
            index={index}
            key={category?.card?.card?.title}
            data={category?.card?.card}
            title={name}
            showItems={index === prevIndex ? true : false}
            ShowIndex={() => ShowIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
