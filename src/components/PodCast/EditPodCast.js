import "./EditPodCast.css";
import storage from "../Firebase/Firebase";
import * as React from "react";
import { forwardRef } from "react";
import {useLocation} from 'react-router-dom';
import MaterialTable from "material-table";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { getToken } from "../Token/Token";



export default function EditPodCast() {
  const {REACT_APP_API_URL} = process.env
  

  const history = useHistory()
  const [imageUrl, setImageUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [formData,setFormData] = useState({
      podcastName:"",
      podcastDesc: "",
      podcastDate: "",
      podcastAudioFile: "",
      podcastCoverImage: ""
  });
  const { state } = useLocation();
  if(getToken() != "Login Success"){
    history.push("/login");
  }

  async function  getPodcast() {

    const url = `${REACT_APP_API_URL}api/podcast/${state}`;
    console.log(url)
      await axios.get(url).then(
          (response) => {             
              console.log(response.data)  
              setFormData({
                podcastName:response.data.podcastName,
                podcastDesc:response.data.podcastDesc,
                podcastDate:response.data.podcastDate,
                podcastAudioFile:response.data.podcastAudioFile,
                podcastCoverImage:response.data.podcastCoverImage
              })   
              setAudioUrl(response.data.podcastAudioFile)
              setImageUrl(response.data.podcastCoverImage)                      
          });
        //   console.log("iser: "+ userData)
    }
  React.useEffect(()=>{
    getPodcast()
  },[])


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
            formData.imageUrl=url
            setFormData(formData);
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
      const response = await axios.put(
        `${REACT_APP_API_URL}api/podcast/update/${state}`,
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
      <h1 className="newUserTitle">Edit Podcast</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Name Of the Podcast</label>
          <input type="text" id="podcastName" value={formData.podcastName} name="podcastName" align="left" placeholder="Podcast name" required="true" onChange={handleFormAddChange}/>
        </div>
        <div className="newUserItem">
          <label>Date</label>
          <input type="date" id="date" name="podcastDate" value={formData.podcastDate} align="left" placeholder="Date" required="true" onChange={handleFormAddChange}/>
        </div>
        <div className="newUserItem">
          <label>Audio file</label>
          <button className="productListEdit">play</button>
          <input type="file" id="audio" name="podcastAudioFile" file={formData.podcastAudioFile} align="left"  required="true" onChange={handleAudioFile}/>
        </div>
        <div className="newUserItem">
          <label>Cover Image</label>
          <img className="productListImg" src={formData.podcastCoverImage}></img>
          <input type="file" id="image" name="podcastCoverImage" align="left" required="true" onChange={handleImageFile}/>
        </div>
        <div className="newUserItem">
          <label>Description of the podcast</label>
          <input type="textarea" id="textArea" name="podcastDesc" value={formData.podcastDesc} align="left" required="true" onChange={handleFormAddChange}/>
        </div>
        <div className="newUserItem">
         </div> 
        <button className="newUserButton" onClick={sendData}>Update</button>
        <button className="newUserButton" onClick={sendData}>Cancel</button>
      </form>
    </div>
  );
}
