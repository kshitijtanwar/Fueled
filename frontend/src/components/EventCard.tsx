import { Link } from "react-router-dom";
import { Event } from "../definitions";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoOpenOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import axios from "axios";
import { userprofile } from "@/constants/constants";
import toast from "react-hot-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// import WebSocketTestButton from "./WebSocketTestButton";

type EventCardProps = {
    event: Event;
    onClick: () => void;
    setIsEventDeleted: React.Dispatch<React.SetStateAction<boolean>>;
};

const EventCard = ({ event, onClick, setIsEventDeleted }: EventCardProps) => {
    const handleDeleteEvent = async () => {
        try {
            toast.loading("Deleting event...", { id: "fetchingEvents" });
            const res = await axios.delete(
                `${userprofile}/user/event/${event.id}`,
                { withCredentials: true }
            );
            toast.success("Event deleted successfully", {
                id: "fetchingEvents",
            });
            setIsEventDeleted(true);
            return res;
        } catch (error) {
            console.error("Error deleting event", error);
            toast.error("Error deleting event", { id: "fetchingEvents" });
        }
    };
    return (
        <button
            className="duration-150 bg-zinc-700 p-4 my-4 rounded-xl w-96 text-left relative"
            onClick={onClick}
        >
            <AlertDialog>
                <span
                    className={`text-sm font-medium  px-2.5 py-0.5 rounded-tl-md rounded-bl-md absolute right-0 top-2 ${event.is_host ? "bg-purple-100 text-purple-800" : "bg-indigo-100 text-indigo-800 "}`}
                >
                    {event.is_host ? "Hosted" : "Invited"}
                </span>

                <h2 className="text-indigo-300 text-lg hover:underline">
                    {event.name}
                </h2>

                <p className="text-gray-400">{event.description}</p>
                <p className="text-gray-400 flex gap-2 justify-between">
                    <span>
                        {new Date(event.start_date).toDateString()} to{" "}
                        {new Date(event.end_date).toDateString()}
                    </span>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="hover:bg-grey-secondary p-1 rounded-full">
                            <BsThreeDotsVertical className="text-white " />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <IoOpenOutline className="mr-1" />
                                <Link to={`/events/subevents/${event.id}`}>
                                    Open activities
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <MdModeEdit className="mr-1" />
                                Edit event
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <MdOutlineDeleteOutline className="mr-1 text-red-500" />
                                <AlertDialogTrigger>
                                    Delete event
                                </AlertDialogTrigger>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </p>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your event and all its activities.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteEvent}
                            className="bg-indigo-700 hover:bg-indigo-800"
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {/* <WebSocketTestButton /> */}
        </button>
    );
};

export default EventCard;
