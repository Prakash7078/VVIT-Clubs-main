import { useState } from 'react'
import {toast} from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../../config/url';
import Sidebar from '../../Components/Sidebar';
import { Button, Card, Input, Textarea, Typography } from '@material-tailwind/react';
import { RiImageEditLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { addEvent } from '../../redux/eventSlice';

function Event() {
    const[name,setName]=useState("");
    const[clubName,setClubName]=useState("");
    const[clubimg,setClubimg]=useState(null);
    const dispatch=useDispatch();
    const[description,setDescription]=useState("");
    const handleFileChange=(e)=>{
        setClubimg(e.target.files[0]);
        toast.success('file upload succesfully');
    }
    const handleEventSubmit=async(e)=>{
        e.preventDefault();
        await dispatch(addEvent({clubName,name,clubimg,description}));
    }
  return (
    <div >
        <Sidebar/>
        <div className='pt-6 lg:pl-96 lg:flex items-center '>
            <Card shadow={true} className='lg:ml-20 lg:px-16 pb-10'>
                <form className='text-center mt-10 flex flex-col gap-3 mx-auto  lg:mx-0 px-10 ' onSubmit={handleEventSubmit}>
                    <Typography variant="h4" color="blue-gray">
                            Add Event
                    </Typography>
                        <select id="mySelect" name="mySelect"  onChange={(e)=>setClubName(e.target.value)} value={clubName} className='border-2 px-12 py-3'>
                            <option value="" disabled>
                            Select Club
                            </option>
                            <option value="MUSIC">Music</option>
                            <option value="DANCE">Dance</option>
                            <option value="THEATER">Theater</option>
                            <option value="TECHNICAL">Technical</option>
                            <option value="CULINARY">Culinary</option>
                        </select>
                    <Input label='Event Name' type='text' value={name} onChange={(e)=>setName(e.target.value)}/>
                    <label htmlFor="fileInput1"  className="p-2 border border-gray-400 rounded-md cursor-pointer">
                        <RiImageEditLine size={20} />
                    </label>
                    <input
                        id="fileInput1"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <Textarea label="Club Description" type='text' maxLength={200} value={description} onChange={(e)=>setDescription(e.target.value)} />
                    <Button  type='submit'>Submit</Button>
                </form>
            </Card>
        </div>
    </div>
  )
}

export default Event