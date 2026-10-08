import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";





export const loginUser = createAsyncThunk("user/login",async(user,thunkApi)=>{

    try{

    const response = await clientServer.post("/login",{
        email:user.email,
        password:user.password
    })

    if(response.data.token){
       localStorage.setItem("token",response.data.token)
    }else{
        return thunkApi.rejectWithValue({
            message:"token not provied"
        })
    }

            return thunkApi.fulfillWithValue(response.data.token)
            
}catch(err){
    return thunkApi.rejectWithValue(err.response?.data)
}
})


export const registerUser = createAsyncThunk("user/register",async(user,thunkApi)=>{


    try{
        const response= await clientServer.post("/register",{
            username:user.username,
            password:user.password,
            email:user.email,
            name:user.name,
        })

        if(response.data.token){
            localStorage.setItem("token",response.data.token)
            return thunkApi.fulfillWithValue(response.data.token)
        }else{
            return thunkApi.rejectWithValue({message:"token is not provied"})
        }


    }catch(err){
        return thunkApi.rejectWithValue(err.response?.data)
    }
})

   

export const getAboutUser = createAsyncThunk("user/getAboutUser",async(user,thunkAPI) => {

    try{

        const response = await clientServer.get("/get_user_and_profile",{
            params:{
                token:user.token
            }
        })


        return thunkAPI.fulfillWithValue(response.data)

    }catch(err){
        return thunkAPI.rejectWithValue(err.response.data)
    }

})


export const getAllUser = createAsyncThunk("user/getAllUser",async(_,thunkAPI)=>{
    try{

        const response = await clientServer.get("/get_all_user_profile")

        return thunkAPI.fulfillWithValue(response.data)

    }catch(err){
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

export const sendConnectionRequest = createAsyncThunk("user/sendConnectionRequest",
    async(user,thunkAPI) => {

        try{
                   
            const response = await clientServer.post("/user/sent_connection_request",{
                token: user.token,
                connectionId:user.user_id
            })

            thunkAPI.dispatch(getConnectionRequest({token:user.token}))

            return thunkAPI.fulfillWithValue(response.data)

        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message)
        }


    }
)

export const getConnectionRequest = createAsyncThunk("user/getConnectionRequest",
    async(user,thunkAPI) => { 
        try{
            const response = await clientServer.get("/user/getConnectionRequest",{
                params: {
                    token: user.token 
                }
         } )
         return thunkAPI.fulfillWithValue(response.data.connections);

        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const getMyConnectionsRequests = createAsyncThunk("user/getMyConnectionsRequests",
    async(user,thunkAPI) =>{
        try{
            const response = await clientServer.get("/user/getConnectionRequest",{
                params:{
                    token: user.token
                }
            });

            return thunkAPI.fulfillWithValue(response.data);

        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const acceptConnectionRequest = createAsyncThunk("user/acceptConnectionRequest",
    async(user,thunkAPI) =>{
        try{

            const response = await clientServer.post("/user/accpet_connection_request",{
                token:user.token,
                requestId: user.requestId,
                action_type:user.action
            });
            return thunkAPI.fulfillWithValue(response.data)

        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
) 


   

