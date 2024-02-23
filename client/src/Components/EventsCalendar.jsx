import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const Allevents = ({ events }) => {
  // Assuming you receive events as a prop
  

  const localizer = momentLocalizer(moment);

  const eventsForCalendar = events.map((event) => ({
    title: event.eventname,
    start: new Date(event.eventdate), // Assuming eventdate is in the correct format
    end: new Date(event.eventdate), // You might want to adjust this if events have different end times
  }));

  return (
    <div className="mt-32 md:mx-20 mx-8">
      <h1 className="text-center font-bold text-3xl mb-6">All Events</h1>

      <div className="my-10 bg-[#fff3e0] md:p-8 p-6">
        <Calendar
          localizer={localizer}
          events={eventsForCalendar}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }} // Adjust the height as needed
        />
      </div>
    </div>
  );
};

export default Allevents;
