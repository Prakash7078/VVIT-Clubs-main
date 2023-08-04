import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config/url";
import { toast } from "react-hot-toast";

export const getEvents=createAsyncThunk("api/getEvents",async()=>{
    try{
        const result=await axios.get(`${BASE_URL}/api/events/all`);
        return result.data;
    }catch(err){
        console.log(err);
    }    
})
export const addEvent=createAsyncThunk("api/addEvent",async({clubName,name,clubimg,description})=>{
    try{
        const result=await axios.post(`${BASE_URL}/api/admin/addEvent`,{
            clubName,
            name,
            clubimg,
            description,
        },{
            headers:{
              "Content-Type":"multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return result.data;
    }catch(err){
        toast.error("Description max length 200 characters");
    }
})
const eventSlice=createSlice({
    name:"events",
    initialState:{
        events:[],
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getEvents.pending,(state)=>{
            state.loading=true;
        }).addCase(getEvents.fulfilled,(state,{payload})=>{
            state.loading=false;
            state.events=payload.events;
        }).addCase(getEvents.rejected,(state)=>{
            state.loading=false;
            toast.error("Unable to get events");
        })
        builder
        .addCase(addEvent.pending,(state)=>{
            state.loading=true;
        }).addCase(addEvent.fulfilled,(state,{payload})=>{
            state.loading=false;
            toast.success(payload.message);
        }).addCase(addEvent.rejected,(state)=>{
            state.loading=false;
            toast.error("Event not uploaded");
        })
    }
})
export default eventSlice.reducer;