import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useState } from "react";
import { userprofile } from "../constants/constants";
import { Button, Label } from "flowbite-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HiCalendar } from "react-icons/hi";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const drawerBleeding = 0;

interface Props {
    window?: () => Window;
    isSubEventFormOpen: boolean;
    setSubEventFormIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSubEventFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

const Root = styled("div")(({ theme }) => ({
    height: "100%",
    backgroundColor:
        theme.palette.mode === "light"
            ? grey[100]
            : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)",
}));

export default function SubEventForm(props: Props) {
    const params = useParams();
    const [name, setName] = useState("");
    const [start_datetime, setStart_datetime] = useState<Date | null>(null);
    const [end_datetime, setEnd_datetime] = useState<Date | null>(null);
    const [venue_name, setVenue_name] = useState<string>("");
    const [venue_location, setVenue_location] = useState<string>("");
    const [venue_capacity, setVenue_capacity] = useState<number>(0);
    const capacity = 0;
    const { window } = props;

    const styles = {
        ".MuiDrawer-paper ": {
            height: "calc(100% - 100px)",
            top: 100,
        },
    };

    const toggleDrawer = (newOpen: boolean) => () => {
        props.setSubEventFormIsOpen(newOpen);
    };

    // This is used only for the example
    const container =
        window !== undefined ? () => window().document.body : undefined;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            toast.loading("Creating activity...", { id: "creatingEvent" });
            const response = await axios.post(
                `${userprofile}/user/subevents/`,
                {
                    event: params.eventID,
                    name,
                    start_datetime,
                    end_datetime,
                    venue_name,
                    venue_location,
                    venue_capacity,
                    capacity,
                },
                {
                    withCredentials: true,
                }
            );
            if (response.status === 200 || response.status === 201) {
                props.setSubEventFormSubmitted(true);
                props.setSubEventFormIsOpen(false);
            }
            toast.success("Activity created successfully", {
                id: "creatingEvent",
            });
            return response.data;
        } catch (error: any) {
            toast.error("Error creating event", { id: "creatingEvent" });
            console.error("Error creating event", error);
        }
    };

    return (
        <Root>
            <CssBaseline />
            <Global
                styles={{
                    ".MuiDrawer-root > .MuiPaper-root": {
                        height: drawerBleeding,
                        overflow: "visible",
                        backgroundColor: "#24292C", // Example background color
                    },
                }}
            />
            <SwipeableDrawer
                container={container}
                anchor="bottom"
                open={props.isSubEventFormOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={styles}
            >
                <StyledBox
                    sx={{
                        position: "absolute",
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: "visible",
                        right: 0,
                        left: 0,
                    }}
                >
                    <Puller />
                </StyledBox>
                <StyledBox
                    sx={{
                        px: 2,
                        pb: 2,
                        height: "100%",
                        overflow: "auto",
                        backgroundColor: "#24292C",
                    }}
                >
                    <form onSubmit={handleSubmit} className="w-4/5 mx-auto">
                        <h1 className="flex justify-center items-center text-violet-600 mt-5">
                            <HiCalendar className="mr-2" />
                            Add Activity
                        </h1>
                        <div className="mb-5">
                            <Label
                                htmlFor="title"
                                className="mb-2 block text-base text-indigo-300"
                            >
                                Title
                            </Label>
                            <input
                                className="w-full p-2 rounded bg-grey-primary text-grey-tertiary"
                                id="title"
                                name="title"
                                placeholder="Enter activity name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <Label
                                htmlFor="description"
                                className="mb-2 block text-base text-indigo-300"
                            >
                                Venue Name
                            </Label>
                            <input
                                type="text"
                                className="w-full p-2 rounded bg-grey-primary text-grey-tertiary border-none"
                                id="description"
                                name="venueLocation"
                                placeholder="Write event description..."
                                value={venue_name}
                                onChange={(e) => setVenue_name(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <Label
                                htmlFor="description"
                                className="mb-2 block text-base text-indigo-300"
                            >
                                Venue Location
                            </Label>
                            <input
                                type="text"
                                className="w-full p-2 rounded bg-grey-primary text-grey-tertiary border-none"
                                id="description"
                                name="venueLocation"
                                placeholder="Write event description..."
                                value={venue_location}
                                onChange={(e) =>
                                    setVenue_location(e.target.value)
                                }
                            />
                        </div>
                        <div className="mb-5">
                            <Label
                                htmlFor="description"
                                className="mb-2 block text-base text-indigo-300"
                            >
                                Venue Capacity
                            </Label>
                            <input
                                type="number"
                                className="w-full p-2 rounded bg-grey-primary text-grey-tertiary border-none"
                                id="capacity"
                                name="venueCapacity"
                                placeholder="Enter venue capacity"
                                value={venue_capacity}
                                onChange={(e) =>
                                    setVenue_capacity(Number(e.target.value))
                                }
                            />
                        </div>

                        <div className="mb-6 flex flex-col">
                            <Label className="mb-2 block text-base text-indigo-300">
                                Start date
                            </Label>
                            <DatePicker
                                placeholderText="Select a date"
                                selected={start_datetime}
                                onChange={(date: Date) =>
                                    setStart_datetime(date)
                                }
                                dateFormat="yyyy-MM-dd"
                                className="w-full p-2 rounded bg-grey-primary text-grey-tertiary border-none"
                            />
                        </div>
                        <div className="mb-6 flex flex-col">
                            <Label className="mb-2 block text-base text-indigo-300">
                                End date
                            </Label>
                            <DatePicker
                                placeholderText="Select a date"
                                className="w-full p-2  rounded bg-grey-primary text-grey-tertiary border-none"
                                selected={end_datetime}
                                onChange={(date: Date) => setEnd_datetime(date)}
                                dateFormat="yyyy-MM-dd"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="border-none w-full bg-violet-600 hover:bg-violet-700 hover:duration-100"
                        >
                            <HiCalendar className="mr-2" />
                            Create event
                        </Button>
                    </form>
                </StyledBox>
            </SwipeableDrawer>
        </Root>
    );
}
