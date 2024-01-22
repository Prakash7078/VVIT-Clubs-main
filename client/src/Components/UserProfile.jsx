import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../config/url';
import { useDispatch, useSelector } from 'react-redux';
import { getRegisters } from '../redux/registerSlice';
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import Profile from '../pages/Profile';

function UserProfile() {
    const dispatch=useDispatch();
    const userInfo = useSelector((state) => state.auth.userInfo);
    const[profileuser,setProfileuser]=useState(null);
    const registers= useSelector((state) => state.register.registers);
    const[feedback,setFeedback]=useState(null);
    useEffect(()=>{
        const fetchData=async()=>{
            const res1=await axios.get(`${BASE_URL}/api/users/${userInfo.rollno}`);
            const res3=await axios.get(`${BASE_URL}/api/msgs/${userInfo.rollno}`);
            dispatch(getRegisters());
            setProfileuser(res1);   
            setFeedback(res3);
            console.log(registers);
        };
        fetchData();
    },[]);
    const data = [
        {
          label: "My Profile",
          value: "profile"
        },
        {
          label: "Registrations",
          value: "registers",
        },
        {
          label: "Feedback",
          value: "msgs",
          
        },
      ];
    
    
  return (
    <div className='mx-auto max-h-full  sm:px-32 pt-28  px-4 bg-[#fff3e0]'>

        <h1 className='font-bold text-2xl mb-10'>My Profile</h1>

        <Tabs value="profile">
            <TabsHeader>
                {data.map(({ label, value }) => (
                <Tab key={value} value={value}>
                    <div className="flex items-center gap-2">
                    {label}
                    </div>
                </Tab>
                ))}
            </TabsHeader>
            <TabsBody  animate={{
                initial: { y: 250 },
                mount: { y: 0 },
                unmount: { y: 250 },
                }}>
                {data.map(({ value}) => (
                <TabPanel key={value} value={value} className='flex bg-white shadow-inner rounded-md my-10 items-center justify-center'>
                    {value==="profile" && profileuser && <Profile/>}
                    {value==="registers" && registers && 
                        <div className='bg-white w-full p-16'>
                            <h1 className='font-bold text-2xl'>Events Attended</h1>
                            {registers.filter((item)=>item.roll===userInfo.rollno).map((item,index)=>(
                                <div key={index} className='p-4 m-5 flex gap-20 border-b-2 border-gray-300 items-center'>
                                    <div className=''>
                                        <img src={item.userimage} className='w-24 object-cover h-24' alt='item.club'/>
                                    </div>
                                    <div className=''>
                                        <h1><span className='font-bold'>ClubName</span> {item.club}</h1>
                                        <h1><span className='font-bold'>EventName</span> {item.event}</h1>
                                        {/* <h1><span className='font-bold'>Year</span> {item.year}</h1>
                                        <h1><span className='font-bold'>Section</span> {item.section}</h1> */}
                                    </div>
                                </div>))}
                        </div>
                        
                    }
                    {value==="msgs" && feedback && <div className='flex flex-wrap w-full p-16 gap-10'>
                        {feedback.data.map((item,index)=>(
                            <div key={index} className='flex flex-col gap-2 shadow-xl p-6'>
                                <h1 className='font-bold'>{item.name}</h1>
                                <h1>{item.email}</h1>
                                <h1>{item.text}</h1>
                            </div>
                        ))}    
                    </div>}
                </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    </div>
  )
}

export default UserProfile