import { Typography, Rating as Stars } from "@material-tailwind/react";
import React, { useMemo, useEffect, useState } from "react";
import {useDropzone} from 'react-dropzone';
import { auth, db, storage } from "../../../Helpers/Firebase";
import { collection, doc, getDoc, query, getDocs, DocumentData, updateDoc } from "firebase/firestore";
import { UploadMetadata, ref, uploadBytes, getDownloadURL, deleteObject, updateMetadata, SettableMetadata, StorageReference, listAll} from "firebase/storage"
import { useNavigate } from "react-router-dom";

var userData: DocumentData;
var missions: DocumentData[];
var metadata: SettableMetadata;
var todayMission: DocumentData;
var currentUserId : string;

function RatedIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="cursor-pointer text-yellow-700 w-6 h-6"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd"></path></svg>
  );
}
 
function UnratedIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="cursor-pointer text-blue-gray-500 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"></path></svg>
  );
}
 

const Rating = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(userData);
    useEffect(() => {
        if (!auth.currentUser) return navigate("/login");

        currentUserId = auth.currentUser?.uid;
    
        console.log("uid: " + currentUserId);
    
        if (currentUserId) {
          getDoc(doc(db, "users", currentUserId)).then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.data());
              userData = snapshot.data();
              console.log("userData: " + userData);
              setUser(snapshot.data());
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
        });
      }, []);

    const [rated, setRated] = React.useState(4);

    const finishDay = () => {
        let folderRef = ref(storage, userData.day + "/" + auth.currentUser?.uid + "/texts");
        metadata = {
            customMetadata: {
                rating: rated.toString()
            }
        }
        listAll(folderRef).then((result) => {
            result.items.forEach((item) => {
                updateMetadata(item, metadata);
            })
        });
        console.log("update rating complete")
        updateDoc(doc(db, "users", currentUserId), "day", userData.day == 1).then(()=>{ //change later to 0
            navigate("/upload");
        });
    }
    return (
        <div className="flex items-center gap-2 font-bold text-blue-gray-500">
        {rated}
        <Stars ratedIcon={<RatedIcon />}
      unratedIcon={<UnratedIcon />} value={4} onChange={(value) => setRated(value)}/>
        <Typography color="blue-gray" className="font-medium text-blue-gray-500">
            終わり
        </Typography>
        <button onClick={finishDay} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-6 self-center">
        Upload
        </button>
        </div>
    );
};

export default Rating;