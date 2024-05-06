import { useEffect } from "react";
import BarChartBox from "../components/barChartBox/BarChartBox";
import BigChartBox from "../components/bigChartBox/BigChartBox";
import ChartBox from "../components/chartBox/ChartBox";
import PieChartBox from "../components/pieCartBox/PieChartBox";
import TopBox from "../components/topBox/TopBox";
import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "../Data/data";
import "./home.scss";
import { auth, db, storage } from "../../Helpers/Firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let currentUserId = auth.currentUser?.uid;
    if (!currentUserId) { 
      navigate("/login");
    } else {
      console.log("uid: " + currentUserId);
    }
  });

  return (
    <div className="home">
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
        <ChartBox {...chartBoxUser} />
      </div>
      <div className="box box3">
        <ChartBox {...chartBoxProduct} />
      </div>
      <div className="box box4">
        <PieChartBox />
      </div>
      <div className="box box5">
        <ChartBox {...chartBoxConversion} />
      </div>
      <div className="box box6">
        <ChartBox {...chartBoxRevenue} />
      </div>
      <div className="box box7">
        <BigChartBox />
      </div>
      <div className="box box8">
        <BarChartBox {...barChartBoxVisit} />
      </div>
      <div className="box box9">
        <BarChartBox {...barChartBoxRevenue} />
      </div>
    </div>
  );
};

export default Home;
