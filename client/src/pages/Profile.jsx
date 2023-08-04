import {useSelector } from "react-redux";

function Profile() {
  const userInfo = useSelector((state) => state.auth.userInfo);
   
  return (
    <div>
        <a href={userInfo.image} target='_self'>
            <img  className='w-40 h-40 object-cover rounded-xl'src={userInfo.image} alt='user'/>
        </a>
        <p>{userInfo.category}</p>
        <p>{userInfo.username}</p>
        <p>{userInfo.email}</p>
        <p>{userInfo.branch}</p>
        <p>{userInfo.rollno}</p>
    </div>
  )
}

export default Profile