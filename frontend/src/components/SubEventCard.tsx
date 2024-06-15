import { CiCalendarDate } from "react-icons/ci";
import { SubEvent } from "../definitions";
const SubEventCard = ({ subevent }: { subevent: SubEvent }) => {

    return (
        <div className="mx-auto w-full max-w-sm px-4 py-3 rounded-md shadow-md bg-zinc-800">
            <div className="flex items-center justify-between">
                <span className="text-sm font-light text-gray-400">
                    Venue Name
                </span>
                <span className="px-3 py-1 text-xs  uppercase rounded-full bg-blue-300 text-blue-900">
                    Venue Capacity: {subevent.capacity}
                </span>
            </div>

            <div>
                <h1 className="mt-2 text-lg font-semibold  text-indigo-300">
                    {subevent.name}
                </h1>
                <div>
                    <p className="mt-2 text-sm  text-gray-300 flex items-center gap-1">
                        <CiCalendarDate className="text-2xl" />
                        <span className="text-sm text-gray-200 font-medium">Activity starting date:</span>{" "}
                         {subevent.start_datetime}
                    </p>
                    <p className="mt-2 text-sm text-gray-200 dark:text-gray-300 flex items-center gap-1">
                        <CiCalendarDate className="text-2xl" />
                        <span className="text-sm text-gray-200 font-medium">
                            Activity ending date:
                        </span>{" "}
                        {subevent.end_datetime}
                    </p>
                </div>
            </div>

            <div>
                <div className="flex items-center mt-2 text-gray-200">
                    <span className="text-gray-200">Venue location:</span>
                    <span>{subevent.venue_location}</span>
                </div>
            </div>
        </div>
    );
};
export default SubEventCard;
