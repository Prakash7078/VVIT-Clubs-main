// import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import cord from "../Images/add-friend.png";
import see from "../Images/binoculars.png";
import events from "../Images/event.png";
import Calender from "./Calender";
import EventGuestList from "./EventGuestList";
import schedule from "../Images/schedule.png";
import { useSelector } from "react-redux";
const About = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();
  const showAllevents = () => {
    if (userInfo) {
      navigate("/allEvents");
    } else {
      navigate("/login");
    }
  };
  const showClubDetails = () => {
    // Navigate to the ClubDetails component

    navigate("/clubDetails");
  };
  const showEventGuestList = () => {
    // Navigate to the EventGuestList component
    navigate("/eventGuestList");
  };
  const showCalender = () => {
    navigate("/calender");
  };
  return (
    // <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
    <div id="#about" className="bg-[#ffcc80] py-16">
      <h1 className="text-center font-bold md:text-4xl text-3xl ">
        Why to Choose
      </h1>
      <div className="grid grid-cols-1 lg:mx-32 md:mx-10 mt-16 md:grid-cols-2 lg:gap-0 lg:grid-cols-4 gap-14 ">
        <div className="w-3/4 mx-auto flex flex-col gap-4 items-center">
          <img src={events} className="w-10 h-10" alt="clubs" />
          <p className="leading-normal sm:px-2">
            You can register for clubs and events which one you would like to
            join. Explore about the clubs and events.
          </p>
          <button className="font-bold text-lg mt-4" onClick={showAllevents}>
            Start now &gt;
          </button>
        </div>
        <div className="w-3/4 mx-auto flex flex-col gap-4 items-center">
          <img src={see} className="w-10 h-10" alt="frds" />
          <p className="leading-normal sm:px-2">
            Make sure to check out the list of events with their corresponding
            details, along with the guest list for everyone to review.
          </p>
          <button
            className="font-bold text-lg mt-4"
            onClick={showEventGuestList}
          >
            Start now &gt;
          </button>
        </div>
        <div className="w-3/4 mx-auto flex flex-col gap-4 items-center">
          <img src={cord} className="w-10 h-10" alt="coordinators" />
          <p className="leading-normal sm:px-2">
            If you want any details about clubs, events and their registartions
            contact the coordinator of that club.
          </p>
          <button className="font-bold text-lg mt-4" onClick={showClubDetails}>
            Start now &gt;
          </button>
        </div>
        <div className="w-3/4 mx-auto flex flex-col gap-4 items-center">
          <img src={schedule} className="w-10 h-10" alt="calender" />
          <p className="leading-normal sm:px-2">
            See the start and end times of events of the day in calender and
            attend within time and enjoy your day.
          </p>
          <button className="font-bold text-lg mt-4" onClick={showCalender}>
            Start now &gt;
          </button>
        </div>
      </div>
    </div>
    // </motion.div>
  );
};

export default About;
