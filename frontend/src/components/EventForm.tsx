import React, { useState } from 'react';
import {
    Button,
    Drawer,
    Label,
    Textarea,
    TextInput,
    // theme,
} from "flowbite-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HiCalendar } from "react-icons/hi";


interface EventFormFunction {
    parameter: boolean;
    setFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

const EventForm = ({ parameter, setFunction }: EventFormFunction) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleClose = () => setFunction(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const eventData = {
            name,
            description,
            start_date: startDate ? startDate.toISOString().split('T')[0] : '',
            end_date: endDate ? endDate.toISOString().split('T')[0] : '',
            organizer: 1,
            subevents: []
        };

        try {
            const response = await fetch('http://localhost:8000/user/event/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
                credentials: 'include', // Include credentials (cookies)
            });

            if (response.ok) {
                // Handle success
                console.log('Event created successfully');
                handleClose();
            } else {
                // Handle error
                const errorData = await response.json();
                console.error('Error creating event:', errorData);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <div className="z-20">
            <Drawer open={parameter} onClose={handleClose}>
                <Drawer.Header title="NEW EVENT" titleIcon={HiCalendar} />
                <Drawer.Items>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6 mt-3">
                            <Label htmlFor="title" className="mb-2 block">
                                Title
                            </Label>
                            <TextInput
                                id="title"
                                name="title"
                                placeholder="Enter event name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <Label>Pick start date</Label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date: Date) => setStartDate(date)}
                                dateFormat="yyyy-MM-dd"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-6">
                            <Label>Pick end date</Label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date: Date) => setEndDate(date)}
                                dateFormat="yyyy-MM-dd"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <Button type="submit" className="w-full">
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
