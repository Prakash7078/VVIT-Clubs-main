// components/Calendar.js
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events }) => (
  <div style={{ height: '500px' }}>
    <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" />
  </div>
);

export default MyCalendar;
