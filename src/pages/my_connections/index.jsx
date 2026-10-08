
import React, { useEffect } from 'react'
import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import { useDispatch, useSelector } from 'react-redux'
import {
  getMyConnectionsRequests,
  acceptConnectionRequest
} from '@/config/redux/action/authAction';


import { BASE_URL } from '@/config';
import styles from "./index.module.css";
import { useRouter } from 'next/router';

export default function MyConnections() {

  const router = useRouter();

  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);

  useEffect(() => {

    dispatch(
      getMyConnectionsRequests({
        token: localStorage.getItem("token")
      })
    );

  }, []);

  useEffect(() => {

    if (authState.connectionRequest.length !== 0) {
      console.log(authState.connectionRequest);
    }

  }, [authState.connectionRequest]);


  return (
    <UserLayout>

      <DashboardLayout>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.7rem"
          }}
        >

          <h4>My Connections</h4>


          {authState.connectionRequest.length === 0 && (
            <h1>No Connetion Request Pendding</h1>
          )}


          {authState.connectionRequest
            .filter(
              (connection) =>
                connection.status_accepted === false
              
            )
           

            .map((user, index) => {

              return (

                <div
                  onClick={() => {
                    router.push(
                      `/view_profile/${user.connectionId.username}`
                    )
                  }}
                  className={styles.userCard}
                  key={index}
                >

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.2rem"
                    }}
                  >

                    <div className={styles.profilePicture}>

                      <img
                        src={`${BASE_URL}/${user.connectionId.profilePicture}`}
                        alt=""
                      />

                    </div>


                    <div className={styles.useroInfo}>

                      <h3>
                        {user.connectionId.name}
                      </h3>

                      <p>
                        {user.connectionId.username}
                      </p>

                    </div>


                    <button
                      onClick={async (e) => {

                        e.stopPropagation();

                       await dispatch(
                          acceptConnectionRequest({
                            requestId: user._id,
                            token: localStorage.getItem("token"),
                            action: "accept"
                          })
                        );
                          await dispatch(
    getMyConnectionsRequests({
      token: localStorage.getItem("token")
    })
  );

                      }}
                      className={styles.connectedButton}
                    >
                      Accept
                    </button>

                  </div>

                </div>

              )

            })}


          <h4>My Network</h4>


          {authState.connectionRequest
            .filter(
              (connection) =>
                connection.status_accepted !== false
            )
          

            .map((user, index) => {

              return (
              

                <div
                  onClick={() => {
                    router.push(
                      `/view_profile/${user.connectionId.username}`
                    )
                  }}
                  className={styles.userCard}
                  key={index}
                >

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.2rem"
                    }}
                  >

                    <div className={styles.profilePicture}>

                      <img
                        src={`${BASE_URL}/${user.connectionId.profilePicture}`}
                        alt=""
                      />

                    </div>


                    <div className={styles.useroInfo}>

                      <h3>
                        {user.connectionId.name}
                      </h3>

                      <p>
                        {user.connectionId.username}
                      </p>

                    </div>

                  </div>

                </div>

              )

            })}

        </div>

      </DashboardLayout>

    </UserLayout>
  )
}