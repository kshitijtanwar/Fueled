import { Provider } from "react-redux";
import { store } from "./store";
import Register from "./components/Register";
import Login from "./components/Login";
import HomePage from "./pages/HomePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Events from "./pages/Events";
import Subevents from "./pages/Subevents";


function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage />,
        },

        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/events",
            element: <Events />,
        },
        {
            path: "events/subevents/:eventID",
            element: <Subevents />,
        },
        
    ]);
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    );
}

export default App;
