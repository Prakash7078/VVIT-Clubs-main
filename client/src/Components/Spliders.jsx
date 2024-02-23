import React, { useState } from 'react'; // Import useState for managing the showMore state
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import YouTube from 'react-youtube';
import vvit from '../Images/vvit-main.jpeg';
import dance from '../Images/dance1.avif';
import music from '../Images/music.jpg';
// import {motion} from 'framer-motion'
import { Button} from "@material-tailwind/react";

function Spliders() {
  const images = [vvit,dance,music, vvit,dance];
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  // const [showMore, setShowMore] = useState(false); // Initialize the showMore state

  // const toggleShowMore = () => {
  //   setShowMore(!showMore); // Toggle the showMore state when the button is clicked
  // };

  return (
    <div id="home" className='bg-[#fff3e0] grid md:grid-cols-2 gap-5  md:px-10 py-20'>
      
      <div className='flex flex-col md:items-start  px-10 md:px-0 items-center md:gap-6 gap-4 lg:w-3/4 mx-auto font-medium'>
          <h1 className='text-2xl font-bold'>Celebrity Visits of College</h1>
          <p className="w-full lg:leading-loose text-gray-700">
            Experience the vibrant tapestry of talent as our college clubs take center stage during celebrity visits! From electrifying dance performances that defy gravity to soul-stirring musical renditions that captivate the senses, our clubs showcase unparalleled skills and creativity.
          </p>
          <Link to="/gallery">
          <Button color='brown'>Visit Glory</Button>
        </Link>
          {/* <button onClick={toggleShowMore} className='text-blue-300 font-bold text-sm hover:bg-blue-gray-300 w-fit mx-auto p-1 rounded-lg mt-2'>
            {showMore ? 'Read Less' : 'Read More'}
          </button> */}
      </div>

      <div className="md:block cursor-pointer w-3/4  mx-auto  ">
        <Splide
          options={{
            rewind: true,
            perPage: 1,
            speed: 500,
            arrows: true,
            interval: 1000,
            autoplay: true,
          }}
          aria-label="React Splide Example"
          data-splide-interval="1000"
        >
          {images.map((image, index) => {
            return (
              <SplideSlide key={index} className=''>
                <img className='object-cover rounded-md w-full h-60'  src={image} alt="Banner" />
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </div>
  );
}

export default Spliders;
