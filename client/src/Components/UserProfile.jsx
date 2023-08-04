import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../config/url';
import { useDispatch, useSelector } from 'react-redux';
import { getRegister } from '../redux/registerSlice';

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
    
    
  return (
    <div className='flex '>
        {profileuser && profileuser.data.map((item,index)=>(
            <div key={index}>
                <h1>User Information</h1>
                <img className='w-44 h-44 object-cover' src={item.image} alt='profile'/>
                <h1>{item.username}</h1>
                <h1>{item.category}</h1>
                <h1>{item.email}</h1>
                <h1>{item.username}</h1>
                <h1>{item.branch}</h1>
                <h1>{item.rollno}</h1>
            </div>
        ))}
        {registers && registers.filter((item)=>item.roll===rollno).map((item,index)=>(
            <div key={index}>
                <h1>User Registration</h1>
                <h1>Club</h1>
                <h1>{item.club}</h1>
                <h1>Year Of the student</h1>
                <h1>{item.year}</h1>
                <h1>Section of the student</h1>
                <h1>{item.section}</h1>
            </div>
        ))}
        {feedback && <div>
            {feedback.data.map((item,index)=>(
                <div key={index}>
                    <h1>User Feedback</h1>
                    <h1>{item.email}</h1>
                    <h1>{item.text}</h1>
                </div>
            ))}    
        </div>}
    </div>
  )
}

export default UserProfile