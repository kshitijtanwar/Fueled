import { Provider } from "react-redux";
import { store } from "./store";
import Register from "./components/Register";
import Login from "./components/Login";
import HomePage from "./pages/HomePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainUserPage from "./pages/Root";
import SideDrawer from "./components/SideDrawer";

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
            path: "/main",
            element: <MainUserPage />,
            children: [
                {
                    index: true,
                    element: <SideDrawer />,
                },
                
            ],
        },
    ]);
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    );
}

export default App;
