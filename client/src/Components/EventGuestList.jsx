import React from 'react';
import { useParams } from 'react-router-dom';
import eventImage from '../Images/vvit-event.png';
const EventGuestList = () => {
  // Dummy data for event details, guests, and performances
  const eventsList = [
    {
      name: 'Event 1',
      date: '2024-02-20',
      location: 'Location 1',
      highlights: 'Highlights of Event 1',
      guests: [
        { name: 'Guest 1', performance: 'Dance' },
        { name: 'Guest 2', performance: 'Music' },
      ],
    },
    {
      name: 'Event 2',
      date: '2024-02-25',
      location: 'Location 2',
      highlights: 'Highlights of Event 2',
      guests: [
        { name: 'Guest 3', performance: 'Comedy' },
        { name: 'Guest 4', performance: 'Magic' },
      ],
    },
    {
      name: 'Event 3',
      date: '2024-02-25',
      location: 'Location 2',
      highlights: 'Highlights of Event 2',
      guests: [
        { name: 'Guest 3', performance: 'Comedy' },
        { name: 'Guest 4', performance: 'Magic' },
      ],
    },
    
  ];

  
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#fce4ec',
     
    padding: '20px',
  };

  const headingStyle = {
    color: 'black',
    fontSize: '44px',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const circleStyle = {
    backgroundColor: '#FFD8B1', 
    padding: '40px',
    borderRadius: '80%',
    maxWidth: '400px',
    textAlign: 'center',
    margin: '20px',
  };

  return (
    <div style={containerStyle}>
      <img src={eventImage} alt="Event Background" style={{ width: '100%', marginBottom: '20px' }} />

      <h2 style={headingStyle}>Events</h2>
      
      
      {eventsList.map((event, index) => (
        <div key={index} style={circleStyle}>
          <h3><strong>{event.name}</strong></h3>
          <p>Date: {event.date}</p>
          <p>Location: {event.location}</p>
          <p>Highlights: {event.highlights}</p>

          <h4>Guests</h4>
          <ul>
            {event.guests.map((guest, guestIndex) => (
              <li key={guestIndex}>
                <strong>{guest.name}</strong> - {guest.performance}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default EventGuestList;
