import React from "react";
import image from "../../images/home.png"
import homeStyle from "./home.css"
import SocialFollow from "../SocialFollow/SocialFollow";

function Home() {
  return (
    <div className="bg" >
      <img src={image} className={homeStyle.photo} id="img" alt="Home Page" />
      <div >
        <SocialFollow/>
        </div>
    </div>
  );
}

export default Home;
