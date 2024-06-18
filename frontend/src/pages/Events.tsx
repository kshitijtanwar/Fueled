import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { userprofile } from "../constants/constants";
import { IoIosArrowRoundBack } from "react-icons/io";
import userLogo from "../assets/Navbar/userLogo.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { Avatar, Dropdown } from "flowbite-react";
import { logoutUser } from "../store/userSlice";
import { getUser } from "../store/userSlice";
import { UserType, Event } from "../definitions";
import EventCard from "../components/EventCard";
import { UtilityContext } from "../UtilityContext";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import EventForm from "../components/EventForm";


const Events = () => {
    const history = useNavigate();
    const navigate = useNavigate();
    const [activeEventBtn, setActiveEventBtn] = useState<string>("hosted");
    const [eventFormSubmitted, setEventFormSubmitted] = useState(false);
    const [isEventFormOpen, setEventFormIsOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserType>();
    const dispatch = useDispatch<AppDispatch>();
    const { setIsHost } = useContext(UtilityContext);
    const { setUserInfo } = useContext(UtilityContext);
    const { setEventName } = useContext(UtilityContext);
    const [isEventDeleted, setIsEventDeleted] = useState(false);

    const handleLogout = () => {
        dispatch(logoutUser(navigate));
    };

    useEffect(() => {
        dispatch(getUser())
            .then((response) => {
                setUser(response.payload);
                setUserInfo(response.payload);
            })
            .catch((error) => {
                console.error("Error fetching user", error);
            });
    }, [dispatch]);
    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            toast.loading("Fetching events...", { id: "fetchingEvents" });
            try {
                const response = await axios.get(`${userprofile}/user/event`, {
                    withCredentials: true,
                });

                setEvents(response.data);
                setLoading(false);
                toast.success("Events fetched successfully", {
                    id: "fetchingEvents",
                });
            } catch (error) {
                setLoading(false);
                toast.error("Error fetching events", {
                    id: "fetchingEvents",
                });
                console.error("Error fetching events", error);
            }
        };
        fetchEvents();
    }, [eventFormSubmitted, isEventDeleted]);

    return (
        <div className="">
            <nav className="flex justify-between w-96 mx-auto pt-10 py-6">
                <div className="flex items-center gap-2">
                    <IoIosArrowRoundBack
                        className="text-grey-primary text-3xl hover:cursor-pointer"
                        onClick={() => history(-1)}
                    />
                    <h1 className="text-indigo-300 text-xl">Upcoming Events</h1>
                </div>
                <Dropdown
                    label={
                        <Avatar alt="User settings" img={userLogo} rounded />
                    }
                    arrowIcon={false}
                    inline
                    className="z-50"
                >
                    <Dropdown.Header>
                        <span className="block text-sm">
                            {user?.user?.username}
                        </span>
                        <span className="block truncate text-sm font-medium">
                            {user?.contact_info}
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item onClick={() => setEventFormIsOpen(true)}>
                        Host your event
                    </Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => handleLogout()}>
                        Sign out
                    </Dropdown.Item>
                </Dropdown>
            </nav>
            <div className="flex text-sm w-96 mx-auto">
                <button
                    onClick={() => setActiveEventBtn("hosted")}
                    className={` hover:bg-violet-600 text-white px-3 py-2 rounded-md mr-2 ${activeEventBtn === "hosted" ? "bg-violet-600" : "bg-violet-400"}`}
                >
                    Hosted
                </button>
                <button
                    onClick={() => setActiveEventBtn("invited")}
                    className={`hover:bg-violet-600 text-white px-3 py-2 rounded-md ${activeEventBtn === "invited" ? "bg-violet-600" : "bg-violet-400"}`}
                >
                    Invited
                </button>
            </div>
            <main className="w-96 mx-auto">
                {loading && (
                    <Typography component="div" variant="h1">
                        {[...Array(5)].map((_, index) => (
                            <Skeleton key={index} className="z-0"/>
                        ))}
                    </Typography>
                )}
                {events
                    ?.filter((event: { is_host: boolean }) =>
                        activeEventBtn === "hosted"
                            ? event.is_host
                            : !event.is_host
                    )
                    .map((event: Event, index) => (
                        <EventCard
                            key={index}
                            event={event}
                            setIsEventDeleted={setIsEventDeleted}
                            onClick={() => {
                                setIsHost(event.is_host);
                                setEventName(event.name);
                            }}
                        />
                    ))}
                <EventForm
                    isEventFormOpen={isEventFormOpen}
                    setEventFormIsOpen={setEventFormIsOpen}
                    setEventFormSubmitted={setEventFormSubmitted}
                />
            </main>
        </div>
    );
};
export default Events;
