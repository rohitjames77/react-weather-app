import React from "react";
import { FiSearch } from "react-icons/fi";
// import { useOutletContext } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
function SideNavBar({ inputValue, setInputValue, data, setData }) {
  const [isinputSubmited, setInputSubmit] = useState("");
  const handleInputValue = (event) => {
    if (event.target.value != "") {
      setInputValue(event.target.value);
    } else {
      setInputValue(event.target.placeholder);
    }
  };

  const handleInputSubmit = () => {
    console.log(inputValue);

    setInputSubmit(inputValue);
  };
  console.log(isinputSubmited);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = isinputSubmited?.trim() || "newdelhi";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline",
          {
            params: {
              location,
              key: "NTV85PXGEFFBCHC42DLFKNLY6",
            },
          }
        );

        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);
  console.log(data);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 opacity-25 m-12">
        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin "></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-600 font-semibold">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="row-start-1 row-end-21 col-start-1 col-end-21 rounded-r-lg border-r-3 border-r-white grid grid-rows-20 grid-col-20 z-1 ">
      <nav
        id="side-nav-bar"
        className=" row-start-1 row-end-6 col-start-1 col-end-17 hover:border-b-2 hover:border-white  "
      >
        <div
          id="input-container"
          className=" grid grid-rows-1 grid-cols-6 w-[90%] mt-2 ml-6 rounded-lg  "
        >
          <input
            type="text"
            onChange={handleInputValue}
            className=" hover:border-b-2 hover:border-gray-300  row-start-3 row-end-5 col-start-3 col-end-6 placeholder-white focus:border-none focus:outline-none focus:shadow-none placeholder:text-lg text-white text-sm "
            placeholder="New Delhi"
          ></input>
          <span
            id="search-icon-container"
            className="rounded-r-lg text-white row-start-3 col-start-6 col-end-7 active:translate-y-[2px] active:text-black gap-y-2"
            onClick={handleInputSubmit}
          >
            <FiSearch className="text-xl relative top-1" />
          </span>
        </div>
      </nav>

      <div
        id="info-parent-container"
        className="row-start-2 row-end-19 col-start-1 col-end-17 grid grid-rows-20 grid-cols-20"
      >
        <h1 className="row-start-1 row-end-5 col-start-9 col-end-15 text-white text-4xl md:text-6xl lg:text-6xl xl:text-4xl">
          {isinputSubmited}
        </h1>
        <h1 className="row-start-3 row-end-7 col-start-9 col-end-16 text-white text-6xl md:text-6xl lg:text-8xl xl:text-4xl">
          {Math.round(((data.currentConditions.temp - 32) * 5) / 9)}*
        </h1>
        <h2 className="row-start-6 col-start-6 col-end-18 text-2xl text-white md:text-2xl lg:text-4xl xl:text-4xl">
          Wind Speed : {data.currentConditions.windspeed}mph
        </h2>
        <h2 className="row-start-7 mt-2 col-start-6 col-end-20 text-white text-2xl md:text-2xl lg:text-4xl xl:text-4xl">
          Conditions:{data.currentConditions.conditions}
        </h2>

        <h2 className=" rounded-3xl row-start-8 row-end-10 mt-2 col-start-6 col-end-18 flex-1 text-white text-2xl md:text-3xl lg:text-4xl xl:text-4xl flex ">
          Humidity:{data.currentConditions.humidity}%
        </h2>

        <h2 className=" rounded-3xl row-start-11 row-end-12 col-start-6 col-end-18 text-white text-2xl md:text-3xl lg:text-4xl xl:text-4xl ml-14 ">
          UV Index :{data.currentConditions.uvindex}
        </h2>
        <div className="border-2 border-white rounded-3xl row-start-12 row-end-14 col-start-5 col-end-18 "></div>
        <div className="border-2 border-white rounded-3xl row-start-15 row-end-17 col-start-2 col-end-20 "></div>
        <div className="border-2 border-white rounded-3xl row-start-18 row-end-21 col-start-1 col-end-21 "></div>
      </div>
    </div>
  );
}

export default SideNavBar;
