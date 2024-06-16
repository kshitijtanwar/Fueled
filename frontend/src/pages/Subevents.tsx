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
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

const Subevents = () => {
    const params = useParams();
    const { eventName } = useContext(UtilityContext);
    const { isHost } = useContext(UtilityContext);
    const { userInfo } = useContext(UtilityContext);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [subevents, setSubevents] = useState<SubEvent[]>();
    const handleLogout = () => {
        dispatch(logoutUser(navigate));
    };

    useEffect(() => {
        const fetchSubEvents = async () => {
            try {
                setLoading(true);
                toast.loading("Fetching subevents...", {
                    id: "fetchingEvents",
                });
                const response = await axios.get(
                    `${userprofile}/user/subevents/?eventID=${params.eventID}`,
                    {
                        withCredentials: true,
                    }
                );
                setSubevents(response.data);
                setLoading(false);
                if (response.data.length === 0) {
                    toast.error("No activities events found", {
                        id: "fetchingEvents",
                    });
                } else
                    toast.success("Subevents fetched successfully", {
                        id: "fetchingEvents",
                    });

                return response.data;
            } catch (error: any) {
                if (error.response.status === 404) {
                    toast.error("No sub events found", {
                        id: "fetchingEvents",
                    });
                }
                toast.error(error, { id: "fetchingEvents" });
            }
        };
        fetchSubEvents();
    }, []);

    return (
        <div className="w-96 mx-auto">
            <nav className="flex justify-between  pt-10 py-6 gap-5">
                <div className="flex items-center gap-1">
                    <IoIosArrowRoundBack
                        className="text-grey-primary text-3xl hover:cursor-pointer"
                        onClick={() => history(-1)}
                    />
                    <h1 className="text-indigo-300 text-xl leading-none">
                        Upcoming Activites
                        <br />{" "}
                        <span className="text-base">for {eventName}</span>
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
                {subevents?.length === 0 && (
                    <h1 className="text-center text-2xl text-indigo-500">
                        No activities found for this event :(
                    </h1>
                )}
                {loading && (
                    <Typography
                        component="div"
                        variant="h1"
                        className="flex flex-col gap-3"
                    >
                        {[...Array(3)].map((_, index) => (
                            <Skeleton key={index} variant="rounded" />
                        ))}
                    </Typography>
                )}
                {subevents?.map((subevent: SubEvent, index) => (
                    <SubEventCard subevent={subevent} key={index} />
                ))}
            </div>
        </div>
    );
};
export default Subevents;
