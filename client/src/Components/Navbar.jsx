import { useEffect, useState } from 'react'
import small from '../Images/logo-small.jpg';
import {TiThMenu} from 'react-icons/ti'
import {Link as Route, useNavigate } from 'react-router-dom';
import {Link} from 'react-scroll';
// import { HashLink } from 'react-router-hash-link';
import {useDispatch, useSelector } from 'react-redux';
import {logoutUser} from '../redux/authSlice';
import { Badge, Avatar, Dialog, Button } from "@material-tailwind/react";
import { FiLogOut } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
// import { BsChatTextFill } from "react-icons/bs";
import Login from '../pages/Login';

function Navbar() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
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
  
  return (
    <div  className='shadow-md z-50 fixed top-0 left-0  grid grid-cols-3 py-5 sm:px-10 w-full bg-[#fff3e0]'>
        <div className='flex gap-3 items-center'>
            <div className='md:hidden position:relative ml-2 '>
                {!isMenuOpen ? <TiThMenu
                    className={`group ${isMenuOpen ? 'text-cyan-500' : 'text-gray-500'}`}
                    onClick={toggleMenu}
                />:<RxCross2 onClick={toggleMenu}/>}
                
                <ul
                    className={`${
                    isMenuOpen ? 'visible' : 'hidden'
                    } md:hidden group-hover:visible absolute left-0 top-16 font-semibold bg-[#fff3e0] w-full px-10 py-5 z-50 h-fit `}
                >
                    <li className='py-2'>{userInfo && userInfo.isAdmin && <button ><Route to='/dashboard'>DashBoard</Route></button>}</li>
                    <li className='py-2'><Link smooth={true} duration={1000} to='#home'>Home</Link></li>
                    <li className='py-2'><Link smooth={true} duration={1000} to='#about'>About</Link></li>
                    <li className='py-2'><Link smooth={true} duration={1000} to='#category'>Clubs</Link></li>
                    <li className='py-2'><Link smooth={true} duration={1000} to='#contact'>Contact</Link></li>
                    
                </ul>
                
            </div>
            <Route to="/"><img className='sm:w-15 sm:h-10 w-14 h-7  cursor-pointer'src={small} alt='logo'/></Route>
            
        </div>
        <div className='bg-brown-600 rounded-full w-fit'>
            <ul className='hidden md:flex gap-2  px-5 py-2 rounded-full items-center bg-slate-500 w-fit text-white'>
                <li className='cursor-pointer hover:font-bold mx-3 '><Link smooth={true} duration={1000} to='#home'>Home</Link></li>
                <li className='cursor-pointer hover:font-bold mx-3'><Link smooth={true} duration={1000}  to='#about'>About</Link></li>
                <li className='cursor-pointer hover:font-bold mx-3'><Link smooth={true} duration={1000} to='#category'>Clubs</Link></li>
                <li className='cursor-pointer hover:font-bold mx-3'><Link smooth={true} duration={1000} to='#contact'>Contact</Link></li>
                <li className='cursor-pointer hover:font-bold mx-3'>{userInfo && userInfo.isAdmin && <li><Route to='/dashboard'>Dashboard</Route></li>}</li>
            </ul>
        </div>
        <div className='flex gap-3 items-center justify-end'>
          {/* <button><BsChatTextFill size={20}/></button> */}
          {userInfo && userInfo.image!="" && <Route to='/profile'><Badge overlap="circular" placement="bottom-end" className='bg-green-600'>
            <Avatar
              size="sm"
              src={userInfo.image}
              alt="profile picture"
            />
          </Badge></Route>}
          {!userInfo ? (<Button className='bg-brown-400' onClick={handleOpen}>Sign In</Button>):
          (<button className=' inline-flex items-center rounded-full space-x-2 p-2 bg-primary text-secondary ' onClick={handleSignout}><FiLogOut/></button>)}
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