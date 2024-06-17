import { BsCalendarDate } from "react-icons/bs";
import { SubEvent } from "../definitions";
import { format } from "date-fns";
import { CiSquareRemove } from "react-icons/ci";
import axios from "axios";
import { userprofile } from "../constants/constants";
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
import toast from "react-hot-toast";

const SubEventCard = ({
    subevent,
    setIsSubEventDeleted,
}: {
    subevent: SubEvent;
    setIsSubEventDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const startTime = format(subevent.start_datetime, "hh:mm a");

    const handleDeleteSubEvent = async () => {
        try {
            setIsSubEventDeleted(false);
            const response = await axios.delete(
                `${userprofile}/user/subevents/${subevent.id}/`,
                {
                    withCredentials: true,
                }
            );
            if (response.status === 204) {
                toast.success("Activity deleted successfully", {
                    id: "fetchingEvents",
                });
                setIsSubEventDeleted(true);
            }
        } catch (error) {
            setIsSubEventDeleted(false);
            toast.error("An error occurred while deleting activity", {
                id: "fetchingEvents",
            });
        }
    };
    return (
        <div className=" mx-auto w-full max-w-sm px-4 py-3 rounded-xl shadow-md bg-zinc-700 hover:cursor-pointer hover:bg-violet-900 duration-150">
            <AlertDialog>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your activity/subevent for your event.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-indigo-700 hover:bg-indigo-800"
                            onClick={handleDeleteSubEvent}
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>

                <div className="w-full flex flex-row justify-between items-center">
                    <span className="text-sm font-light text-gray-400">
                        {startTime}
                    </span>
                    <AlertDialogTrigger asChild>
                        <CiSquareRemove className="text-red-500 text-3xl hover:text-red-700 hover:scale-105 duration-150" />
                    </AlertDialogTrigger>
                </div>
            </AlertDialog>
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
                <span className="text-gray-200 font-medium">
                    Venue location:
                </span>
                <span className="font-light">
                    {subevent.venue_name}, {subevent.venue_location}
                </span>
            </div>
        </div>
    );
};
export default SubEventCard;
