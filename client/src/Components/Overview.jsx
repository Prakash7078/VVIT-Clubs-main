
// import { motion } from "framer-motion";
import cord from '../Images/add-friend.png'
import see from '../Images/binoculars.png';
import events from '../Images/event.png';
import schedule from '../Images/schedule.png';
const About = () => {
  return (
    // <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
    <div id="#about" className="bg-[#ffcc80] py-16">
      <h1 className='text-center font-bold md:text-4xl text-2xl '>Why to Choose</h1>
      <div className="grid grid-cols-1 mt-16 md:grid-cols-2 gap-6 lg:gap-0 lg:grid-cols-4">
        <div className='w-3/4 mx-auto flex flex-col gap-4 items-center'>
          <img src={events} className='w-10 h-10' alt="clubs"/>
          <p className='leading-normal sm:px-2'>You can register for clubs and events which one you would like to join. Explore about the clubs and events.</p>
          <button className="font-bold text-lg mt-4">Start now &gt;</button>
        </div>   
        <div className='w-3/4 mx-auto flex flex-col gap-4 items-center'>
          <img src={see} className='w-10 h-10' alt="frds"/>
          <p className='leading-normal sm:px-2'>Show the event guestlist so people can see what their friends are attending and winning, loosing.</p>
          <button className="font-bold text-lg mt-4">Start now &gt;</button>
        </div>   
        <div className='w-3/4 mx-auto flex flex-col gap-4 items-center'>
          <img src={cord} className='w-10 h-10' alt="coordinators"/>
          <p className='leading-normal sm:px-2'>If you want any details about clubs, events and their registartions contact the coordinator of that club.</p>
          <button className="font-bold text-lg mt-4">Start now &gt;</button>
        </div>   
        <div className='w-3/4 mx-auto flex flex-col gap-4 items-center'>
          <img src={schedule} className='w-10 h-10' alt="calender"/>
          <p className='leading-normal sm:px-2'>See the start and end times of events of the day in calender and attend within time and enjoy your day.</p>
          <button className="font-bold text-lg mt-4">Start now &gt;</button>
        </div>   
        
      </div>
    </div>
    // </motion.div>
  );
};

export default About;