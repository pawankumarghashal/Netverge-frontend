import { createSlice } from "@reduxjs/toolkit";
import { getAboutUser, getAllUser, getConnectionRequest, getMyConnectionsRequests, loginUser,registerUser } from "../../action/authAction";
import { combineReducers } from "@reduxjs/toolkit";

const initialState = {
    user:undefined,
    isSuccess:false,
    isError:false,
    isLoading:false,
    loggedIn:false,
    message:"",
    isTokenThere:false,
    profileFetched:false,
    connections:[],
    connectionRequest:[],
    all_profiles_fetched:false,
   
  
      all_users: [] 
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        reset:()=>initialState,
        handleLogingUser:(state)=>{
          state.message="hello"
        },
        emptyMessage:(state)=>{
            state.message = "";
        },
        setTokenIsThere:(state) =>{
            state.isTokenThere = true
        },
        setTokenIsNotThere:(state)=>{
            state.isTokenThere=false
        }
    },
      

    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending, (state)=>{
            state.isLoading = true;
            state.message = "knocking the door";
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.loggedIn = true;
            state.isSuccess = true;
            state.isError= false;
            state.message = "login is success"


        })
        .addCase(loginUser.rejected , (state,action)=>{
             state.isLoading = false;
            state.isError= true;
            state.message = action.payload.message
        })
        .addCase (registerUser.pending,(state)=>{
            state.isLoading = true;
            state.message = "knocking the door"
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading = true;
            state.loggedIn = true;
            state.isError = false;
            state.isSuccess = true;
            state.message = "Registration is Successfull,Please login in"

        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload.message
        })
        .addCase(getAboutUser.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoading=false;
            state.profileFetched = true;
            state.user= action.payload
        })
        .addCase(getAllUser.fulfilled,(state,action)=>{
          
            state.isLoading=false;
            state.isError = false;
            state.all_profiles_fetched = true;
  state.all_users = action.payload?.profile ? [...action.payload.profile] : [];    
})

       .addCase(getConnectionRequest.fulfilled,(state,action) =>{
        state.connections = action.payload
       })
       .addCase(getConnectionRequest.rejected,(state,action) =>{
        state.message = action.payload
       })
       .addCase(getMyConnectionsRequests.fulfilled,(state,action)=>{
        state.connectionRequest = action.payload.connections
       })
       .addCase(getMyConnectionsRequests.rejected,(state,action)=>{
        state.message = action.payload
        state.connectionRequest = [];
       })
        
    }




})


export const {reset,emptyMessage,setTokenIsNotThere,setTokenIsThere} = authSlice.actions

export default authSlice.reducer;