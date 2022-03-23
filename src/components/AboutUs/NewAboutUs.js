import "./NewAboutUs.css";
import storage from "../Firebase/Firebase";
import React from 'react'
import axios from "axios";
import { useState } from "react";
import Alert from 'react-popup-alert'
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {social} from "./Social.css"

import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

export default function NewAboutUs() {
    const history = useHistory()
    const [imageUrl, setImageUrl] = useState("");
    const [formData,setFormData] = useState({
      AboutUsName:"",
      AboutUsRole:"",
      AboutUsDesc: "",
      AboutUsCoverImage: ""
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
    

      const sendData = (event) => {
        event.preventDefault();
        debugger
        const newFormData = {...formData};
        let AboutUsCoverImage = {imageUrl};
        newFormData.AboutUsCoverImage = AboutUsCoverImage.imageUrl;

    
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
      <h1 className="newUserTitle">AboutUs</h1>
      <form className="newUserForm">
      
  
        <div className="newUserItem">
          <label>Name</label>
          <input type="text" id="AboutUsName" name="AboutUsName" align="left" placeholder="Name" required="true" onChange={handleFormAddChange}/>
        </div>
        <div className="newUserItem">
          <label>Role</label>
          <input type="text" id="AboutUsRole" name="AboutUsRole" align="left" placeholder="Role" required="true" onChange={handleFormAddChange}/>
        </div>
      
        <div className="newUserItem">
          <label>Image</label>
          <input type="file" id="image" name="AboutUsCoverImage" align="left" required="true" onChange={handleImageFile}/>
        </div>
        <div className="newUserItem">
          <label>Description</label>
          <input type="text" id="textArea" name="AboutUsDesc" align="left" placeholder="Description" required="true" onChange={handleFormAddChange}/>
        </div>
        
        <div className="newUserItem">
          <div className="instagram social">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
        <label>Instagram</label>
        </div>
          <input type="text" id="textArea" name="Instagram" align="left" placeholder="Instagram" required="true" onChange={handleFormAddChange}/>
        </div>
        <div className="newUserItem">
          <div className = "facebook social">
        <FontAwesomeIcon icon={faFacebook} size="2x" />
        <label>Facebook</label>
        </div>
          <input type="text" id="textArea"   pattern="https://.*" size="30" name="Facebook" align="left" placeholder="Facebook" required="true" onChange={handleFormAddChange}/>
        </div>
        <div className="newUserItem">
          <div className="twitter social">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
        <label>Twitter</label>
        </div>
          <input type="text" id="textArea" name="Twitter" align="left" placeholder="Twitter" required="true" onChange={handleFormAddChange}/>
        </div>
        <div className="newUserItem">
          <div className="youtube social">
        <FontAwesomeIcon icon={faYoutube} size="2x" />
        <label>Youtube</label>
        </div>
          <input type="text" id="textArea" name="Youtube" align="left" placeholder="Youtube" required="true" onChange={handleFormAddChange}/>
        </div>
      <div>
        <button className="newUserButton" onClick={sendData}>Create</button>
        </div>
      </form>
    </div>
  );
}