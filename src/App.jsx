
import { Outlet } from 'react-router'
import SideNavBar from './sideNavBar/SideNavBar'
import { useState } from 'react'
import ContentPage from './content/ContentPage';
import sunny from './assets/sunny_day.png'
function App() {
const [inputValue,setInputValue] = useState("");
const [data, setData] = useState([]);
  return (
    <div className='grid grid-rows-20 grid-cols-20 h-[100vh] w-[100vw] bg-[url(./assets/sunny_day.png)] bg-no-repeat bg-cover bg-center opacity-75' id='app-container'>
      {/* <Outlet context={{inputValue,setInputValue}}/> */}
    <SideNavBar inputValue = {inputValue} setInputValue={setInputValue} data={data} setData={setData}/>
    <ContentPage data={data} setData={setData}/>
    </div>
  )
}

export default App
