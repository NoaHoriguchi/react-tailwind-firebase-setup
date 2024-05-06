import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'
import { auth, db, storage } from "../../../Helpers/Firebase";
import { useNavigate } from "react-router-dom";

const Trailer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let currentUserId = auth.currentUser?.uid;
    if (!currentUserId) { 
      navigate("/login");
    } else {
      console.log("uid: " + currentUserId);
    }
  }, []);

  return (
    <ReactPlayer url='https://web.sfc.keio.ac.jp/~t21657nh/ed_mizuki.mp4' onEnded={() => navigate('/rating')} controls={false} playing={true} width="100%" height="100%"/>
  );
}
export default Trailer;