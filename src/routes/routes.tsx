import App from "@/App";
import { createBrowserRouter } from "react-router-dom";


const router: ReturnType<typeof createBrowserRouter>  = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <h1>Home Page</h1>
            }
        ]
    }
])


export default router;