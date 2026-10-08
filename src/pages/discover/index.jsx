import React, { useEffect } from 'react'
import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser } from '@/config/redux/action/authAction'
import { BASE_URL } from '@/config'
import styles from "./index.module.css"
import { useRouter } from 'next/router'

export default function Discover() {

           const authState = useSelector((state)=>state.auth)

          const  dispatch = useDispatch();

           useEffect(()=>{
            if(!authState.all_profiles_fetched){
              dispatch(getAllUser())
            }
           },[])


           const router = useRouter();






  return (
    <UserLayout>
     <DashboardLayout>
              <div>
              <h2>Discover</h2>
     

              <div className={styles.allUserProfile}>
               
                {authState.all_profiles_fetched && authState.all_users.filter((user) => 
    user.userId.username !== authState.user?.userId?.username
  ).map((user) =>{
                  return(
                    <div onClick={()=>{
                  router.push(`/view_profile/${user.userId.username}`)
                    }} key={user._id}   className={styles.userCard}>
                      <img className= {styles.userCard_image}    src={`${BASE_URL}/${user.userId.profilePicture}`} alt="profile" />
                     <div>
                       <h4>{user.userId.name}</h4>
                      <p style={{fontSize:"0.8rem"}}>{user.userId.username}</p>
                      </div>
                    </div>
                  )
                })}

              </div>
              </div>
              </DashboardLayout>
              </UserLayout>
  
  )
}
