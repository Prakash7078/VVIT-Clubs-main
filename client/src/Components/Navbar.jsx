import { useEffect, useState } from 'react'
import small from '../Images/logo-small.jpg';
import {TiThMenu} from 'react-icons/ti'
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import {useDispatch, useSelector } from 'react-redux';
import {logoutUser} from '../redux/authSlice';
import AudioComponent from './AudioComponent';
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
    <div className='shadow-md z-50 fixed top-0 left-0  grid grid-cols-3 md:py-5 py-2 sm:px-10 w-full '>
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
                    <li className='py-2'>{userInfo && userInfo.isAdmin && <button ><Link to='/dashboard'>DashBoard</Link></button>}</li>
                    <li className='py-2'><HashLink to='/#home'>Home</HashLink></li>
                    <li className='py-2'><HashLink to='/#about'>About</HashLink></li>
                    <li className='py-2'><HashLink to='/#category'>Clubs</HashLink></li>
                    <li className='py-2'><HashLink to='/#contact'>Contact</HashLink></li>
                    
                </ul>
                
            </div>
            <img className='sm:w-15 sm:h-10 w-14 h-7  cursor-pointer'src={small} alt='logo'/>
            
        </div>
        <div className='bg-black bg-opacity-50 rounded-full w-fit'>
            <ul className='hidden md:flex gap-2  px-5 py-2 rounded-full items-center bg-slate-500 w-fit text-white'>
                <li className='cursor-pointer hover:font-bold mx-3 '><HashLink to='/#home'>Home</HashLink></li>
                <li className='cursor-pointer hover:font-bold mx-3'><HashLink to='/#about'>About</HashLink></li>
                <li className='cursor-pointer hover:font-bold mx-3'><HashLink to='/#category'>Clubs</HashLink></li>
                <li className='cursor-pointer hover:font-bold mx-3'><HashLink to='/#contact'>Contact</HashLink></li>
                <li className='cursor-pointer hover:font-bold mx-3'>{userInfo && userInfo.isAdmin && <li><Link to='/dashboard'>Dashboard</Link></li>}</li>
            </ul>
        </div>
        <div className='flex gap-3 items-center justify-end'>
          {/* <button><BsChatTextFill size={20}/></button> */}
          {userInfo && userInfo.image!="" && <Link to='/profile'><Badge overlap="circular" placement="bottom-end" className='bg-green-600'>
            <Avatar
              size="sm"
              src={userInfo.image}
              alt="profile picture"
            />
          </Badge></Link>}
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