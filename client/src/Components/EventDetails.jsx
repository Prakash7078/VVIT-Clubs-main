import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../redux/eventSlice";
import { MdOutlineEvent } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { formatedDateTime } from "../config/datetimeConverter";
import { getRegisters } from "../redux/registerSlice";
import EventRegistrations from "./EventRegistrations";
import { toast } from "react-toastify";
import { addRegister, deleteRegister } from "../redux/registerSlice";
function EventDetails() {
  const { id } = useParams();
  const events = useSelector((state) => state.events.events);
  const dispatch = useDispatch();
  const [event, setEvent] = useState([]);
  const [registerInfo, setRegisterInfo] = useState(null);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();
  const registers = useSelector((state) => state.register.registers);
  useEffect(() => {
    const fetchEvents = async () => {
      dispatch(getEvents());
      dispatch(getRegisters());
      const eventdetails = events.find((item) => item._id === id);
      console.log("eventdetails", eventdetails);
      setEvent(eventdetails);
    };
    fetchEvents();
  }, [dispatch, id]);
  useEffect(() => {
    findRegister();
  }, [events]);
  const handleRegister = async (clubname, event) => {
    if (userInfo) {
      try {
        const res1 = await dispatch(
          addRegister({
            clubname,
            event,
            userInfo,
          })
        );
        await dispatch(getRegisters());
        console.log(res1.payload);
        setRegisterInfo(res1.payload);
        console.log("registerInfo", registerInfo);
      } catch (err) {
        toast.error("You already registered for one of these events");
      }
    } else {
      navigate("/login");
    }
  };

  //Find the specific register of club .
  const findRegister = async () => {
    await dispatch(getRegisters());
    if (userInfo && registers.length > 0) {
      const res = registers.find(
        (register) =>
          register.eventregisteruser.rollno === userInfo.rollno &&
          register.clubname === event?.clubname
      );

      // Check if a matching register object was found
      if (res) {
        setRegisterInfo(res);
      } else {
        // Handle the case where no matching register was found
        console.log("No matching register found.");
        setRegisterInfo(null);
      }
    }
  };
  const handleDeleteregister = async (rollno) => {
    try {
      await dispatch(deleteRegister(rollno));
      await dispatch(getRegisters());
      await findRegister();
      setRegisterInfo(null);
      console.log("delete", registerInfo);
    } catch (err) {
      toast.error("Registration not deleted succesfully");
    }
  };

  return (
    <div className="">
      <div className="lg:mt-32 my-24 grid lg:grid-cols-2 grid-cols-1">
        <div className=" ">
          <div className="flex mx-3 lg:mx-0 justify-center">
            <img
              src={event?.eventimage}
              className="lg:w-2/3  object-cover rounded-md h-72"
              alt="event"
            />
          </div>
          <div className="flex shadow-md py-10 px-4 lg:w-2/3 lg:mx-auto mx-4 md:my-16 flex-col gap-5 ">
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
            <div className="mt-3 flex justify-center">
              {registerInfo &&
              registerInfo?.clubname &&
              registerInfo?.event?._id === event?._id ? (
                <button
                  className="bg-red-500 md:px-8 px-2 lg:py-2 text-white h-fit  "
                  onClick={() =>
                    handleDeleteregister(
                      registerInfo?.eventregisteruser?.rollno
                    )
                  }
                >
                  UnRegister
                </button>
              ) : (
                <button
                  className="bg-green-500 md:px-8 px-2 lg:py-2 text-white h-fit lg:font-bold "
                  onClick={() => handleRegister(event.clubname, event)}
                >
                  Register
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mx-4 relative">
          <EventRegistrations club={event?.clubname} event={event?._id} />
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
