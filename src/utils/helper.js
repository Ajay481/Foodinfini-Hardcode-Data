export const filterData = (search, listOfRestaurants) => {
  const filteredData = listOfRestaurants.filter((restaurant) =>
    restaurant?.data?.name?.toLowerCase()?.includes(search.toLowerCase())
  );
  return filteredData;
};
