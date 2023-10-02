import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getCartList } from "../utils/cartSlice";

const Section = ({ title, description, isVisible, setIsVisible }) => {
  return (
    <div className=" border-t-2 border-gray-400 w-[70%] m-auto bg-white p-5">
      <h1 className="font-bold mb-2 underline underline-offset-4">{title}</h1>
      {isVisible ? (
        <button
          className="bg-red-500 text-white p-1 rounded-lg"
          onClick={() => setIsVisible()}
        >
          Hide
        </button>
      ) : (
        <button
          className="bg-green-500 text-white p-1 rounded-lg"
          onClick={() => setIsVisible()}
        >
          Show
        </button>
      )}
      {isVisible && <p className="text-gray-600 mt-2">{description}</p>}
    </div>
  );
};

const Help = () => {
  const [visibleSection, setVisibleSection] = useState("about");

  // const dispatch = useDispatch();
  // const userId = useSelector((store) => store.auth.userId);
  // const a = userId?.replace("@", "");
  // const newEmailId = a?.replace(".", "");

  // useEffect(() => {
  //   if (userId) dispatch(getCartList(newEmailId));
  // }, [userId]);

  return (
    <div className="bg-cyan-700 h-[90vh] w-[100vw]">
      <div className="p-16 ml-64">
        <h1 className="text-2xl font-bold text-white">Help & Support</h1>
        <h4 className="text-white">
          Let's take a step ahead and help you better.
        </h4>
      </div>
      <Section
        title={"About FOODINFINI"}
        description={
          "FoodInfini is a fictional company specializing in innovative and futuristic food products. Combining cutting-edge technology with culinary expertise, FoodInfini aims to revolutionize the way people eat and experience food.At FoodInfini, we strive to create a world where food knows no boundaries. Through our pioneering approach, we push the limits of taste, nutrition, and sustainability, providing endless possibilities for gastronomic delight.FoodInfini takes its responsibility towards the environment seriously. The company actively invests in research and development to create eco-friendly packaging materials, reduces food waste through innovative preservation techniques, and promotes sustainable farming practices to ensure a greener future."
        }
        isVisible={visibleSection === "about"}
        setIsVisible={() =>
          setVisibleSection(visibleSection === "about" ? "" : "about")
        }
      />
      <Section
        title={"Team FOODINFINI"}
        description={
          "The team behind FoodInfini is a diverse and talented group of individuals who are passionate about revolutionizing the food industry. Comprising experts from various fields, they bring a wealth of knowledge and creativity to the table.At the helm of FoodInfini is Dr. Amelia Carter, a renowned food scientist and visionary leader. With her extensive experience in flavor extraction and product development, she drives the company's research and innovation efforts.Joining Dr. Carter is Chef Adrian Ramirez, a culinary genius with a flair for combining traditional techniques with cutting-edge technology. His expertise in creating unique flavor profiles and artistic presentations adds a touch of magic to FoodInfini's products."
        }
        isVisible={visibleSection === "team"}
        setIsVisible={() =>
          setVisibleSection(visibleSection === "team" ? "" : "team")
        }
      />
      <Section
        title={"Career"}
        description={
          "A career at FoodInfini offers an exciting and dynamic opportunity to be part of a pioneering company at the forefront of food innovation. With a commitment to pushing boundaries and redefining the culinary landscape, FoodInfini provides a stimulating and supportive work environment for passionate professionals.As an employee at FoodInfini, you will have the chance to collaborate with top-tier experts in various fields, including food science, technology, culinary arts, and marketing. Your contributions will play a crucial role in shaping the future of food and delivering exceptional gastronomic experiences to consumers worldwide.FoodInfini values creativity, innovation, and a hunger for exploration. Whether you are a food scientist, engineer, chef, marketer, or designer, your expertise will be nurtured and challenged to drive groundbreaking solutions and products."
        }
        isVisible={visibleSection === "career"}
        setIsVisible={() =>
          setVisibleSection(visibleSection === "career" ? "" : "career")
        }
      />
    </div>
  );
};

export default Help;
