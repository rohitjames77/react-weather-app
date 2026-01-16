import React from "react";
import { FiSearch } from "react-icons/fi";
// import { useOutletContext } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
function SideNavBar({ inputValue, setInputValue,data,setData }) {
  const [isinputSubmited, setInputSubmit] = useState("");
  const handleInputValue = (event) => {
    if(event.target.value != ""){
      setInputValue(event.target.value);
    } else{
      setInputValue(event.target.placeholder)
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
      <div className="flex items-center justify-center h-64 opacity-25 z-1">
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
    <div className="border-2 row-start-1 row-end-21 col-start-1 col-end-19 opacity-50 rounded-r-lg border-r-3 border-r-white grid grid-rows-20 grid-col-20 ">
      <nav id="side-nav-bar" className=" row-start-1 row-end-3 col-start-1 col-end-17 ">
        <div
          id="input-container"
          className=" grid grid-rows-1 grid-cols-6 w-[90%] mt-2 ml-6 rounded-r-lg hover:border-b-2 hover:border-white "
        >
          <input
            type="text"
            onChange={handleInputValue}
            className=" row-start-1 col-start-1 col-end-6 placeholder-white focus:border-none focus:outline-none focus:shadow-none placeholder:text-xs text-white text-sm"
            placeholder="New Delhi"
          ></input>
          <span
            id="search-icon-container"
            className="rounded-r-lg text-white col-start-6 col-end-7 hover:border-2 hover:border-white active:translate-y-[2px] active:bg-white active:text-black"
            onClick={handleInputSubmit}
          >
            <FiSearch className="text-xs relative top-1" />
          </span>
        </div>

      </nav>
       
       <div id="info-parent-container" className="row-start-2 row-end-19 col-start-1 col-end-17 border-4 grid grid-rows-20 grid-cols-20">
<h1 className="row-start-1 row-end-3 col-start-1 col-end-6 text-white text-4xl md:text-4xl lg:text-6xl">{isinputSubmited}</h1>
        <h1 className="row-start-2 row-end-3 col-start-1 col-end-6 text-white text-4xl md:text-4xl lg:text-6xl">{Math.round((data.currentConditions.temp-32)*5/9)}*C</h1>
        <p className="row-start-4 col-start-2 col-end-16  text-white md:text-2xl lg:text-4xl">Wind Speed : {data.currentConditions.windspeed}mph</p>
       <p className="row-start-5 col-start-2 col-end-6  text-white text-3xl md:text-2xl lg:text-4xl">{data.currentConditions.conditions}</p>
       <p className="row-start-5 col-start-2 col-end-6  text-white text-3xl md:text-2xl lg:text-4xl">{data.currentConditions.conditions}</p>
       <p className="row-start-7 col-start-2 col-end-17  text-white text-3xl md:text-2xl lg:text-4xl">UV Index :{data.currentConditions.uvindex}</p>
       
       
       </div>
       
       
       
       
       
       
       
       
       
       
    </div>
  );
}

export default SideNavBar;
