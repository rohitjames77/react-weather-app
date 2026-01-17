import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
 import { useOutletContext } from "react-router";
 import Carousel from './Carousel'


function ContentPage() {
  const { data,isinputSubmited,handleOnKeyDown,handleInputValue,handleInputSubmit } =useOutletContext()
const [convertTemp,setConvertTemp] = useState(0)
const tempInCelsius = Math.round(((data.currentConditions.temp - 32) * 5) / 9);
const handleTempConvert = ()=>{
  setConvertTemp(convertTemp+1)
}
  

  return (
    <div className="row-start-1 row-end-21 col-start-1 col-end-21 grid grid-rows-20 grid-col-20 ">
      <nav
        id="side-nav-bar"
        className=" row-start-1 row-end-6 col-start-1 col-end-17 grid grid-rows-10 grid-cols-20"
      >
        <div
          id="input-container"
          className=" grid grid-rows-3 grid-cols-6 w-[90%] mt-2 ml-6 rounded-lg row-start-1 row-end-3 col-start-2 col-end-19 bg-white/30"
        >
          <input
            type="text"
            onChange={handleInputValue}
            className="row-start-1 row-end-5 col-start-1 col-end-6 placeholder-white focus:border-none focus:outline-none focus:shadow-none placeholder:text-sm text-white text-sm"
            placeholder="Enter your location here "
            onKeyDown={handleOnKeyDown}
          ></input>
          <span
            id="search-icon-container"
            className="rounded-r-lg text-white row-start-1 row-end-4 col-start-6 col-end-7 active:translate-y-[2px] active:text-black "
            onClick={handleInputSubmit}
          >
            <FiSearch className="text-2xl ml-2 mt-2" />
          </span>
        </div>
      </nav>

      <div
        id="info-parent-container"
        className="row-start-2 row-end-19 col-start-1 col-end-17 grid grid-rows-20 grid-cols-20"
      >
        <h1 className="row-start-2 row-end-5 col-start-8 col-end-18 text-white text-3xl md:text-5xl lg:text-6xl xl:text-6xl lg:col-start-9 xl-col-start-9">
          {isinputSubmited!= ""?isinputSubmited:"New Delhi"}
        </h1>
        <h1 className="row-start-4 row-end-7 col-start-8 col-end-16 text-white text-6xl md:text-6xl lg:text-8xl xl:text-8xl hover:text-gray-500 lg:col-start-9 xl-col-start-9" onClick={handleTempConvert}> 
          {convertTemp%2===0?`${tempInCelsius}°C`
 : `${Math.round(data.currentConditions.temp)}°F`}
        </h1>
        <h2 className="row-start-10 col-start-5 col-end-18 text-2xl text-white md:text-2xl lg:text-5xl xl:text-5xl lg:col-start-7 xl-col-start-7">
          Wind Speed: {data.currentConditions.windspeed}mph
        </h2>
        <h2 className="row-start-6 mt-2 col-start-5 col-end-20 text-white text-2xl md:text-2xl lg:text-5xl xl:text-5xl lg:col-start-7 xl-col-start-7" >
          Conditions: {data.currentConditions.conditions}
        </h2>

        <h2 className=" rounded-3xl row-start-8 row-end-10 mt-2 col-start-5 col-end-18 flex-1 text-white text-2xl md:text-3xl lg:text-5xl xl:text-5xl lg:col-start-7 xl-col-start-7 flex">
          Humidity: {data.currentConditions.humidity}%
        </h2>
          <Carousel data={data} />
        
      </div>
    </div>
  );
}

export default ContentPage;
