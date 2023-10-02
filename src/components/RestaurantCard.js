import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  console.log(resData)

  const {
    cloudinaryImageId,
    name,
    cuisines,
    deliveryTime,
    costForTwo,
    avgRating,
  } = resData?.info || resData?.data?.data;

  return (
    <div className="w-80 m-5 p-5 hover:border-2 border-gray-300">
      <img className="h-48" src={CDN_URL + cloudinaryImageId} alt="foodlogo" />
      <h3 className="font-bold mt-3 text-gray-700">{name}</h3>
      <h4 className="text-gray-500 text-sm">{cuisines.join(",")}</h4>
      <div className="flex w-full justify-between text-gray-500 text-sm mt-4">
        <h4 className="bg-white text-green-500 font-bold p-[2px] flex">
          {avgRating === "--" ? 4.1 : avgRating}
          <img
            className="h-4 ml-1 mt-[1px]"
            alt="star"
            src="https://icon2.cleanpng.com/20180327/wxe/kisspng-star-pink-color-clip-art-green-5abb01b39bc7c2.5535830315222051076381.jpg"
          />
        </h4>
        <h4>-</h4>
        <h4>{deliveryTime} MINS</h4>
        <h4>-</h4>
        <h4>{costForTwo / 100} FOR TWO</h4>
      </div>
    </div>
  );
};

export default RestaurantCard;
