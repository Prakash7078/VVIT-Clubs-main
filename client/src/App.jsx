import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './Components/Navbar';
import ClubScreen from './pages/ClubScreen';
import Profile from './pages/Profile';
import UserProfile from './Components/UserProfile';
import { Toaster } from 'react-hot-toast';
import Welcome from './pages/admin/Welcome';
import AllClubs from './pages/admin/AllClubs';
import AllEvents from './pages/admin/AllEvents';
import AllRegistrations from './pages/admin/AllRegistrations';
import AddAdmin from './pages/admin/AddAdmin';
import Club from './pages/admin/Club';
import Event from './pages/admin/Event';
import Reviews from './pages/admin/Reviews';
import AddTestimony from './pages/admin/AddTestimony';
import PasswordRequest from './pages/PasswordRequest';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <div className="">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin?/clubs?/events?/:name" element={<ClubScreen/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/passwordrequest" element={<PasswordRequest/>}/>
        <Route path="/reset-password/:id/:token" element={<ResetPassword/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/admin?/registers?/:name?/:rollno/profile" element={<UserProfile/>} />
        <Route path="/dashboard" element={<Welcome/>}/>        
        <Route path="/admin/clubs" element={<AllClubs/>}/>        
        <Route path="/admin/events" element={<AllEvents/>}/>        
        <Route path="/admin/registers" element={<AllRegistrations/>}/>        
        {/* <Route path="/admin/testimony" element={<AddTestimony/>}/>         */}
        {/* <Route path="/admin/registers/:rollno/profile" element={<UserProfile/>}/>         */}
        <Route path="/admin/addAdmin" element={<AddAdmin/>}/>        
        <Route path="/admin/addClub" element={<Club/>}/>        
        <Route path="/admin/updateClub/:clubname" element={<Club/>}/>        
        <Route path="/admin/addEvent" element={<Event/>}/>   
        <Route path="/admin/updateEvent/:eventname" element={<Event/>}/>   
        <Route path="/admin/reviews" element={<Reviews/>}/>   
             

      </Routes>
      </BrowserRouter>
      <div>
        <Toaster position="top-right"></Toaster>
      </div>    
    </div>
  );
}

export default App;
