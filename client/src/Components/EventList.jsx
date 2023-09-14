// components/EventList.js
import React, { useEffect, useState } from 'react';
import MyCalendar from './Calendar';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from your API
    axios.get('/api/events').then((response) => {
      setEvents(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Events Calendar</h2>
      <MyCalendar events={events} />
    </div>
  );
};

export default EventList;
