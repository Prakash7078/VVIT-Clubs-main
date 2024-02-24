import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRegister, getRegisters } from "../redux/registerSlice";
import { Rings } from "react-loader-spinner";
import { getClubRegisters, getClubs } from "../redux/clubSlice";
import { deleteRegister } from "../redux/registerSlice";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Typography,
  Rating,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { getEvents } from "../redux/eventSlice";
import gold from "../Images/gold-medal.png";
import silver from "../Images/silver-medal.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../Components/Footer";
import Team from "../Components/Team";
import Tutorials from "../Components/Tutorials";
import ClubRegistration from "../Components/ClubRegistration";
import { formatedDateTime } from "../config/datetimeConverter";
import congrats from "../Images/congrats-1.jpg";
import ProfileDialog from "../Components/ProfileDialog";
import EventRegistrations from "../Components/EventRegistrations";
function ClubScreen() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [profileroll, setProfileroll] = useState("");
  const [dialog, setDialog] = useState(false);
  const handleDialog = () => {
    setDialog(!dialog);
  };
  const handleDialogData = (rollno) => {
    setProfileroll(rollno);
    handleDialog();
    console.log(profileroll, rollno);
  };
  const [open, setOpen] = useState(false);
  const [registeropen, setRegisteropen] = useState(false);
  const [dailogData, setDailogData] = useState({ name: "", desc: "" });
  const handleRegisterOpen = () => {
    setRegisteropen(!registeropen);
  };
  const handleOpen = (inp) => {
    if (inp === "winner") {
      setDailogData({
        name: "Winner",
        desc: "Now he is winner for one of these club events, If u don't you can click again ",
      });
    }
    setOpen(!open);
  };

  const navigate = useNavigate();
  const params = useParams();
  const { name } = params;
  const dispatch = useDispatch();
  const clubs = useSelector((state) => state.clubs.clubs);
  const load = useSelector((state) => state.clubs.loading);
  const loading = useSelector((state) => state.auth.loading);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [registerInfo, setRegisterInfo] = useState(null);
  // const registerInfo = useSelector((state) => state.register.registerInfo);
  const registers = useSelector((state) => state.register.registers);
  const clubregisters = useSelector((state) => state.clubs.clubregisters);
  const events = useSelector((state) => state.events.events);

  //fetch event data
  useEffect(() => {
    const fetchData = async () => {
      console.log("user", userInfo);
      await dispatch(getClubs());
      await dispatch(getRegisters());
      await dispatch(getClubRegisters());
      await dispatch(getEvents());
    };
    fetchData();
  }, [dispatch]);
  useEffect(() => {
    findRegister();
  }, [events]);

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
  //Find the specific register of club .
  const findRegister = async () => {
    await dispatch(getRegisters());
    if (userInfo && registers.length > 0) {
      const res = registers.find(
        (register) =>
          register.roll === userInfo.rollno && register.club === name
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

  //fetch clubs and registers

  // const handleSelected=(rollno)=>{
  //      setSelectedRegisteredroll((prevRegistration) => (prevRegistration === rollno ? null : rollno));
  // }
  const filteRegisters = registers?.filter((product) => product.club === name);
  const handleRegister = async (clubname, eventname) => {
    const club = clubname;
    const event = eventname;
    if (userInfo) {
      const { category, username, image, branch, year, section, rollno } =
        userInfo;
      try {
        const res1 = await dispatch(
          addRegister({
            club,
            event,
            category,
            username,
            image,
            branch,
            year,
            section,
            rollno,
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
  if (loading || load) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Rings
          height="80"
          width="80"
          color="#21BF73"
          radius="6"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="rings-loading"
        />
      </div>
    );
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // responsive: [
    //   {
    //     breakpoint:1024,
    //     settings: {
    //       slidesToShow: 3,
    //     },
    //   },
    //   {
    //     breakpoint: 768,
    //     settings: {
    //       slidesToShow: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //     },
    //   },
    // ],
  };
  return (
    <div className="lg:pt-24 pt-8 bg-[#fff3e0]">
      {clubs &&
        clubs
          .filter((item) => item.name === name)
          .map((item, index) => (
            <div key={index} className="m-3 lg:m-2">
              <Card className="flex sm:flex-row w-full mt-12  ">
                <CardHeader
                  shadow={false}
                  floated={false}
                  className="sm:w-1/4 shrink-0  rounded-r-none"
                >
                  <img
                    src={item.image}
                    alt="image"
                    className="w-full h-full object-cover"
                  />
                </CardHeader>
                <CardBody>
                  <div className="flex justify-between">
                    <Typography
                      variant="h6"
                      color="blue"
                      className="uppercase mb-4"
                    >
                      {item.name}
                    </Typography>
                    <Rating unratedColor="blue" ratedColor="blue" />
                  </div>
                  <Typography variant="h4" color="blue-gray" className="mb-2">
                    One of the famous club
                  </Typography>
                  <Typography color="gray" className="font-normal mb-8">
                    {item.desc.length > 500
                      ? item.desc.substring(0, 500) + "..."
                      : item.desc}
                  </Typography>
                  <Button
                    onClick={handleRegisterOpen}
                    variant="text"
                    className="flex items-center gap-2 bg-light-blue-100"
                  >
                    Register
                  </Button>
                </CardBody>
              </Card>
            </div>
          ))}
      <Dialog
        size="xs"
        open={registeropen}
        handler={handleRegisterOpen}
        className="bg-white shadow-none"
      >
        <ClubRegistration value={handleRegisterOpen} club={name} />
      </Dialog>
      {events.filter((item) => item.clubname === name).length > 0 && (
        <Slider {...settings} className="mx-8 mb-10">
          {events
            .filter((item) => item.clubname === name)
            .map((event, index) => (
              <div key={index} className=" mt-16 ">
                <Card
                  shadow={false}
                  className="relative grid md:h-[40rem] h-full w-full max-w-[28rem] sm:max-w-full items-end justify-center overflow-hidden text-center"
                >
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className={`absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center`}
                    style={{ backgroundImage: `url('${event.eventimage}')` }}
                  >
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/100 via-black/70" />
                  </CardHeader>
                  <CardBody className="relative  px-6 md:px-12">
                    {userInfo && (
                      <Typography
                        variant="h2"
                        color="white"
                        className="mb-3 font-bold leading-[1.5] text-sm lg:text-4xl"
                      >
                        Hey {userInfo.username}
                      </Typography>
                    )}
                    <Typography
                      variant="h2"
                      color="white"
                      className="mb-3 font-bold lg:text-5xl leading-[1.5] text-white text-sm"
                    >
                      Be the face of VVIT Clubs
                    </Typography>
                    <Typography
                      variant="h5"
                      className="mb-4 text-white text-sm lg:text-3xl"
                    >
                      {event.eventname} Event
                    </Typography>
                    {registerInfo &&
                    registerInfo.club &&
                    registerInfo.event === event.eventname ? (
                      <button
                        className="bg-red-500 md:px-8 px-2 lg:py-2 text-white h-fit mt-10 "
                        onClick={() => handleDeleteregister(registerInfo.roll)}
                      >
                        UnRegister
                      </button>
                    ) : (
                      <button
                        className="bg-green-500 md:px-8 px-2 lg:py-2 text-white h-fit mt-10 lg:font-bold "
                        onClick={() =>
                          handleRegister(event.clubname, event.eventname)
                        }
                      >
                        Register
                      </button>
                    )}
                    <Typography
                      variant="h5"
                      color="white"
                      className="pt-5 pb-8 leading-[1.5] text-gray-400 text-sm lg:text-xl"
                    >
                      {event.description}
                      <br />

                      {formatedDateTime(event.eventdate)}
                      {/* {moment(event.eventdate).format("YYYY-MM-DD HH:mm:ss")} */}
                    </Typography>
                  </CardBody>
                </Card>
              </div>
            ))}
        </Slider>
      )}
      {userInfo && (
        <div className="relative ">
          <h1 className="font-bold  text-2xl sm:text-3xl pt-10 text-center text-brown-700">
            Event Registrations
          </h1>
          <EventRegistrations
            club={name}
            handleOpen={handleOpen}
            handleDialogData={handleDialogData}
          />
        </div>
      )}
      {filteRegisters.filter((item) => item.isWinner || item.isRunner).length >
        0 && (
        <div className="my-20 lg:mx-32 mx-10 ">
          <h1 className="text-center text-3xl font-bold mb-16 text-brown-700">
            Winners and Runners
          </h1>
          <Slider {...settings}>
            {filteRegisters
              .filter((item) => item.isWinner || item.isRunner)
              .map((item) => (
                <div key={item._id} className=" ">
                  <div
                    className={`bg-orange-200 rounded-lg py-20 shadow-lg flex bg-cover bg-center `}
                    style={{ backgroundImage: `url(${congrats})` }}
                  >
                    <div className="flex md:flex-row mx-auto w-fit flex-col items-center lg:gap-10 gap-6">
                      <img
                        src={item.userimage}
                        alt="winorrun"
                        className="w-60 h-60 object-cover rounded-full"
                      />
                      <div className="flex flex-col items-center gap-2">
                        <h1 className="text-3xl font-semibold pb-3">
                          {item.isWinner ? (
                            <span className="flex gap-2">
                              Winner{" "}
                              <img
                                src={gold}
                                alt="gold"
                                className="w-10 h-10 object-cover"
                              />
                            </span>
                          ) : (
                            <span className="flex gap-2">
                              Runner{" "}
                              <img
                                src={silver}
                                alt="silver"
                                className="w-10 h-10 object-cover"
                              />
                            </span>
                          )}
                        </h1>
                        <h1 className="text-xl font-semibold mt-5">
                          {item.name}
                        </h1>
                        <p className="text-gray-600">{item.roll}</p>
                        <p className="text-gray-600">Year {item.year}</p>
                        <p className="text-gray-600">Branch {item.branch}</p>
                        <p className="text-gray-600">Section {item.section}</p>
                        <div className="mt-4">
                          <button
                            onClick={() => handleDialogData(item.roll)}
                            className="px-4 py-2 bg-brown-900 text-white rounded-lg"
                          >
                            View Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
          <style>{`
                /* Left Arrow */
                .slick-prev:before {
                  color: #9C1137;
                }

                /* Right Arrow */
                .slick-next:before {
                  color: #9C1137;
                }
              `}</style>
        </div>
      )}
      {clubregisters.filter(
        (item) => item.category === "Coordinator" && item.club === name
      ).length > 0 && (
        <Team
          data={clubregisters.filter(
            (item) => item.category === "Coordinator" && item.club === name
          )}
        />
      )}
      <Tutorials value={name} />
      <Footer />
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>{dailogData.name}</DialogHeader>
        <DialogBody divider>{dailogData["desc"]}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <Dialog
        size="xs"
        open={dialog}
        handler={handleDialog}
        className="bg-transparent shadow-none"
      >
        <ProfileDialog rollno={profileroll} handle={handleDialog} />
      </Dialog>
    </div>
  );
}

export default ClubScreen;
