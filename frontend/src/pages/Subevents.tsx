import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Avatar, Dropdown } from "flowbite-react";
import userLogo from "../assets/Navbar/userLogo.jpg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { logoutUser } from "../store/userSlice";
import {  useContext } from "react";
import { UtilityContext } from "../UtilityContext";
const Subevents = () => {
    const { isHost } = useContext(UtilityContext);
    const {userInfo} = useContext(UtilityContext);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const history = useNavigate();
    const handleLogout = () => {
        dispatch(logoutUser(navigate));
    };
    
    return (
        <>
            <nav className="flex justify-between w-96 mx-auto pt-10 py-6 gap-5">
                <div className="flex items-center gap-1">
                    <IoIosArrowRoundBack
                        className="text-grey-primary text-3xl hover:cursor-pointer"
                        onClick={() => history(-1)}
                    />
                    <h1 className="text-indigo-300 text-xl">
                        Upcoming Activites
                    </h1>
                </div>
                <Dropdown
                    label={
                        <Avatar alt="User settings" img={userLogo} rounded />
                    }
                    arrowIcon={false}
                    inline
                >
                    <Dropdown.Header>
                        <span className="block text-sm">
                            {userInfo?.user?.username}
                        </span>
                        <span className="block truncate text-sm font-medium">
                            {userInfo?.contact_info}
                        </span>
                    </Dropdown.Header>
                    {isHost && (
                        <Dropdown.Item>Add your activities </Dropdown.Item>
                    )}
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => handleLogout()}>
                        Sign out
                    </Dropdown.Item>
                </Dropdown>
            </nav>
        </>
    );
};
export default Subevents;
