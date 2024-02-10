import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../config/url';

function ProfileDialog({rollno,handle}) {
  const[userInfo,setUserInfo]=useState(null);
  const[isLoad,setIsLoad]=useState(true);
  useEffect(()=>{
    const fetchData=async()=>{
        await fetch(`${BASE_URL}/api/users/${rollno}`,{
          method:'GET'
        }).then((res)=>res.json()).then((data)=>setUserInfo(data)).finally(setIsLoad(false));
        setUserInfo(user.data);
        console.log("user",user.data);
    }
    fetchData();
  },[])
  return (
    <div className='bg-white p-10 w-fit mx-auto flex flex-col items-center'>
      {isLoad?<h1 className='text-center font-bold text-xl my-auto'>LOADING...</h1>:
      <div className='d-flex w-fit text-center flex-col  items-center'>
        <img src={userInfo?.image} className='w-36 mb-4 h-36 mx-auto rounded-full' alt='user'/>
        <h1>{userInfo?.username}</h1>
        <h1>{userInfo?.email}</h1>
        <h1>{userInfo?.rollno}</h1>
        <h1>{userInfo?.section}</h1>
        <h1>{userInfo?.branch}</h1>

      </div>}
        <button className='flex my-2 justify-end bg-green-300 px-6 py-1 rounded-lg' onClick={handle}>Close</button>
    </div>
  )
}

export default ProfileDialog