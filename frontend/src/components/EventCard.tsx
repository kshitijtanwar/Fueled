import { Link } from "react-router-dom";
import { Event } from "../definitions";

type EventCardProps = {
    event: Event;
    onClick: () => void; // Add this line
};

const EventCard = ({ event, onClick }: EventCardProps) => {
    return (
        <Link to={`/events/subevents/${event.id}`}>
            <button 
                className="bg-[#1F1F1F] p-4 my-4 rounded-xl w-full text-left hover:bg-[#2F2F1F] relative"
                onClick={onClick} // Add this line
            >
                <span
                    className={`text-sm font-medium  px-2.5 py-0.5 rounded-tl-md rounded-bl-md absolute right-0 top-2 ${event.is_host ? "bg-purple-100 text-purple-800" : "bg-indigo-100 text-indigo-800 "}`}
                >
                    {event.is_host ? "Hosted" : "Invited"}
                </span>
                <h2 className="text-indigo-300 text-lg">{event.name}</h2>
                <p className="text-gray-400">{event.description}</p>
                <p className="text-gray-400">
                    {new Date(event.start_date).toDateString()} to{" "}
                    {new Date(event.end_date).toDateString()}
                </p>
            </button>
        </Link>
    );
};

export default EventCard;