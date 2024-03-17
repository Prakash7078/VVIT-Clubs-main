import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./Components/Navbar";
import ClubScreen from "./pages/ClubScreen";
import UserProfile from "./Components/UserProfile";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Welcome from "./pages/admin/Welcome";
import AllClubs from "./pages/admin/AllClubs";
import AllEvents from "./pages/admin/AllEvents";
import AllRegistrations from "./pages/admin/AllRegistrations";
import AddAdmin from "./pages/admin/AddAdmin";
import Club from "./pages/admin/Club";
import Event from "./pages/admin/Event";
import Reviews from "./pages/admin/Reviews";
import PasswordRequest from "./pages/PasswordRequest";
import ResetPassword from "./pages/ResetPassword";
import Chat from "./Components/Chat";
import Calender from "./Components/Calender";
import Allevents from "./Components/Allevents";
import EventGuestList from "./Components/EventGuestList";
import Gallery from "./Components/Gallery";
import EventDetails from "./Components/EventDetails";
import ClubDetails from "./Components/ClubDetails";
import AllClubDetails from "./Components/ClubDetails";
function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/admin?/clubs?/events?/:name" element={<ClubScreen />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/passwordrequest" element={<PasswordRequest />} />
          <Route
            path="/reset-password/:id/:token"
            element={<ResetPassword />}
          />
          <Route path="/myprofile" element={<UserProfile />} />
          <Route path="/dashboard/:id" element={<Welcome />} />

          <Route path="/admin/clubs" element={<AllClubs />} />
          <Route path="/admin/events" element={<AllEvents />} />
          <Route path="/admin/registers" element={<AllRegistrations />} />
          {/* <Route path="/admin/testimony" element={<AddTestimony/>}/>         */}
          {/* <Route path="/admin/registers/:rollno/profile" element={<UserProfile/>}/>         */}
          <Route path="/admin/addAdmin" element={<AddAdmin />} />
          <Route path="/admin/addClub" element={<Club />} />
          <Route path="/admin/updateClub/:clubname" element={<Club />} />
          <Route path="/admin/addEvent" element={<Event />} />
          <Route path="/admin/updateEvent/:eventname" element={<Event />} />
          <Route path="/admin/reviews" element={<Reviews />} />
          <Route path="/eventGuestList" element={<EventGuestList />} />
          <Route path="/clubdetails" element={<AllClubDetails />} />
          <Route path="/allEvents" element={<Allevents />} />
          <Route path="/allEvents/:id/details" element={<EventDetails />} />
          <Route path="/gallery" exact component={Gallery} />
        </Routes>
      </BrowserRouter>
      <div>
        {/* <Dialog
            size="xs"
            open={open}
            handler={()=>setOpen(!open)}
            className="bg-white shadow-none"
          > */}
        <ToastContainer
          position="bottom-center"
          bodyClassName="font-bold text-blue-900 text-center"
        />
        {/* </Dialog> */}
        {/* <Toaster position="top-right"></Toaster> */}
      </div>
    </div>
  );
}

export default App;
