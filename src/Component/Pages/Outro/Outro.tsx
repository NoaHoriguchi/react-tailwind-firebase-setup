import { Unity, useUnityContext } from "react-unity-webgl";
import { useNavigate } from "react-router-dom";
import React, { useMemo, useEffect, useState, Fragment } from "react";
import {useDropzone} from 'react-dropzone';
import { auth, db, storage } from "../../../Helpers/Firebase";
import { collection, doc, getDoc, query, getDocs, DocumentData, updateDoc } from "firebase/firestore";
import { UploadMetadata, ref, uploadBytes, getDownloadURL, deleteObject, updateMetadata, SettableMetadata, StorageReference, listAll} from "firebase/storage"
import { UnityProvider } from "react-unity-webgl/distribution/types/unity-provider";

var userData: DocumentData;
var missions: DocumentData[];
var metadata: SettableMetadata;
var todayMission: DocumentData;
var currentUserId : string;
var unityProviderVar : UnityProvider;

const Outro = () => {
  const [user, setUser] = useState(userData);
  // const [unityProvider, setUnityProvider] = useState(unityProviderVar);
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
  const navigate = useNavigate();
  const { unityProvider, unload } = useUnityContext({
    // loaderUrl: "../../../../Unity/intro/" + user.day + "/WebTest.loader.js",
    // dataUrl: "../../../../Unity/intro/" + user.day + "/WebTest.data",
    // frameworkUrl: "../../../../Unity/intro/" + user.day + "/WebTest.framework.js",
    // codeUrl: "../../../../Unity/intro/" + user.day + "/WebTest.wasm",
    loaderUrl: "../../../../Unity/outro/1/WebTest.loader.js",
    dataUrl: "../../../../Unity/outro/1/WebTest.data",
    frameworkUrl: "../../../../Unity/outro/1/WebTest.framework.js",
    codeUrl: "../../../../Unity/outro/1/WebTest.wasm",
  });
  async function handleClickBack() {
    await unload();
    navigate("/input");
    // Ready to navigate to another page.
  }
  // return <div>Dashboard</div>;
  return(
    <Fragment>
      <Unity unityProvider={unityProvider} style={{ width: "100%", height: "100%" }} />
      <button onClick={handleClickBack} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-6 self-center">ゲーム開始</button>
    </Fragment>
  );
};

export default Outro;
