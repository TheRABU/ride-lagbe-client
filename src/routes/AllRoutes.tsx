import { createBrowserRouter, RouterProvider } from "react-router"
import Home from "../pages/homepage/Home"


const AllRoutes = () => {
  
    const routes = createBrowserRouter([
        
            {
            path: "/",
            element: <Home />,
        },
        
  
    ])

    return <RouterProvider router={routes} />
}


export default AllRoutes