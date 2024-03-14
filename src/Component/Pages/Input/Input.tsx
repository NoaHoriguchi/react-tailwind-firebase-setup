import React from 'react'
import ReactPlayer from 'react-player'
import { useNavigate } from "react-router-dom";

function Input() {
  const navigate = useNavigate();
  return (
    <ReactPlayer url='https://web.sfc.keio.ac.jp/~t21657nh/ed_mizuki.mp4' onEnded={() => navigate('/trailer')} controls playing={true} width="100%" height="100%"/>
  );
}
export default Input;