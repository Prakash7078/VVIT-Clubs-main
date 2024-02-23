import React from 'react';
import YouTube from 'react-youtube';

const Gallery = () => {
  // Replace with your YouTube video IDs and corresponding titles
  const videoList = [
    { id: 'liEIKt9AClI', title: 'Video 1 Title' },
    { id: 'liEIKt9AClI', title: 'Video 2 Title' },
    { id: 'liEIKt9AClI', title: 'Video 3 Title' },
  ];

  return (
    <div className="bg-[#fff3e0] h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">College Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videoList.map((video, index) => (
          <div key={index} className="cursor-pointer p-4 bg-white rounded-md shadow-md transition-transform transform hover:scale-105">
            <YouTube videoId={video.id} opts={{ width: '100%' }} />
            <p className="text-center mt-2">{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
