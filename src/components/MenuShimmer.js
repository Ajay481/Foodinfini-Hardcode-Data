import React from "react";

const MenuShimmer = () => {
  return (
    <div className="flex h-[100vh] m-auto">
      <div className="bg-gray-300 w-[30rem] h-72 mt-20 ml-10 shadow-lg m-4 rounded-lg"></div>
      <div>
        {Array(20)
          .fill("")
          .map((e, index) => (
            <div
              className="bg-gray-300 w-[50rem] h-20 shadow-lg m-4 mt-20 rounded-lg ml-12"
              key={index}
            ></div>
          ))}
      </div>
    </div>
  );
};

export default MenuShimmer;
