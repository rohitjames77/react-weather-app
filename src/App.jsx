
import { Outlet } from 'react-router'
import SideNavBar from './sideNavBar/SideNavBar'
import { useState } from 'react'
import ContentPage from './Content/ContentPage';

function App() {
const [inputValue,setInputValue] = useState("");
const [data, setData] = useState([]);
  return (
    <div className='grid grid-rows-20 grid-cols-20 h-[100vh] w-[100vw] border-6 bg-gray-400' id='app-container'>ut
      {/* <Outlet context={{inputValue,setInputValue}}/> */}
    <SideNavBar inputValue = {inputValue} setInputValue={setInputValue} data={data} setData={setData}/>
    <ContentPage data={data} setData={setData}/>
    </div>
  )
}

export default App
