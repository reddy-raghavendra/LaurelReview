import React from "react";
import "./Podcasts.css";
import "./AudioFile.css"
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";

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
    <section className="laurel-podcast-section">
      <div className="laurel-podcast-details">
        <div className="laurel-podcast-img">
        <img className="cover-podcast-image" src={pod.podcastCoverImage}></img>
        </div>
        <div className="laurel-podcast-details-content">
          <h3 className="podcast-name">{pod.podcastName}</h3>
          <p>{pod.podcastDate}</p>
          <p>{pod.podcastDesc}</p>
          <div className="main">
          <AudioPlayer props={pod.podcastAudioFile}></AudioPlayer>
          </div>
        </div>
      </div>
    </section>
  ));
}
