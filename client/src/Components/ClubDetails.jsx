import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClubs } from "../redux/clubSlice";
import { Rings } from "react-loader-spinner";
import nodata from "../Images/Nodata.jpg";
import { formatedDate, formatedDateTime } from "../config/datetimeConverter";
import { MdOutlineEvent } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";

function AllClubDetails() {
  const [clubname, setClubname] = useState("");
  const clubs = useSelector((state) => state.clubs.clubs);
  const loading = useSelector((state) => state.events.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchClubs = async () => {
      await dispatch(getClubs());
    };
    fetchClubs();
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
    <div className="mt-32 md:mx-20 mx-5  ">
      <div className="font-bold md:text-4xl text-2xl">All Clubs</div>
      <div className="my-10 bg-[#fff3e0] md:p-8 p-6">
        <div className="flex md:flex-row gap-6 items-center flex-col justify-between border pb-5 border-b-gray-400">
          <div>
            <h1 className="font-semibold text-lg text-gray-600">
              Created Clubs
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
        {clubs && clubs.length > 0 ? (
          clubs
            .filter((item) => !clubname || item.name === clubname)
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
                      src={item?.image}
                      alt="event"
                      className="object-cover w-full h-32 md:h-40"
                    />
                  </div>
                  <div className="md:col-span-8  col-span-8 flex md:flex-row flex-col gap-6 md:gap-0 justify-between">
                    <div className="flex flex-col gap-3">
                      <h1 className="font-bold text-xl">{item?.name} Club</h1>
                      <div className="flex items-center gap-3">
                        <MdOutlineEvent size={20} className="text-gray-500" />
                        <h1>{item?.name}</h1>
                      </div>
                      <div className="flex items-center gap-3">
                        <h1>
                          {item?.desc?.length > 30
                            ? item?.desc?.slice(0, 30) + "..."
                            : item?.desc}
                        </h1>
                      </div>
                    </div>
                    <div className="">
                      <Link to={`/${item.name}`}>
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
            <h1 className="font-bold text-2xl">No Clubs</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllClubDetails;
