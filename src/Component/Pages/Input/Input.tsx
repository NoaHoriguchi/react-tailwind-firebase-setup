import React, { useEffect, useState} from 'react'
import ReactPlayer from 'react-player'
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../../Helpers/Firebase";
import { collection, doc, getDoc, query, getDocs, DocumentData } from "firebase/firestore";
import { UploadMetadata, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"

var userData: DocumentData;
var missions: DocumentData[];
var metadata: UploadMetadata;
var todayMission: DocumentData;

const Input = () => {
  const navigate = useNavigate();
  var videos: JSX.Element = <li></li>
  const [video, setVideo] = useState(videos);
  useEffect(() => {
    let currentUserId = auth.currentUser?.uid;
    if (!currentUserId) { 
      navigate("/login");
    } else {
      console.log("uid: " + currentUserId);
    }
    if (currentUserId) {
      getDoc(doc(db, "users", currentUserId)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.data());
          userData = snapshot.data();
          console.log("userData: " + userData);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
    getDocs(query(collection(db, "missions"))).then((snap) => {
      missions = snap.docs.map((doc) => doc.data());
      console.log(missions);

      for  (let i=0; i<missions.length; i++) {
        if (missions[i].day == userData.day) {
          todayMission = missions[i];
          console.log("mission: " + todayMission.title);
        } 
      }
      videos = 
      <ReactPlayer url={todayMission.videoLink} onEnded={() => navigate('/rating')} controls playing={true} width="100%" height="100%"/>
      setVideo(videos);
    })
  }, []);
  return (
    <div>
      {video}
    </div>
  );
}
export default Input;