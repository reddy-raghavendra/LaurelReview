import React from "react";
import image from "../images/home.png"
import homeStyle from "./HomeStyle.css"
// import "../styles/HomeStyle.css";
// import im from "../images/home.png"
function Home() {
  
  return (
    <div className="bg" >
      <img src={image} className={homeStyle.photo} id="img"/>
    </div>
  );
}
export default Home;
