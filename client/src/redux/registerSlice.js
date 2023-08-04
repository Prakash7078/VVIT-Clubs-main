import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config/url";
import { toast } from "react-hot-toast";
export const addRegister = createAsyncThunk(
    "api/addRegister",
    async (payload, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${BASE_URL}/api/events/register`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        return response.data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );
export const deleteRegister=createAsyncThunk("api/deleteRegister",async(rollno)=>{
  try{
      await axios.delete(`${BASE_URL}/api/events/registration/delete/${rollno}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    localStorage.removeItem("registerInfo");
  }catch(error){
    console.log(error);
  }
  
});
export const getRegister=createAsyncThunk("api/getRegisters",async()=>{
  try{
    const response=await axios.get(`${BASE_URL}/api/events/register/all`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  }catch(err){
    console.log(err);
  }
})
const registerInfo=localStorage.getItem("registerInfo");

  const registerSlice=createSlice({
    name:"registration",
    initialState:{
        registerInfo:registerInfo? JSON.parse(localStorage.getItem("registerInfo")) : null, 
        registers:[],
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(addRegister.pending, (state) => {
            state.loading = true;
          })
          .addCase(addRegister.fulfilled, (state, { payload }) => {
            state.loading = false;
            console.log("payload",payload);
            state.registerInfo = payload;
            localStorage.setItem("registerInfo", JSON.stringify(payload)); 
            toast.success("Register successfully");
          })
          .addCase(addRegister.rejected, (state) => {
            state.loading = false;
            toast.error("U already registered into another event");
          });
        builder
        .addCase(getRegister.pending, (state) => {
            state.loading = true;
          })
          .addCase(getRegister.fulfilled, (state, { payload }) => {
            state.loading = false;
            const {registers}=payload;
            state.registers = registers;
          })
          .addCase(getRegister.rejected, (state, { payload }) => {
            state.loading = false;
            toast.error(payload.message);
          });
          builder.addCase(deleteRegister.fulfilled, (state) => {
            state.registerInfo = null;
            toast.success("register delete successful!");
          });
    }
    });
    export default registerSlice.reducer;