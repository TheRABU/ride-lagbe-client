import { createBrowserRouter, RouterProvider } from "react-router"
import Home from "../pages/homepage/Home"
import Root from "../layouts/Root"


const AllRoutes = () => {
  
    const routes = createBrowserRouter([
        
            {   
                path: '/',
                element: <Root />,
                children: [
                    {
                        path: "/",
                        element: <Home />
                    }
                ]
            },
        
  
    ])

    return <RouterProvider router={routes} />
}


export default AllRoutes