import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../redux/eventSlice";
import { MdOutlineEvent } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { formatedDateTime } from "../config/datetimeConverter";
import { getRegisters } from "../redux/registerSlice";
import EventRegistrations from "./EventRegistrations";

function EventDetails() {
  const { id } = useParams();
  const events = useSelector((state) => state.events.events);
  const dispatch = useDispatch();
  const [event, setEvent] = useState([]);
  const registers = useSelector((state) => state.register.registers);

  useEffect(() => {
    const fetchEvents = async () => {
      await dispatch(getEvents());
      await dispatch(getRegisters());
      const eventdetails = events.find((item) => item._id === id);
      console.log(eventdetails);
      setEvent(eventdetails);
    };
    fetchEvents();
  }, [dispatch]);
  return (
    <div className="lg:mt-32 mt-24 grid lg:grid-cols-2 grid-cols-1">
      <div className=" ">
        <div className="flex mx-3 lg:mx-0 justify-center">
          <img
            src={event?.eventimage}
            className="lg:w-2/3  object-cover rounded-md h-72"
            alt="event"
          />
        </div>
        <div className="flex shadow-md py-10 px-4 lg:w-2/3 lg:mx-auto mx-4 my-16 flex-col gap-5 ">
          <h1 className="font-bold text-2xl">{event?.eventname} Event</h1>
          <div className="flex items-center gap-3">
            <MdOutlineEvent size={20} className="text-gray-500" />
            <h1>{event?.clubname} Club</h1>
          </div>
          <div className="flex items-center gap-3">
            <CiLocationOn className="text-gray-600" size={20} />
            <h1>{event?.description}</h1>
          </div>
          <div className="flex items-center gap-3">
            <IoTimeOutline size={20} className="text-gray-600" />
            <h1>{formatedDateTime(event?.eventdate)}</h1>
          </div>
        </div>
      </div>
      <div className="mx-4 relative">
        <EventRegistrations club={event?.clubname} event={event?.eventname} />
      </div>
    </div>
  );
}

export default EventDetails;
