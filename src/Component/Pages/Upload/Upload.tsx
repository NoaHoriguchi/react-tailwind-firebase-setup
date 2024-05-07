import React, { useMemo, useEffect, useState, useId } from "react";
import {useDropzone} from 'react-dropzone';
import { auth, db, storage } from "../../../Helpers/Firebase";
import { collection, doc, getDoc, query, getDocs, DocumentData } from "firebase/firestore";
import { UploadMetadata, ref, uploadBytes, getDownloadURL, deleteObject, uploadString } from "firebase/storage"
import { useNavigate } from "react-router-dom";
import YouTube, { YouTubeProps } from "react-youtube";
import { Textarea } from "@material-tailwind/react";

var userData: DocumentData;
var missions: DocumentData[];
var metadata: UploadMetadata;
var todayMission: DocumentData;

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column' as 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const Upload = () => {
  const navigate = useNavigate();

  var tasks: JSX.Element = <li></li>
  var spanish: JSX.Element = <div></div>
  const [task, setTask] = useState(tasks);
  const [spanishMail, setSpanish] = useState(spanish);
  
  useEffect(() => {
    let currentUserId = auth.currentUser?.uid;
    if (!currentUserId) { 
      navigate("/login");
    }
    console.log("uid: " + currentUserId);

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
          console.log("videoLink: " + todayMission.videoLink);
        } 
      } 
      tasks = 
        <div className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-4">
          DAY {todayMission.day}：{todayMission.title} <br></br>
          {/* day: {todayMission.day} <br></br>
          fromUser: {todayMission.fromUser} <br></br>
          message: {todayMission.message} <br></br> */}
        </div>
      setTask(tasks);

      if (userData.day == 14) {
        spanish = 
        <div className="m-6">
          Subject: Inicio del Proyecto Temporal <br></br>
          Querido equipo, <br></br>
          
          Con gran entusiasmo, presentamos el Proyecto Temporal, una iniciativa pionera que marca el inicio de una nueva era en la comunicación y el intercambio de información. Este proyecto no solo representa un avance tecnológico, sino que también es un puente hacia futuras colaboraciones, que trascienden las barreras del tiempo. <br></br>
          
          La implementación de este proyecto requerirá un esfuerzo conjunto y una visión compartida. Nuestro objetivo es integrar sistemas avanzados que permitan una sinergia única entre el presente y lo que está por venir. Es esencial que todos los involucrados mantengan la mente abierta y estén preparados para abrazar los cambios que esto implicará. <br></br>
          
          Adjunto encontrarán detalles preliminares del proyecto, que cubren los objetivos y los métodos propuestos. Les insto a leerlo con atención y a considerar el impacto a largo plazo de nuestra colaboración. <br></br>
          
          Esperamos con ansias su participación activa y sus aportes para llevar a cabo esta visión. <br></br>
          
          Cordialmente,
        </div>
      }
      setSpanish(spanish);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject, 
    acceptedFiles
  } = useDropzone();

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  const files = acceptedFiles.map(file => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  metadata = {
    customMetadata: {
      'rating': "0"
    }
  };

  const uploadFile = () => {
    if (!acceptedFiles.length) {
      console.log("no files selected");
    } else {
      console.log("uploadURL: " + userData.day + "/" + auth.currentUser?.uid);
      for (let i = 0; i < acceptedFiles.length; i += 1) {
        let fileRef = ref(storage, userData.day + "/" + auth.currentUser?.uid + "/files/" + i);
        getDownloadURL(fileRef).then((url) => {
          deleteObject(fileRef);
          console.log("deleted file at " + i);
          uploadBytes(fileRef, acceptedFiles[i], metadata).then((snapshot) => {
            console.log('Uploaded a file to: ' + storage, userData.day + "/" + auth.currentUser?.uid + "/files/" + i);
          });
          // navigate("/input");
        }, err => uploadBytes(fileRef, acceptedFiles[i], metadata).then((snapshot) => {
          console.log('Uploaded a file to: ' + storage, userData.day + "/" + auth.currentUser?.uid + "/files/" + i);
        }));
      }
    }
    if (!postContent) {
      console.log("no post content");
      return;
      // let fileRef = ref(storage, userData.day + "/" + auth.currentUser?.uid + "/texts/" + "content");
      // uploadString(fileRef, postContent).then((snapshot) => {
      //   console.log("uploaded string: " + postContent);
      // })
    } else {
      console.log("uploadURL: " + userData.day + "/" + auth.currentUser?.uid);
      let fileRef = ref(storage, userData.day + "/" + auth.currentUser?.uid + "/texts/" + "content");
      uploadString(fileRef, postContent).then((snapshot) => {
        console.log("uploaded string: " + postContent);
      })
    }
    if (!urlContent) {
      console.log("no url content");
      let fileRef = ref(storage, userData.day + "/" + auth.currentUser?.uid + "/urls/" + "content");
      uploadString(fileRef, urlContent).then((snapshot) => {
        console.log("uploaded string: " + urlContent);
      })
    } else {
      console.log("uploadURL: " + userData.day + "/" + auth.currentUser?.uid);
      let fileRef = ref(storage, userData.day + "/" + auth.currentUser?.uid + "/urls/" + "content");
      uploadString(fileRef, urlContent).then((snapshot) => {
        console.log("uploaded string: " + urlContent);
      })
    }
    navigate("/input");
  };
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const postTextAreaId = useId();
  const [postContent, setPostContent] = useState('');
  const [urlContent, setUrlContent] = useState('');
  return (
    <div className="container align-top flex-col gap-12">
      <div>
        {task}
      </div>
      <div className="container m-auto flex-col m-8">
      <label htmlFor={postTextAreaId}>
        ChatGPTの生成物をコピペしてください！
      </label>
      <textarea
        id={postTextAreaId}
        className="bg-gray-200 border-b-2 border-blue-700"
        name="postContent"
        rows={4}
        cols={40}
        value={postContent} // ...force the input's value to match the state variable...
        onChange={e => setPostContent(e.target.value)} 
      />
    </div>
    <div className="container align-top flex-col gap-12 m-8">
    <label className="container">
      ChatGPTの共有リンク：
      <textarea name="postContent" className="bg-gray-200 border-b-2 border-blue-700" rows={2} cols={100} value={urlContent} // ...force the input's value to match the state variable...
        onChange={e => setUrlContent(e.target.value)}  />
    </label>
    </div >
      {/* <YouTube videoId="VqGO-mQY0q4" opts={opts} onReady={onPlayerReady} className="m-6"/> */}
      {/* <div>
        {spanishMail}
      </div> */}
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <br></br>
        <p>{files}</p>
      </div>
      <div className="content-center w-full">
        <button onClick={uploadFile} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-6 self-center">
        Upload
        </button>
      </div>
    </div>
  );
};

export default Upload;