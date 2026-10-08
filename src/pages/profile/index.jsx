import { getAboutUser } from '@/config/redux/action/authAction'
import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import React, { useEffect, useState } from 'react'
import styles from "./index.module.css" ;
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL, clientServer } from '@/config';
import { getAllPosts } from '@/config/redux/action/postAction';
export default function ProfilePage() {


    const authState =useSelector((state) =>state.auth)
    const postReducer =useSelector((state) => state.postReducer);


    const [userProfile,setUserProfile] =useState({})
    const [userPosts,setUserPosts]  = useState([])


const [isModalOpen, setIsModalOpen] = useState(false);

const [work, setWork] = useState({
    company: "",
    position: "",
    years: ""
});

const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);

const [education, setEducation] = useState({
    school: "",
    degree: "",
    fieldOfDuty: ""
});

    const dispatch =useDispatch();





    useEffect(() =>{
        dispatch(getAboutUser({token: localStorage.getItem("token")}))
        dispatch(getAllPosts())
    }, [])



useEffect(() => { 
    if(authState.user != undefined) {
    
    setUserProfile(authState.user)
     let post = postReducer.posts.filter((post) =>{
       return  post.userId.username === authState.user.userId.username
      })

      setUserPosts(post);   
    }

}, [authState.user,postReducer.posts])

const updateProfilePicture = async (file) => {

    const formData = new FormData();
    formData.append("profile_picture", file);
    formData.append("token", localStorage.getItem("token"));

    const response = await clientServer.post("/update_profile_picture", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    dispatch(getAboutUser({ token: localStorage.getItem("token") }));

}
const addWork = () => {

    if (!work.company || !work.position || !work.years) {
        alert("Please fill all fields");
        return;
    }

    const newWork = {
        company: work.company,
        position: work.position,
        years: work.years
    };

    setUserProfile({
        ...userProfile,
        pastWork: [
            ...userProfile.pastWork,
            newWork
        ]
    });

    setWork({
        company: "",
        position: "",
        years: ""
    });

    setIsModalOpen(false);
};

const addEducation = () => {

    if (!education.school || !education.degree || !education.fieldOfDuty) {
        alert("Please fill all fields");
        return;
    }

    const newEducation = {
        school: education.school,
        degree: education.degree,
        fieldOfDuty: education.fieldOfDuty
    };

    setUserProfile({
        ...userProfile,
        education: [
            ...(userProfile.education || []),
            newEducation
        ]
    });

    setEducation({
        school: "",
        degree: "",
        fieldOfDuty: ""
    });

    setIsEducationModalOpen(false);
};

const updateProfileData = async () => {
    const request = await clientServer.post("/update_user_profile", {
        token: localStorage.getItem("token"),
        name: userProfile.userId.name,
    });

    const response = await clientServer.post("/update_profile_data", {
        token: localStorage.getItem("token"),
        bio: userProfile.bio,
        currentPost: userProfile.currentPost,
        pastWork: userProfile.pastWork,
        education: userProfile.education
    });

    dispatch(getAboutUser({ token: localStorage.getItem("token") }));
}

  return (
    <UserLayout>
        <DashboardLayout>
            {authState.user && userProfile?.userId &&
           <div className={styles.container}>
        <div className={styles.backDropContainer}>
            <label htmlFor='profilePictureUpload' className={styles.backDrop__overlay}>
                <p>
                    Edit
                </p>
            </label>
           <input
    type="file"
    id="profilePictureUpload"
    onChange={(e) => {
        updateProfilePicture(e.target.files[0]);
    }}
    style={{ display: "none" }}
/>
          <img src={`${BASE_URL}/${userProfile?.userId?.profilePicture}`} alt="backDrop" />
        </div>
        <div className={styles.profileContainer__details}>
        <div style={{display:"flex" , gap:"0.7rem"}}>
          <div style={{flex:0.8}}>
            <div style={{display:"flex" , width:"fit-content",gap:"1rem" , alignItems:"center" ,fontSize:"0.6em"}}>
              <input className={styles.nameEdit} type="text" value={userProfile.userId.name} onChange={(e) => {
    setUserProfile({ ...userProfile, userId: { ...userProfile.userId, name: e.target.value } })
}} />
              <p style={{color:"grey",fontSize:"1.8em"}}>@{userProfile.userId.username}</p>

            </div>
   


<div>
 <textarea
    value={userProfile.bio}
    onChange={(e) => {
        setUserProfile({ ...userProfile, bio: e.target.value });
    }}
    rows={Math.max(3, Math.ceil(userProfile.bio.length / 80))} 
    style={{ width: "100%" }}
/>
</div>
 
          </div>
          <div>
            <h3 style={{padding:"0.7rem",fontSize:"1rem"}}>Recent Activity</h3>
            {userPosts.map((post) =>{
              return(
                <div key={post._id} className={styles.postCard}>
                  <div
  className={styles.card}
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem"
  }}
>
  <div className={styles.card__profileContainer}>
    {post.media !== "" ? (
      <img
        src={`${BASE_URL}/${post.media}`}
        alt=""
      />
    ) : (
      <div style={{ width: "3.4rem", height: "3.4rem" }}></div>
    )}
  </div>

  <p style={{
    fontSize: "0.6rem",
    textAlign: "center",
    margin: 0
  }}>
    {post.body}
  </p>
</div>
                </div>
              )
            })}
          </div>
        </div>
        </div>

        <div className="workHistory">
          <h4 >Work History</h4>
          <div className={styles.workHistoryContainer}>
            {
              userProfile.pastWork.map((work,index) => {
                return(
                  <div key={index} className={styles.workHistoryCard}>
                    <p style={{fontWeight:"bold",display:"flex",alignItems:"center",gap:"0.8rem"}}>{work.company} - {work.position}</p>
                    <p>{work.years}</p>

                  </div>
                )
              })
            }
         <button 
    className={styles.addWorkButton} 
    onClick={() => {
        setIsModalOpen(true);
    }}
> 
    Add Work
</button>

{isModalOpen && (
    <div className={styles.workModalOverlay}>

        <div className={styles.workModal}>

            <h3>Add Work</h3>

            <input
                type="text"
                placeholder="Company"
                value={work.company}
                onChange={(e) => {
                    setWork({
                        ...work,
                        company: e.target.value
                    });
                }}
            />

            <input
                type="text"
                placeholder="Position"
                value={work.position}
                onChange={(e) => {
                    setWork({
                        ...work,
                        position: e.target.value
                    });
                }}
            />

            <input
                type="text"
                placeholder="Years"
                value={work.years}
                onChange={(e) => {
                    setWork({
                        ...work,
                        years: e.target.value
                    });
                }}
            />

            <button onClick={addWork}>
                Add Work
            </button>

            <button onClick={() => setIsModalOpen(false)}>
                Cancel
            </button>

        </div>

    </div>
)}

          </div>
          
        </div>
        <div className="educationHistory">

    <h4>Education</h4>

    <div className={styles.workHistoryContainer}>

        {(userProfile.education || []).map((edu, index) => {
            return (
                <div
                    key={index}
                    className={styles.workHistoryCard}
                >

                    <p
                        style={{
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.8rem"
                        }}
                    >
                        {edu.school} - {edu.degree}
                    </p>

                    <p>{edu.fieldOfDuty}</p>

                </div>
            );
        })}

        <button
            className={styles.addWorkButton}
            onClick={() => {
                setIsEducationModalOpen(true);
            }}
        >
            Add Education
        </button>


        {isEducationModalOpen && (
            <div className={styles.workModalOverlay}>

                <div className={styles.workModal}>

                    <h3>Add Education</h3>

                    <input
                        type="text"
                        placeholder="School / College"
                        value={education.school}
                        onChange={(e) => {
                            setEducation({
                                ...education,
                                school: e.target.value
                            });
                        }}
                    />

                    <input
                        type="text"
                        placeholder="Degree"
                        value={education.degree}
                        onChange={(e) => {
                            setEducation({
                                ...education,
                                degree: e.target.value
                            });
                        }}
                    />

                    <input
                        type="text"
                        placeholder="Field of Study"
                        value={education.fieldOfDuty}
                        onChange={(e) => {
                            setEducation({
                                ...education,
                                fieldOfDuty: e.target.value
                            });
                        }}
                    />

                    <button onClick={addEducation}>
                        Add Education
                    </button>

                    <button
                        onClick={() => {
                            setIsEducationModalOpen(false);
                        }}
                    >
                        Cancel
                    </button>

                </div>

            </div>
        )}

    </div>
</div>
        {userProfile !== authState.user && 
    <div onClick={() => {
        updateProfileData();
    }} className={styles.updateProfileBtn}>
        Update Profile
    </div>
}
      </div>   

}


        </DashboardLayout>
    </UserLayout>
  )
}
