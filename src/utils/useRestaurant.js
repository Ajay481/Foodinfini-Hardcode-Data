import { useState, useEffect } from "react";

const useRestaurant = (resId) => {
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    getRestaurantMenu();
  }, []);

  const getRestaurantMenu = async () => {
    const data = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.715937&lng=73.006165&restaurantId=${resId}&submitAction=ENTER`
    );
    const json = await data.json();
    setRestaurant(json?.data);
  };

  return restaurant;
};

export default useRestaurant;
