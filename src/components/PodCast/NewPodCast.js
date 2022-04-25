import "./NewPodCast.css";
import storage from "../Firebase/Firebase";
import React from 'react'
import axios from "axios";
import { useState } from "react";
import Alert from 'react-popup-alert'
import { useHistory } from "react-router-dom";
import { getToken } from "../Token/Token";

export default function NewPodCast() {
  const {REACT_APP_API_URL} = process.env
    const history = useHistory()
    if(getToken() != "Login Success"){
      history.push("/login");
    }
    const [imageUrl, setImageUrl] = useState("");
    const [audioUrl, setAudioUrl] = useState("");
    const [formData,setFormData] = useState({
        podcastName:"",
        podcastDesc: "",
        podcastDate: "",
        podcastAudioFile: "",
        podcastCoverImage: ""
    });
    const handleFormAddChange = (event) => {
        event.preventDefault();
        debugger
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
        const newFormData = { ...formData };
        newFormData[fieldName] = fieldValue;
        setFormData(newFormData);
      };
    const handleImageFile = async (event) => {
        var image = event.target.files[0];
        if (image == null) return;
    
        storage
          .ref(`/images/${image.name}`)
          .put(image)
          .on("state_changed",() => {
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                setImageUrl(url);
              });
          });
      };
      const handleAudioFile = async (event) => {
        var audio = event.target.files[0];
        if (audio == null) return;
    
        storage
          .ref(`/audios/${audio.name}`)
          .put(audio)
          .on("state_changed",() => {
            storage
              .ref("audios")
              .child(audio.name)
              .getDownloadURL()
              .then((url) => {
                setAudioUrl(url);
              });
          });
      };

      const sendData = (event) => {
        event.preventDefault();
        debugger
        const newFormData = {...formData};
        let podcastCoverImage = {imageUrl};
        let podcastAudioFile = {audioUrl};
        newFormData.podcastCoverImage = podcastCoverImage.imageUrl;
        newFormData.podcastAudioFile = podcastAudioFile.audioUrl;

    
        (async () => {
          const element = document.querySelector(
            "#post-request-async-await .article-id"
          );
          const response = await axios.post(
            `${REACT_APP_API_URL}api/podcast/save`,
            newFormData
          );
          if(response.status == 200){
            alert("Podcast saved successfully")
            history.push("/podcastlist") 
          }
        })();
      };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Create Podcast</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label className="required-field">Name Of the Podcast</label>
          <input type="text" id="podcastName" name="podcastName" align="left" placeholder="Podcast name" required="true" onChange={handleFormAddChange}/>
        </div>
        <div className="newUserItem">
          <label className="required-field">Date</label>
          <input type="date" id="date" name="podcastDate" align="left" placeholder="Date" required="true" onChange={handleFormAddChange}/>
        </div>
        <div className="newUserItem">
          <label className="required-field">Audio file</label>
          <input type="file" id="audio" name="podcastAudioFile" align="left"  required="true" accept=".mp3,audio/*" onChange={handleAudioFile}/>
        </div>
        <div className="newUserItem">
          <label className="required-field">Cover Image</label>
          <input type="file" id="image" name="podcastCoverImage" align="left" required="true" onChange={handleImageFile}/>
        </div>
        <div className="newUserItem">
          <label className="required-field">Description of the podcast</label>
          <textarea type="textarea" id="textArea" name="podcastDesc" align="left" required="true" onChange={handleFormAddChange}/>
        </div>
        <button className="newUserButton" onClick={sendData}>Create</button>
      </form>
    </div>
  );
}
