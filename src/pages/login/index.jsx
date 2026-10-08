import UserLayout from "@/layout/UserLayout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import { useRouter } from "next/router"
import { loginUser, registerUser } from "@/config/redux/action/authAction";
import { emptyMessage } from "@/config/redux/reducer/authReducer";

function loginComponent(){

const authState =useSelector((state)=>state.auth);

const router = useRouter();
const dispath = useDispatch()

const[email,setEmailAddress] = useState("");
const[password,setPassword]= useState("");
const[username,setUsername]= useState("");
const[name,setName] = useState("");



const [isLoginMethod,setIsLoginMethod] = useState(false)


const handleRegister =()=>{
    console.log("Register...")
    dispath(registerUser({username,password,email,name}))
}


const handleLogin =()=>{
    dispath(loginUser({email,password}))
}




useEffect(()=>{
    if(localStorage.getItem("token")){
        router.push("/dashboard")
    }
},[])


useEffect(()=>{
    if(authState.loggedIn){
        router.push("/dashboard")
    }
},[authState.loggedIn])

      

useEffect(()=>{
    dispath(emptyMessage())
},[isLoginMethod])




    return(
       <UserLayout>
        <div className={styles.container}>
            <div className={styles.cardContainer}>

                <div className={styles.cardContainer_left}>
                    <p className={styles.cardLeft_heading}>{isLoginMethod ? "Sign In" : "Sign Up"}</p>

              <p style={{color:authState.isError ? "red" :"green"}}> {authState.message}</p>

           <div className={styles.inputContainer}>


            {!isLoginMethod && <div className={styles.inputRow}>

         <input onChange={(e)=>setUsername(e.target.value)} className={styles.inputField} type="text" placeholder="Username" />
         <input  onChange={(e)=>setName(e.target.value)} className={styles.inputField}  type="text" placeholder="Name" />
         </div>}

         <input onChange={(e)=>setEmailAddress(e.target.value)} className={styles.inputField}  type="text" placeholder="Email" />
                 
         <input onChange={(e)=>setPassword(e.target.value)}  className={styles.inputField}  type="password" placeholder="Password" />


       <div  onClick={()=>{
          if(isLoginMethod){
            handleLogin();
            
          }else{
            handleRegister();
          }

       }}   
          className={styles.buttonWithOutline}>
                        <p>{isLoginMethod ? "Sign In" : "Sign Up"} </p>
                    </div>


           </div>
                  

           </div>
                <div className={styles.cardContainer_right}>
                   
                    {isLoginMethod ? <p>Don't Have An Account</p> : <p>Already Have An Account</p>}
                
                
                      <div  onClick={()=>{
             setIsLoginMethod(!isLoginMethod)
       }}   
         style={{color:"black"}} className={styles.buttonWithOutlineLeft}>
                        <p>{isLoginMethod ? "Sign Up" : "Sign In"} </p>
                    </div>
        </div>
                </div>
            </div>
        
       
       </UserLayout>
    )
}

export default loginComponent