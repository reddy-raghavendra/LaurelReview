import "./EditAboutUs.css";
import storage from "../Firebase/Firebase";
import * as React from "react";
import { forwardRef } from "react";
import {useLocation} from 'react-router-dom';
import MaterialTable from "material-table";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export default function EditPodCast() {

  const history = useHistory()
  const [imageUrl, setImageUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [formData,setFormData] = useState({
    AboutUsName:"",
    AboutUsDesc: "",
    AboutUsDate: "",
    AboutUsAudioFile: "",
    AboutUsCoverImage: ""
  });
  const { state } = useLocation();

  async function  getAboutUs() {

    const url = `http://localhost:8081/api/AboutUs/${state}`;
    console.log(url)
      await axios.get(url).then(
          (response) => {             
              console.log(response.data)  
              setFormData({
                AboutUsName:response.data.AboutUsName,
                AboutUsDesc:response.data.AboutUsDesc,
                AboutUsDate:response.data.AboutUsDate,
                AboutUsAudioFile:response.data.AboutUsAudioFile,
                AboutUsCoverImage:response.data.AboutUsCoverImage
              })             
          });
        //   console.log("iser: "+ userData)
    }
  React.useEffect(()=>{
    getAboutUs()
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
    let AboutUsCoverImage = {imageUrl};
    let AboutUsAudioFile = {audioUrl};
    newFormData.AboutUsCoverImage = AboutUsCoverImage.imageUrl;
    newFormData.AboutUsAudioFile = AboutUsAudioFile.audioUrl;


    (async () => {
      const element = document.querySelector(
        "#post-request-async-await .article-id"
      );
      const response = await axios.post(
        "http://localhost:8081/api/AboutUs/save",
        newFormData
      );
      if(response.status == 200){
        alert("AboutUs saved successfully")
        history.push("/AboutUs") 
      }
    })();
  };
  
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Create AboutUs</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Name</label>
          <input type="text" id="AboutUsName" value={formData.AboutUsName} name="AboutUsName" align="left" placeholder="name" required="true" onChange={handleFormAddChange}/>
        </div>
        <div className="newUserItem">
          <label>Image</label>
          <img className="productListImg" src={formData.AboutUsCoverImage}></img>
          <input type="file" id="image" name="AboutUsCoverImage" align="left" required="true" onChange={handleImageFile}/>
        </div>
        <div className="newUserItem">
          <label>Description</label>
          <input type="textarea" id="textArea" name="AboutUsDesc" value={formData.AboutUsDesc} align="left" required="true" onChange={handleFormAddChange}/>
        </div>
        <div className="newUserItem">
         </div> 
        <button className="newUserButton" onClick={sendData}>Update</button>
        <button className="newUserButton" onClick={sendData}>Cancel</button>
      </form>
    </div>
  );
}
