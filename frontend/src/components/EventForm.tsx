import { useState } from 'react';
import { Button, Datepicker, Drawer, Label, Textarea, TextInput, theme } from 'flowbite-react';
import { HiCalendar, HiUserAdd } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';

interface EventFormFunction {
  parameter: boolean;
  setFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

const EventForm = ({ parameter, setFunction }: EventFormFunction) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [organizer, setOrganizer] = useState('');
  const [subevents, setSubevents] = useState([]);

  const handleClose = () => setFunction(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      name: title,
      description: description,
      start_date: startDate ? startDate.toISOString().split('T')[0] : null,
      end_date: endDate ? endDate.toISOString().split('T')[0] : null,
      organizer: parseInt(organizer),
      subevents: subevents.map((subevent) => ({
        ...subevent,
        start_datetime: subevent.start_datetime ? new Date(subevent.start_datetime).toISOString() : null,
        end_datetime: subevent.end_datetime ? new Date(subevent.end_datetime).toISOString() : null,
      })),
    };

    console.log('Submitting event data:', eventData);

    try {
      const response = await axios.post('http://localhost:8000/user/event/', eventData);
      console.log('Event created successfully:', response.data);
      alert('Event created successfully');
      handleClose();
    } catch (error) {
      console.error('Error creating event:', error.response ? error.response.data : error.message);
      alert('Failed to create event');
    }
  };

  const handleAddSubevent = () => {
    setSubevents([...subevents, { id: Date.now(), name: '', start_datetime: '', end_datetime: '', venue_name: '', venue_location: '', venue_capacity: 100, capacity: 100 }]);
  };

  const handleSubeventChange = (index, field, value) => {
    const updatedSubevents = subevents.map((subevent, i) => (i === index ? { ...subevent, [field]: value } : subevent));
    setSubevents(updatedSubevents);
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
                placeholder="Apple Keynote"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
              <Label htmlFor="startDate" className="mb-2 block">
                Start Date
              </Label>
              <Datepicker
                id="startDate"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="endDate" className="mb-2 block">
                End Date
              </Label>
              <Datepicker
                id="endDate"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="organizer" className="mb-2 block">
                Organizer ID
              </Label>
              <TextInput
                id="organizer"
                name="organizer"
                placeholder="Organizer ID"
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <Button type="button" onClick={handleAddSubevent}>
                <HiUserAdd className="mr-2" /> Add Sub-Event
              </Button>
            </div>
            {subevents.map((subevent, index) => (
              <div key={subevent.id} className="mb-6 border p-4 rounded">
                <Label htmlFor={`subevent-name-${index}`} className="mb-2 block">
                  Sub-Event Name
                </Label>
                <TextInput
                  id={`subevent-name-${index}`}
                  name={`subevent-name-${index}`}
                  placeholder="Sub-event name"
                  value={subevent.name}
                  onChange={(e) => handleSubeventChange(index, 'name', e.target.value)}
                />
                <Label htmlFor={`subevent-start-${index}`} className="mb-2 block mt-4">
                  Start Date & Time
                </Label>
                <Datepicker
                  id={`subevent-start-${index}`}
                  selected={subevent.start_datetime}
                  onChange={(date) => handleSubeventChange(index, 'start_datetime', date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="yyyy-MM-dd HH:mm"
                />
                <Label htmlFor={`subevent-end-${index}`} className="mb-2 block mt-4">
                  End Date & Time
                </Label>
                <Datepicker
                  id={`subevent-end-${index}`}
                  selected={subevent.end_datetime}
                  onChange={(date) => handleSubeventChange(index, 'end_datetime', date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="yyyy-MM-dd HH:mm"
                />
                <Label htmlFor={`subevent-venue-${index}`} className="mb-2 block mt-4">
                  Venue Name
                </Label>
                <TextInput
                  id={`subevent-venue-${index}`}
                  name={`subevent-venue-${index}`}
                  placeholder="Venue name"
                  value={subevent.venue_name}
                  onChange={(e) => handleSubeventChange(index, 'venue_name', e.target.value)}
                />
                <Label htmlFor={`subevent-location-${index}`} className="mb-2 block mt-4">
                  Venue Location
                </Label>
                <TextInput
                  id={`subevent-location-${index}`}
                  name={`subevent-location-${index}`}
                  placeholder="Venue location"
                  value={subevent.venue_location}
                  onChange={(e) => handleSubeventChange(index, 'venue_location', e.target.value)}
                />
                <Label htmlFor={`subevent-capacity-${index}`} className="mb-2 block mt-4">
                  Venue Capacity
                </Label>
                <TextInput
                  id={`subevent-capacity-${index}`}
                  name={`subevent-capacity-${index}`}
                  placeholder="Venue capacity"
                  type="number"
                  value={subevent.venue_capacity}
                  onChange={(e) => handleSubeventChange(index, 'venue_capacity', e.target.value)}
                />
                <Label htmlFor={`subevent-capacity-${index}`} className="mb-2 block mt-4">
                  Capacity
                </Label>
                <TextInput
                  id={`subevent-capacity-${index}`}
                  name={`subevent-capacity-${index}`}
                  placeholder="Capacity"
                  type="number"
                  value={subevent.capacity}
                  onChange={(e) => handleSubeventChange(index, 'capacity', e.target.value)}
                />
              </div>
            ))}
            <Button className="w-full" type="submit">
              <HiCalendar className="mr-2" /> Create event
            </Button>
          </form>
        </Drawer.Items>
      </Drawer>
    </div>
  );
};

export default EventForm;
