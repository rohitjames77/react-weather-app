
import React, { useState } from 'react';
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCircleChevronRight } from "react-icons/fa6";


function Carousel({ children, cardsPerView = 3,data }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const childrenArray = React.Children.toArray(children);
  const maxIndex = Math.max(0, childrenArray.length - cardsPerView);

  
  
  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };
  
  return (
    <div className="w-full">
      <div className="overflow-hidden ">
        <div
          className="flex gap-6 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 1.5}rem))` }}
        >
          {childrenArray.map((child, idx) => (
            <div key={idx} className="w-1/3 flex-shrink-0">
              {child}
            </div>
          ))}
        </div>
      </div>
      
      <div className=" flex-1 flex items-center justify-center gap-6">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="w-12 h-12 rounded-full text-white flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition shadow-md"
        >
          <FaCircleChevronLeft className="w-6 h-6" />
        </button>
        
        <div className="flex gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === idx ? 'bg-blue-500 w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={handleNext}
          disabled={currentIndex === maxIndex}
          className="w-12 h-12 rounded-full text-white flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition shadow-md"
        >
          <FaCircleChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

function Card({ index}) {
  const [isTempConvert,setTempConvert] = useState (0);
  const handleTempConvert = ()=>[
    setTempConvert(isTempConvert+1)
  ]


const trimByWords =(text, maxWords) =>{
  return text.split(" ").slice(0, maxWords).join(" ");
    }
  return (
    <div className="rounded-xl bg-white/30 h-64 flex flex-col items-center justify-center shadow-lg p-6">
   
        <div className="text-center mb-4">
        <h1  className="text-3xl font-bold text-white mb-1 hover:text-gray-600" onClick={handleTempConvert}> {isTempConvert%2===0?`${Math.round(((index.temp - 32) * 5) / 9)}°C`
 : `${Math.round(index.temp)}°F`}</h1> 
          <h2 className="text-lg font-bold text-white mb-1">{index.datetime}</h2>
          <h2 className="text-base text-white">{trimByWords(index.description, 5)}</h2>
        </div>
    
    </div>
  );
}

export default function MultiCardCarousel({data}) {

    
  return (
    <div className="row-start-12 row-end-20 col-start-1 col-end-21">
      <div className="">
        <div className="rounded-2xl shadow-2xl p-10"> 
          <Carousel cardsPerView={3} data={data}>
          {data?.days?.map((index) => (
            <Card  index={index} />
          ))}
          
          </Carousel>
        </div>
      </div>
    </div>
  );
}