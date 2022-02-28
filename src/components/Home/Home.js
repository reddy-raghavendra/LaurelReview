import React from "react";
import image from "../../images/home.png"
import homeStyle from "./home.css"

function Home() {
  return (
    <div className="bg" >
      <img src={image} className={homeStyle.photo} id="img" alt="Home Page" />
    </div>
  );
}

export default Home;
