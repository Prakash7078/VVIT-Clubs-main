import React from 'react';

const ClubDetails = () => {
  // You can fetch the club details from your backend or use static data
  const clubDetails = [
    {
      name: 'Dance Club',
      description: 'This is a sample club description. You can replace it with the actual content.',
      coordinator: 'John Doe',
      contact: 'john@example.com',
      events: ['Event 1', 'Event 2', 'Event 3'],
    },
    {
      name: 'Music Club',
      description: 'Another sample club description. Replace it with the actual content.',
      coordinator: 'Jane Doe',
      contact: 'jane@example.com',
      events: ['Event A', 'Event B', 'Event C'],
    },
    {
        name: 'Literarture Club',
        description: 'Another sample club description. Replace it with the actual content.',
        coordinator: 'Jane Doe',
        contact: 'jane@example.com',
        events: ['Event A', 'Event B', 'Event C'],
      },
      {
        name: 'Foreign Language Club',
        description: 'Another sample club description. Replace it with the actual content.',
        coordinator: 'Jane Doe',
        contact: 'jane@example.com',
        events: ['Event A', 'Event B', 'Event C'],
      },
      {
        name: 'Culinary Club',
        description: 'Another sample club description. Replace it with the actual content.',
        coordinator: 'Jane Doe',
        contact: 'jane@example.com',
        events: ['Event A', 'Event B', 'Event C'],
      },
      {
        name: 'Technical Club',
        description: 'Another sample club description. Replace it with the actual content.',
        coordinator: 'Jane Doe',
        contact: 'jane@example.com',
        events: ['Event A', 'Event B', 'Event C'],
      },
      {
        name: 'Painting Club',
        description: 'Another sample club description. Replace it with the actual content.',
        coordinator: 'Jane Doe',
        contact: 'jane@example.com',
        events: ['Event A', 'Event B', 'Event C'],
      },
    // Add more club details as needed
  ];

  return (
    <div className="bg-pink-90 py-16 md:pt-20">
      <h1 className="text-center font-stylish md:text-4xl text-3xl">Club Details</h1>
      <div className="grid grid-cols-1 lg:mx-32 md:mx-10 mt-16 gap-8">
        {clubDetails.map((club, index) => (
          <div key={index} className="bg-pink-50 rounded-md p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">{club.name}</h2>
            <p className="text-gray-700 mb-2">{club.description}</p>
            <div className="flex flex-col">
              <p className="font-semibold">Coordinator: {club.coordinator}</p>
              <p>Contact: <a href={`mailto:${club.contact}`} className="text-blue-500">{club.contact}</a></p>

            </div>
            <div className="mt-4">
              <p className="font-semibold mb-2">Events:</p>
              <ul className="list-disc pl-6">
                {club.events.map((event, eventIndex) => (
                  <li key={eventIndex}>{event}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubDetails;
