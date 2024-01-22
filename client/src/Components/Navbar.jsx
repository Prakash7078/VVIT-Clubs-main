import { useEffect, useState } from 'react'
import small from '../Images/logo-small.jpg';
import {TiThMenu} from 'react-icons/ti'
import {FcAbout,FcHome, FcSearch} from 'react-icons/fc'
import {Link as Route, useNavigate } from 'react-router-dom';
import {Link} from 'react-scroll';

// import { HashLink } from 'react-router-hash-link';
import {useDispatch, useSelector } from 'react-redux';
import {logoutUser} from '../redux/authSlice';
import { Badge, Avatar, Dialog, Button, IconButton, Input } from "@material-tailwind/react";
import { FiLogOut } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
// import { BsChatTextFill } from "react-icons/bs";
import Login from '../pages/Login';
import clu from '../Images/dj.png'
import tele from '../Images/telephone.png'
import dash from '../Images/dashboard.png'
function Navbar() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {setOpen((cur) => !cur);toggleMenu()};
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const[search,setSearch]=useState("");
    const userInfo = useSelector((state) => state.auth.userInfo);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleSignout=async()=>{
        await dispatch(logoutUser());
        navigate('/');
    }
    // bg-[#fff3e0]
    const handleSearch=()=>{
      if(userInfo){
        navigate(`/${search}`);
      }else{
        navigate("/login")
      }
      setSearch("");
    }
  return (
      <div className='shadow-md z-50 fixed top-0 left-0 flex items-center justify-between py-4 sm:px-8 w-full px-4 backdrop-blur-md'>
        <div className='flex gap-20'>
          <Route to="/"><img className='sm:w-15 border-2 rounded-sm sm:h-10 w-14 h-10 xl:h-14 xl:w-20 col-span-2 cursor-pointer'src={small} alt='logo' /></Route>
        
          <div className='hidden  md:flex items-center gap-2 border-b-2 border-blue-600'>
                  <input className='bg-transparent font-bold outline-none text-white px-2' placeholder='Search Club' value={search} onChange={(e)=>setSearch(e.target.value.toUpperCase())}/>
                  <FcSearch className='cursor-pointer' color='white' size={25} onClick={handleSearch}/>
          </div>
        </div>
      
        <div className='md:hidden'>
                {!isMenuOpen ? <TiThMenu size={25} color='brown'
                    className={`${isMenuOpen ? 'text-cyan-500' : 'text-gray-500'}`}
                    onClick={toggleMenu}
                />:<RxCross2 color='brown' size={25} onClick={toggleMenu}/>}
                <div className='bg-green-400 fixed left-0 px-4  w-full top-16 z-50 '>
                  <ul
                      className={`${
                      isMenuOpen ? 'visible' : 'hidden'
                      } font-semibold  flex flex-col gap-5 py-5`}
                  >
                      {userInfo && userInfo.isAdmin && <li onClick={toggleMenu}><Route to='/dashboard'><IconButton variant="outlined" color='white' className="rounded-full mr-3"><img src={dash} alt='dash'/></IconButton>Dashboard</Route></li>}
                      {userInfo && <li onClick={toggleMenu} className='cursor-pointer'><IconButton variant="outlined" color='white' className="rounded-full mr-3"><img src={clu} alt='clu'/></IconButton>My Events</li>}
                      <li  className='cursor-pointer'><Link onClick={toggleMenu} smooth={true} duration={1000} to='#about'><IconButton variant="outlined" color='white' className="rounded-full mr-3"><FcAbout size={25}/></IconButton>About</Link></li>
                      <li  className='cursor-pointer'><Link onClick={toggleMenu} smooth={true} duration={1000} to='#category'><IconButton variant="outlined" color='white' className="rounded-full mr-3"><img src={clu} alt='clu'/></IconButton>Categories</Link></li><hr/>
                      {userInfo && <div onClick={toggleMenu} className='flex items-center gap-4'><Route to='/myprofile'><Badge overlap="circular" placement="bottom-end" className='bg-green-600'>
                            <Avatar
                              size="sm"
                              src={userInfo.image}
                              alt="profile picture"
                            />
                          </Badge></Route><h1>My Profile</h1></div>}
                      {!userInfo ? (<Button className='bg-brown-400 mx-3' onClick={handleOpen}>Log In</Button>):
                      (<div className="bg-brown-400 text-black rounded-md flex justify-between items-center px-3 py-2" onClick={handleSignout}><span>Logout</span><FiLogOut color='black'/></div>)}
                  </ul>
                </div>
                
          </div>
          <div className='hidden md:flex gap-4 items-center'>
            {userInfo && userInfo.image!="" && <Route to='/myprofile'><Badge overlap="circular" placement="bottom-end" className='bg-green-600'>
                              <Avatar
                                size="sm"
                                src={userInfo.image}
                                alt="profile picture"
                              />
                            </Badge></Route>}
            {!userInfo ? (<Button className='bg-brown-400' onClick={handleOpen}>Log In</Button>):
            (<button className=' inline-flex items-center rounded-full space-x-2 p-3 bg-primary text-secondary ' onClick={handleSignout}><FiLogOut/></button>)}
          </div>
        
        <Dialog
          size="xs"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none"
        >
          <Login value={handleOpen}/>
        </Dialog>

    </div>
  )
}

export default Navbar

