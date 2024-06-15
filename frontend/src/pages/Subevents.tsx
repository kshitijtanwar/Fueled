import { IoIosArrowRoundBack } from "react-icons/io";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Dropdown } from "flowbite-react";
import userLogo from "../assets/Navbar/userLogo.jpg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { logoutUser } from "../store/userSlice";
import { useContext, useEffect, useState } from "react";
import { UtilityContext } from "../UtilityContext";
import { userprofile } from "../constants/constants";
import axios from "axios";
import SubEventCard from "../components/SubEventCard";
import { SubEvent } from "../definitions";
const Subevents = () => {
    const params = useParams();
    const { isHost } = useContext(UtilityContext);
    const { userInfo } = useContext(UtilityContext);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const history = useNavigate();
    const [subevents, setSubevents] = useState<SubEvent>();
    const handleLogout = () => {
        dispatch(logoutUser(navigate));
    };

    useEffect(() => {
        const fetchSubEvents = async () => {
            try {
                toast.loading("Fetching subevents...", {
                    id: "fetchingSubEvents",
                });
                const response = await axios.get(
                    `${userprofile}/user/subevents/${params.eventID}`,
                    {
                        withCredentials: true,
                    }
                );
                toast.success("Subevents fetched successfully", {
                    id: "fetchingSubEvents",
                });
                setSubevents(response.data);
                return response.data;
            } catch (error: any) {
                if (error.response.status === 404) {
                    toast.error("No sub events found", {
                        id: "fetchingSubEvents",
                    });
                }
            }
        };
        fetchSubEvents();
    }, []);

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
            <div className="flex flex-col gap-3">
                {subevents ?  <SubEventCard subevent={subevents} />: <h1 className="w-96 mx-auto text-2xl text-indigo-400 text-center">No subevents found :(</h1>}
            </div>
        </>
    );
};
export default Subevents;
