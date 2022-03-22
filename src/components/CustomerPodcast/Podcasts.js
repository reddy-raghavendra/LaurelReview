import React from "react";
import "./Podcasts.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Podcasts() {
  var podCastList = [];
  const [data, setData] = useState(podCastList);
  React.useEffect(() => {
    getPodcasts();
  }, []);
  function getPodcasts() {
    const url = `http://localhost:8081/api/podcasts`;
    console.log(url);
    axios.get(url).then((response) => {
      podCastList = response.data;
      console.log("Response", podCastList);
      var list = podCastList;
      list.forEach((pod) => {
        pod.buttonText = "Play";
        pod.audio = "";
      });
      setData(list);
    });
  }
  return data.map((pod) => (
    <div className="laurel-podcast-section">
      <div className="laurel-podcast-details">
        <img className="laurel-podcast-img" src={pod.podcastCoverImage}></img>
        {/* <div className="laurel-pocast-details-content">
          <h3>{pod.podcastName}</h3>
          <h4>{pod.podcastDate}</h4>
          <p>{pod.podcastDesc}</p>
        </div> */}
      </div>
    </div>
  ));
}
