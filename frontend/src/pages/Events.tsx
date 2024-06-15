import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { userprofile } from "../constants/constants";
import EventForm from "../components/EventForm";
import { IoIosArrowRoundBack } from "react-icons/io";
import userLogo from "../assets/Navbar/userLogo.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { Avatar, Dropdown } from "flowbite-react";
import { logoutUser } from "../store/userSlice";
const Events = () => {
    const history = useNavigate();
    const navigate = useNavigate();
    const [activeEventBtn, setActiveEventBtn] = useState<string>("hosted");
    const [eventFormSubmitted, setEventFormSubmitted] = useState(false);
    const [isEventFormOpen, setEventFormIsOpen] = useState(false);
    const [events, setEvents] = useState([]);

    const dispatch = useDispatch<AppDispatch>();
    const handleLogout = () => {
        dispatch(logoutUser(navigate));
    };
    useEffect(() => {
        const fetchEvents = async () => {
            toast.loading("Fetching events...", { id: "fetchingEvents" });
            try {
                const response = await axios.get(`${userprofile}/user/event`, {
                    withCredentials: true,
                });

                setEvents(response.data);
                toast.success("Events fetched successfully", {
                    id: "fetchingEvents",
                });
            } catch (error) {
                toast.error("Error fetching events", {
                    id: "fetchingEvents",
                });
                console.error("Error fetching events", error);
            }
        };
        fetchEvents();
    }, [eventFormSubmitted]);
    console.log(activeEventBtn);

    return (
        <>
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
                >
                    <Dropdown.Header>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">
                            name@flowbite.com
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Earnings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => handleLogout()}>
                        Sign out
                    </Dropdown.Item>
                </Dropdown>
            </nav>
            <div className="flex w-96 mx-auto text-sm">
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
                {events
                    ?.filter((event: { is_host: boolean }) =>
                        activeEventBtn === "hosted"
                            ? event.is_host
                            : !event.is_host
                    )
                    .map(
                        (
                            event: {
                                name: string;
                                description: string;
                                start_date: string;
                                end_date: string;
                                is_host: boolean;
                            },
                            index
                        ) => (
                            <button
                                key={index}
                                className="bg-[#1F1F1F] p-4 my-4 rounded-xl w-full text-left hover:bg-[#2F2F2F] relative"
                            >
                                <span
                                    className={`text-sm font-medium  px-2.5 py-0.5 rounded-tl-md rounded-bl-md absolute right-0 top-2 ${event.is_host ? "bg-purple-100 text-purple-800" : "bg-indigo-100 text-indigo-800 "}`}
                                >
                                    {event.is_host ? "Hosted" : "Invited"}
                                </span>
                                <h2 className="text-indigo-300 text-lg">
                                    {event.name}
                                </h2>
                                <p className="text-gray-400">
                                    {event.description}
                                </p>
                                <p className="text-gray-400">
                                    {new Date(event.start_date).toDateString()}{" "}
                                    to {new Date(event.end_date).toDateString()}
                                </p>
                            </button>
                        )
                    )}
                <EventForm
                    setFunction={setEventFormIsOpen}
                    parameter={isEventFormOpen}
                    setEventFormSubmitted={setEventFormSubmitted}
                />
            </main>
        </>
    );
};
export default Events;
