import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../redux/eventSlice";
import { Rings } from "react-loader-spinner";
import nodata from "../Images/Nodata.jpg";
import { formatedDate, formatedDateTime } from "../config/datetimeConverter";
import { MdOutlineEvent } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";

function Allevents() {
  const [clubname, setClubname] = useState("");
  const events = useSelector((state) => state.events.events);
  const loading = useSelector((state) => state.events.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchEvents = async () => {
      await dispatch(getEvents());
    };
    fetchEvents();
  }, [dispatch]);
  // Function to handle page change

  // const handleDelete=async(id)=>{
  //     await dispatch(deleteEvent(id));
  //     await dispatch(getEvents());
  // }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Rings
          height="80"
          width="80"
          color="#21BF73"
          radius="10"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="rings-loading"
        />
      </div>
    );
  }

  return (
    <div className="mt-32 md:mx-20 mx-8  ">
      <div className="font-bold md:text-4xl text-2xl">All Events</div>
      <div className="my-10 bg-[#fff3e0] md:p-8 p-6">
        <div className="flex md:flex-row gap-6 items-center flex-col justify-between border pb-5 border-b-gray-400">
          <div>
            <h1 className="font-semibold text-lg text-gray-600">
              Created Events
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="font-medium">Sort by:</h1>
            <select
              className="px-8 p-2"
              value={clubname}
              onChange={(e) => setClubname(e.target.value)}
            >
              <option value="">All Clubs</option>
              <option value="DANCE">DANCE</option>
              <option value="MUSIC">MUSIC</option>
              <option value="THEATER">THEATER</option>
              <option value="YOGA">YOGA</option>
            </select>
          </div>
        </div>
        {events && events.length > 0 ? (
          events
            .filter((item) => !clubname || item.clubname === clubname)
            .map((item) => (
              <div className="mt-10" key={item._id}>
                <div className="bg-orange-100 w-fit py-3 px-4 rounded-md">
                  <h1 className="text-gray-800 font-semibold">
                    Created On {formatedDate(item?.createdAt)}
                  </h1>
                </div>
                <div className="mt-6 grid grid-cols-12 md:gap-10 gap-4 border border-b-gray-400 pb-8">
                  <div className="md:col-span-3 col-span-4">
                    <img
                      src={item?.eventimage}
                      alt="event"
                      className="object-cover w-full h-32 md:h-40"
                    />
                  </div>
                  <div className="md:col-span-8  col-span-8 flex md:flex-row flex-col gap-6 md:gap-0 justify-between">
                    <div className="flex flex-col gap-3">
                      <h1 className="font-bold text-xl">
                        {item?.eventname} Event
                      </h1>
                      <div className="flex items-center gap-3">
                        <MdOutlineEvent size={20} className="text-gray-500" />
                        <h1>{item?.clubname}</h1>
                      </div>
                      <div className="flex items-center gap-3">
                        <CiLocationOn className="text-gray-600" size={20} />
                        <h1>{item?.description}</h1>
                      </div>
                      <div className="flex items-center gap-3">
                        <IoTimeOutline size={20} className="text-gray-600" />
                        <h1>{formatedDateTime(item?.eventdate)}</h1>
                      </div>
                    </div>
                    <div className="">
                      <Link to={`/allEvents/${item?._id}/details`}>
                        <button className="bg-brown-400 md:px-4 px-2 py-2 rounded-lg text-white font-semibold">
                          See Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-10 mt-10">
            <img
              src={nodata}
              className="w-60 md:w-80 rounded-lg"
              alt="nodata"
            />
            <h1 className="font-bold text-2xl">No Events</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Allevents;
