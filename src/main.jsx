import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router'
import SideNavBar from './sideNavBar/SideNavBar.jsx'
import ContentPage from './Content/ContentPage.jsx'



// const router = createBrowserRouter([
//   {path :"/",
//     element:<App/>,
//   children:[
//     {
//       path:"navbar",
//       element:<SideNavBar/>
//     },
//     {
//       path:"content",
//       element:<ContentPage/>
//     }
//   ]
//   }
// ])


// <RouterProvider router = {router}/>



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
