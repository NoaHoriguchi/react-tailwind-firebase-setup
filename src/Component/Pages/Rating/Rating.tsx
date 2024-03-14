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
        let folderRef = ref(storage, userData.day + "/" + auth.currentUser?.uid);
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
        updateDoc(doc(db, "users", currentUserId), "day", userData.day += 1).then(()=>{
            navigate("/upload");
        });
    }
    return (
        <div className="flex items-center gap-2 font-bold text-blue-gray-500">
        {rated}
        <Stars value={4} onChange={(value) => setRated(value)} />
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