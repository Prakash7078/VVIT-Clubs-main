import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../config/url';
import { useDispatch, useSelector } from 'react-redux';
import { getRegister } from '../redux/registerSlice';
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
function UserProfile() {
    const params=useParams();
    const {rollno}=params;
    const dispatch=useDispatch();
    const[profileuser,setProfileuser]=useState(null);
    const registers= useSelector((state) => state.register.registers);
    const[feedback,setFeedback]=useState(null);
    useEffect(()=>{
        const fetchData=async()=>{
            const res1=await axios.get(`${BASE_URL}/api/users/${rollno}`);
            const res3=await axios.get(`${BASE_URL}/api/msgs/${rollno}`);
            dispatch(getRegister());
            setProfileuser(res1);   
            setFeedback(res3);
            console.log(feedback)
        };
        fetchData();
    },[]);
    const data = [
        {
          label: "Profile",
          value: "profile",
          desc: `It really matters and then like it really doesn't matter.
          What matters is the people who are sparked by it. And the people
          who are like offended by it, it doesn't matter.`,
        },
        {
          label: "Registrations",
          value: "registers",
          desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
        },
        {
          label: "Feedback",
          value: "msgs",
          desc: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're
          constantly trying to express ourselves and actualize our dreams.`,
        },
      ];
    
    
  return (
    <div className='mx-auto sm:px-20 mt-28 px-4'>
        <Tabs value="dashboard">
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
                <TabPanel key={value} value={value} className='flex items-center justify-center mt-10'>
                    {value==="profile" && profileuser && profileuser.data.map((item,index)=>(
                        <div key={index}>
                            <img className='w-44 h-44 object-cover' src={item.image} alt='profile'/>
                            <h1>{item.username}</h1>
                            <h1>{item.category}</h1>
                            <h1>{item.email}</h1>
                            <h1>{item.username}</h1>
                            <h1>{item.branch}</h1>
                            <h1>{item.rollno}</h1>
                        </div>
                    ))}
                    {value==="registers" && registers && registers.filter((item)=>item.roll===rollno).map((item,index)=>(
                        <div key={index}>
                            <h1>Club</h1>
                            <h1>{item.club}</h1>
                            <h1>{item.event}</h1>
                            <h1>Year Of the student</h1>
                            <h1>{item.year}</h1>
                            <h1>Section of the student</h1>
                            <h1>{item.section}</h1>
                        </div>
                    ))}
                    {value==="msgs" && feedback && <div>
                        {feedback.data.map((item,index)=>(
                            <div key={index}>
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