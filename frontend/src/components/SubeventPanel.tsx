import toast from "react-hot-toast";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import SubEventBtn from "./SubEventBtn";
import { userprofile } from "../constants/constants";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UtilityContext } from "../UtilityContext";
interface SubeventsProps {
    eventID: string;
}
const Subevents = ({ eventID }: SubeventsProps) => {
    const { render } = useContext(UtilityContext);
    const [subevents, setSubevents] = useState({ name: "" });
    useEffect(() => {
        const fetchSubEvents = async () => {
            try {
                toast.loading("Fetching sub events...", {
                    id: "fetchingSubEvents",
                });
                const response = await axios.get(
                    `${userprofile}/user/subevents/`,
                    {
                        params: {
                            eventID: eventID
                        },
                        withCredentials: true,
                    }
                );
                setSubevents(response.data);
                toast.success("Subevents fetched!", {
                    id: "fetchingSubEvents",
                });
                console.log(response.data);
            } catch (error) {
                const errorMessage =
                    (error as any).response?.data?.detail ||
                    "Error fetching sub events!";
                toast.error("Sub events" + " " + errorMessage, {
                    id: "fetchingSubEvents",
                });
            }
        };
        if (eventID) fetchSubEvents();
    }, [render]);
    // console.log(subevents);

    return (
        <div className="w-full bg-[#2C2F34] flex flex-col gap-1 overflow-y-scroll overflow-x-hidden">
            <h2 className="text-indigo-300 w-fit mx-auto text-lg pt-4">
                Sub events
            </h2>
            <div>
                 {Array.isArray(subevents) && subevents?.map((subevent: { name: string }) => (
                    <SubEventBtn
                        text={subevent.name}
                    />
                ))} 
                 {subevents.name ? (
                    <div className="flex px-3">
                        <div className="flex gap-2 overflow-scroll my-2 p-3 w-full outline-white">
                            <SubEventBtn
                                text={subevents?.name}
                                onClick={() => toast.success("Btn clicked")}
                            />
                            <SubEventBtn
                                text={subevents?.name}
                                onClick={() => toast.success("Btn clicked")}
                            />
                            <SubEventBtn
                                text={subevents?.name}
                                onClick={() => toast.success("Btn clicked")}
                            />
                            <SubEventBtn
                                text={subevents?.name}
                                onClick={() => toast.success("Btn clicked")}
                            />
                            <SubEventBtn
                                text={subevents?.name}
                                onClick={() => toast.success("Btn clicked")}
                            />
                        </div>
                        <div className="my-auto text-violet-500">
                            <ChevronRightIcon />
                        </div>
                    </div>
                ) : (
                    <p className="text-violet-600 text-center">
                        Check Events for sub events
                    </p>
                )}
            </div>
        </div>
    );
};

export default Subevents;
