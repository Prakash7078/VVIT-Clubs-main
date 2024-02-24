import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../redux/eventSlice";
import { MdOutlineEvent } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { formatedDate, formatedDateTime } from "../config/datetimeConverter";
import { getRegisters } from "../redux/registerSlice";

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
    <div className="mt-32 grid grid-cols-2">
      <div className=" ">
        <div className="flex justify-center">
          <img
            src={event?.eventimage}
            className="w-2/3 object-cover rounded-md h-72"
            alt="event"
          />
        </div>
        <div className="flex shadow-md py-10 px-4 w-2/3 mx-auto my-16 flex-col gap-5 ">
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
      <div className="">
        {registers
          .filter((item) => item.event === event.eventname)
          .map((register) => (
            <div>
              <img src={register.userimage} className="w-20 h-20" alt="user" />
              <h1>{register.name}</h1>
              <h1>{register.event}</h1>
              <h1>{register.isWinner ? "winner" : ""}</h1>
            </div>
          ))}
      </div>
    </div>
  );
}

export default EventDetails;
