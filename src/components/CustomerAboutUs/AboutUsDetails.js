import React from "react";
import "./AboutUsDetails.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import SocialFollow from "./SocialFollow";

export default function AboutUsDetails() {
  var aboutUsList = [];
  const [data, setData] = useState(aboutUsList);
  React.useEffect(() => {
    getAboutUs();
  }, []);
  function getAboutUs() {
    const url = `http://localhost:8081/api/aboutus`;
    console.log(url);
    axios.get(url).then((response) => {
      aboutUsList = response.data;
      console.log("Response", aboutUsList);
      setData(aboutUsList);
    });
  }
  return data.map((about) => (
    <section className="laurel-aboutus-section">
      <div className="laurel-aboutus-details">
        <div className="laurel-aboutus-img">
          <img
            className="cover-aboutus-image"
            src={about.aboutUsCoverImage}
          ></img>
          <SocialFollow className="cover-aboutus-social"
            props={{
              wordpress: about.wordPressLink,
              facebook: about.faceBookLink,
              instagram: about.instagramLink,
              twitter: about.twitterLink,
            }}
          ></SocialFollow>
        </div>
        <div className="laurel-aboutus-details-content">
          <h3 className="aboutus-name">{about.aboutUsName}</h3>
          <p className="aboutus-pos">{about.aboutUsRole}</p>
          <p className="aboutus-desc">{about.aboutUsDesc}</p>
        </div>
      </div>
    </section>
  ));
}
