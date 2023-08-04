import  { useState } from 'react'
import { toast } from 'react-hot-toast';
import Sidebar from '../../Components/Sidebar';
import { Button, Card, Input, Textarea, Typography } from '@material-tailwind/react';
import {RiImageEditLine} from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { addClub } from '../../redux/clubSlice';
function Club() {
    const[name,setName]=useState("");
    const[clubimg,setClubimg]=useState(null);
    const[description,setDescription]=useState("");
    const dispatch=useDispatch();
    const handleFileChange=(e)=>{
        setClubimg(e.target.files[0]);
        toast.success('file upload succesfully');
    }
    const handleClubSubmit=async(e)=>{
        e.preventDefault();
        await dispatch(addClub({name,clubimg,description}));
    }
  return (
    <div >
        <Sidebar/>
        <div className='pt-10 lg:pl-96 lg:flex items-center '>
            <Card shadow={true} className='lg:ml-20 lg:px-16 pb-10'>
                <form className='text-center mt-10 flex flex-col lg:gap-3  mx-20 gap-10' onSubmit={handleClubSubmit}>
                    <Typography variant="h4" color="blue-gray">
                        Add Club
                    </Typography>
                    <Input label='Club Name' type='text' value={name} onChange={(e)=>setName(e.target.value.toUpperCase())}/>
                    <label htmlFor="fileInput"  className="p-2 border border-gray-400 rounded-md cursor-pointer">
                        <RiImageEditLine size={20} />
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <Textarea label="Club Description" type='text' value={description} onChange={(e)=>setDescription(e.target.value)} />
                    <Button type='submit'>Submit</Button>
                </form>
            </Card>
        </div>
    </div>
  )
}

export default Club