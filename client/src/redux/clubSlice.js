import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config/url";
import { toast } from "react-hot-toast";
export const getClubs=createAsyncThunk("api/getClubs",async()=>{
   try{
        const res=await axios.get((`${BASE_URL}/api/clubs/`));
        return res.data;
   }catch(err){
        console.log(err);
   }
})
export const updateClub=createAsyncThunk("api/updateClub",async({id,name,image,desc})=>{
    try{
        console.log(image);
        const result=await axios.patch(`${BASE_URL}/api/admin/updateClub`,{
            id,
            name,
            image,
            desc,
        },{
            headers:{
                "Content-Type":"multipart/form-data",
                Authorization:`Bearer ${localStorage.getItem("token")}`,
            },
        });
        toast.success(result.data.message);
    }catch(err){
        console.log(err);
    }
})
export const addClub=createAsyncThunk("api/addClub",async({name,image,desc})=>{
    try{
        const result=await axios.post(`${BASE_URL}/api/admin/addClub`,{
            name,
            image,
            desc,
        },{
            headers:{
              "Content-Type":"multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return result.data;
    }catch(err){
        console.log(err);
    }
})
const clubSlice=createSlice({
    name:"clubs",
    initialState:{
        clubs:[],
        load:false,
        error:null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(getClubs.pending, (state) => {
            state.load = true;
          })
        .addCase(getClubs.fulfilled, (state, { payload }) => {
            state.load = false;
            state.clubs = payload;
        })
        .addCase(getClubs.rejected, (state) => {
            state.load = false;
            toast.error("Network error!");
        });
        builder
        .addCase(addClub.pending, (state) => {
            state.load = true;
          })
        .addCase(addClub.fulfilled, (state,{payload}) => {
            state.loading=false;
            toast.success(payload.message);
        })
        .addCase(addClub.rejected, (state) => {
            state.load = false;
            toast.error("Network error!");
        });
    }
})
export default clubSlice.reducer;