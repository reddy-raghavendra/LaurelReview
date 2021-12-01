import React from "react";
import Navbar from "./Navbar";
import image from "../images/home.png"
import homeStyle from "./HomeStyle.css"
// import "../styles/HomeStyle.css";
// import im from "../images/home.png"
function Home() {
  
  return (
    <div className="bg" >
      <Navbar />
      <img src={image} className={homeStyle.photo} id="img"/>
    </div>
  );
}
export default Home;
