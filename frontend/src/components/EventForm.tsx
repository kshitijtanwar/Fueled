import {
    Button,
    Datepicker,
    Drawer,
    Label,
    Textarea,
    TextInput,
    theme,
} from "flowbite-react";

import { HiCalendar, HiUserAdd } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

interface EventFormFunction {
    parameter: boolean;
    setFunction: React.Dispatch<React.SetStateAction<boolean>>;
}
const EventForm = ({ parameter, setFunction }: EventFormFunction) => {
    const handleClose = () => setFunction(false);

    return (
        <div className="z-20">
            <Drawer open={parameter} onClose={handleClose}>
                <Drawer.Header title="NEW EVENT" titleIcon={HiCalendar} />
                <Drawer.Items>
                    <form action="#">
                        <div className="mb-6 mt-3">
                            <Label htmlFor="title" className="mb-2 block">
                                Title
                            </Label>
                            <TextInput
                                id="title"
                                name="title"
                                placeholder="Apple Keynote"
                            />
                        </div>
                        <div className="mb-6">
                            <Label htmlFor="description" className="mb-2 block">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Write event description..."
                                rows={4}
                            />
                        </div>
                        <div className="mb-6">
                            <Datepicker />
                        </div>
                        <div className="mb-6">
                            <TextInput
                                id="guests"
                                name="guests"
                                placeholder="Add guest email"
                                type="search"
                                rightIcon={() => (
                                    <Button
                                        size="sm"
                                        className="[&>span]:items-center [&>span]:px-2 [&>span]:py-0"
                                    >
                                        <HiUserAdd className="mr-2" />
                                        Add
                                    </Button>
                                )}
                                theme={{
                                    field: {
                                        rightIcon: {
                                            base: twMerge(
                                                theme.textInput.field.rightIcon
                                                    .base,
                                                "pointer-events-auto"
                                            ),
                                        },
                                    },
                                }}
                            />
                        </div>
                        <Button className="w-full">
                            <HiCalendar className="mr-2" />
                            Create event
                        </Button>
                    </form>
                </Drawer.Items>
            </Drawer>
        </div>
    );
};
export default EventForm;
