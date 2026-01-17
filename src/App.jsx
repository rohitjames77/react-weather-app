import { Outlet } from "react-router";
import SideNavBar from "./sideNavBar/SideNavBar";
import { useState, useEffect } from "react";
import ContentPage from "./content/ContentPage";
import axios from "axios";
import ErrorPage from "./sideNavBar/ErrorPage";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isinputSubmited, setInputSubmit] = useState("");

  const handleInputValue = (event) => {
    if (event.target.value != "") {
      setInputValue(event.target.value);
    }
  };

  const handleInputSubmit = () => {
    setInputSubmit(inputValue);
  };

  const handleOnKeyDown = (event) => {
    if (event.key === "Enter") {
      setInputSubmit(inputValue);
    }
  };
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
        setError(err.response.data.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 opacity-25 m-12 ">
        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <div
      className="grid grid-rows-20 grid-cols-20 h-[100vh] w-[100vw] bg-[url(./assets/sunny_day.png)] bg-no-repeat bg-cover bg-center opacity-75"
      id="app-container"
    >
      {/* <Outlet context={{inputValue,setInputValue}}/> */}
      <SideNavBar
        data={data}
        isinputSubmited={isinputSubmited}
        handleOnKeyDown={handleOnKeyDown}
        handleInputValue={handleInputValue}
        handleInputSubmit={handleInputSubmit}
      />
      <ContentPage data={data} setData={setData} />
    </div>
  );
}

export default App;
