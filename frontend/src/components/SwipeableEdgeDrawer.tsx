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

const drawerBleeding = 0;

interface Props {
    window?: () => Window;
    isEventFormOpen: boolean;
    setEventFormIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setEventFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
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

export default function SwipeableEdgeDrawer(props: Props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const { window } = props;

    const handleClose = () => props.setEventFormIsOpen(false);
    const styles = {
        ".MuiDrawer-paper ": {
            height: "calc(100% - 100px)",
            top: 100,
        },
    };

    const toggleDrawer = (newOpen: boolean) => () => {
        props.setEventFormIsOpen(newOpen);
    };

    // This is used only for the example
    const container =
        window !== undefined ? () => window().document.body : undefined;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const eventData = {
            name,
            description,
            start_date: startDate ? startDate.toISOString().split("T")[0] : "",
            end_date: endDate ? endDate.toISOString().split("T")[0] : "",
            organizer: 1,
            subevents: [],
        };

        try {
            const response = await fetch(`${userprofile}/user/event/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(eventData),
                credentials: "include",
            });

            if (response.ok) {
                // Handle success
                console.log("Event created successfully");
                handleClose();
                props.setEventFormSubmitted((prevState) => !prevState); // Toggle the state variable
            } else {
                // Handle error
                const errorData = await response.json();
                console.error("Error creating event:", errorData);
            }
        } catch (error) {
            console.error("Network error:", error);
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
                open={props.isEventFormOpen}
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
                    }}
                >
                    <form onSubmit={handleSubmit} className="w-4/5 mx-auto">
                        <h1 className="flex justify-center items-center text-violet-800 mt-5">
                            <HiCalendar className="mr-2" />
                            NEW EVENT
                        </h1>
                        <div className="mb-5">
                            <Label
                                htmlFor="title"
                                className="mb-2 block text-base"
                            >
                                Title
                            </Label>
                            <input
                                className="w-full p-2 rounded bg-grey-primary text-grey-tertiary"
                                id="title"
                                name="title"
                                placeholder="Enter event name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <Label
                                htmlFor="description"
                                className="mb-2 block text-base"
                            >
                                Description
                            </Label>
                            <textarea
                                className="w-full p-2 rounded bg-grey-primary text-grey-tertiary border-none"
                                id="description"
                                name="description"
                                placeholder="Write event description..."
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-6 flex flex-col">
                            <Label className="mb-2 block text-base">
                                Start date
                            </Label>
                            <DatePicker
                                placeholderText="Select a date"
                                selected={startDate}
                                onChange={(date: Date) => setStartDate(date)}
                                dateFormat="yyyy-MM-dd"
                                className="w-full p-2 rounded bg-grey-primary text-grey-tertiary border-none"
                            />
                        </div>
                        <div className="mb-6 flex flex-col">
                            <Label className="mb-2 block text-base">
                                End date
                            </Label>
                            <DatePicker
                                placeholderText="Select a date"
                                className="w-full p-2  rounded bg-grey-primary text-grey-tertiary border-none"
                                selected={endDate}
                                onChange={(date: Date) => setEndDate(date)}
                                dateFormat="yyyy-MM-dd"
                            />
                        </div>
                        <Button type="submit" className="w-full bg-violet-600">
                            <HiCalendar className="mr-2" />
                            Create event
                        </Button>
                    </form>
                </StyledBox>
            </SwipeableDrawer>
        </Root>
    );
}
