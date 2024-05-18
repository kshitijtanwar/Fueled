import { Provider } from "react-redux";
import { store } from "./store";
import Register from "./components/Register";
import Login from "./components/Login";
// import HomePage from "./pages/HomePage";
function App() {
    return (
        <Provider store={store}>
            <div>
                {/* <HomePage /> */}
                <Register />
                <Login />
            </div>
        </Provider>
    );
}

export default App;
