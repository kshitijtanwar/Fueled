import { BsCalendarDate } from "react-icons/bs";
import { SubEvent } from "../definitions";
import { format } from "date-fns";
import { CiSquareRemove } from "react-icons/ci";

const SubEventCard = ({ subevent }: { subevent: SubEvent }) => {
    const startTime = format(subevent.start_datetime, "hh:mm a");

    return (
        <div className=" mx-auto w-full max-w-sm px-4 py-3 rounded-xl shadow-md bg-zinc-700 hover:cursor-pointer hover:bg-violet-900 duration-150">
            <div className="w-full flex flex-row justify-between items-center">
                <span className="text-sm font-light text-gray-400">
                    {startTime}
                </span>
                <CiSquareRemove className="text-red-500 text-3xl hover:text-red-700 hover:scale-105 duration-150" />
            </div>
            <div className="flex items-center justify-between">
                <h1 className="mt-2 text-lg font-semibold  text-indigo-300">
                    {subevent.name}
                </h1>
                <span className="px-3 py-1 text-xs  uppercase rounded-full bg-blue-300 text-blue-900">
                    Venue Capacity: {subevent.capacity}
                </span>
            </div>

            <div>
                <p className="mt-2 text-sm  text-gray-300 flex items-center gap-1">
                    <BsCalendarDate className="text-xl" />
                    <span className="text-sm text-gray-200 font-medium">
                        Activity starting date:
                    </span>{" "}
                    {format(subevent.start_datetime, "MMMM dd, yyyy")}
                </p>
                <p className="mt-2 text-sm text-gray-200 dark:text-gray-300 flex items-center gap-1">
                    <BsCalendarDate className="text-xl" />
                    <span className="text-sm text-gray-200 font-medium">
                        Activity ending date:
                    </span>{" "}
                    {format(subevent.end_datetime, "MMMM dd, yyyy")}
                </p>
            </div>

            <div className="flex  mt-2 text-gray-200 text-sm">
                <span className="text-gray-200 font-medium">Venue location:</span>
                <span className="font-light">
                    {subevent.venue_name}, {subevent.venue_location}
                </span>
            </div>
        </div>
    );
};
export default SubEventCard;
