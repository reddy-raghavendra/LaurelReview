import "./NewAboutUs.css";
import storage from "../Firebase/Firebase";
import React from 'react'
import axios from "axios";
import { useState } from "react";
import Alert from 'react-popup-alert'
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {social} from "./Social.css";
import { getToken } from "../Token/Token";
import {RichTextEditor} from "@mantine/rte";

import {
  faYoutube,
  faFacebook,
  faTwitter,
  faWordpress,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

export default function NewAboutUs() {
  const { REACT_APP_API_URL } = process.env;
    const history = useHistory()
    if(getToken() != "Login Success"){
      history.push("/login");
    }
    const [imageUrl, setImageUrl] = useState("");
    const[value,onChange] = useState("");
    const [formData,setFormData] = useState({
      aboutUsName:"",
      aboutUsRole:"",
      aboutUsDesc: "",
      aboutUsCoverImage: "",
      wordPressLink:"",
      twitterLink:"",
      faceBookLink:"",
      instagramLink:""
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
        newFormData.aboutUsCoverImage = AboutUsCoverImage.imageUrl;
        let desc = {value}
        newFormData.aboutUsDesc = desc.value;
    
        (async () => {
          const element = document.querySelector(
            "#post-request-async-await .article-id"
          );
          const response = await axios.post(
            `${REACT_APP_API_URL}api/aboutus/save`,
            newFormData
          );
          if(response.status == 200){
            alert("AboutUs saved successfully")
            history.push("/AboutUsList") 
          }
        })();
      };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">AboutUs</h1>
      <form className="newUserForm">      
        <div className="newUserItem">
          <label className="required-field">Name</label>
          <input type="text" id="aboutUsName" name="aboutUsName" align="left" placeholder="Name" required="true" onChange={handleFormAddChange}/>
        </div>
        <div className="newUserItem">
          <label className="required-field">Role</label>
          <input type="text" id="aboutUsRole" name="aboutUsRole" align="left" placeholder="Role" required="true" onChange={handleFormAddChange}/>
        </div>
      
        <div className="newUserItem">
          <label className="required-field">Image</label>
          <input type="file" id="aboutUsCoverImage" name="aboutUsCoverImage" align="left" required="true" onChange={handleImageFile}/>
        </div>
        <div className="newUserItem">
          <label>Description</label>
          <RichTextEditor
            controls={
              [
                ['bold','italic','underline']
              ]
            }
             value={value}
             onChange={onChange}
          />
</div>
        
        <div className="newUserItem">
          <div className="instagram social">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
        <label>Instagram</label>
        </div>
          <input type="text" id="textArea" name="instagramLink" align="left" placeholder="Instagram" required="true" onChange={handleFormAddChange}/>
        </div>
        <div className="newUserItem">
          <div className = "facebook social">
        <FontAwesomeIcon icon={faFacebook} size="2x" />
        <label>Facebook</label>
        </div>
          <input type="text" id="textArea"   pattern="https://.*" size="30" name="faceBookLink" align="left" placeholder="Facebook" required="true" onChange={handleFormAddChange}/>
        </div>
        <div className="newUserItem">
          <div className="twitter social">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
        <label>Twitter</label>
        </div>
          <input type="text" id="textArea" name="twitterLink" align="left" placeholder="Twitter" required="true" onChange={handleFormAddChange}/>
        </div>
        <div className="newUserItem">
          <div className="youtube social">
        <FontAwesomeIcon icon={faWordpress} size="2x" />
        <label>WordPress</label>
        </div>
          <input type="text" id="textArea" name="wordPressLink" align="left" placeholder="Youtube" required="true" onChange={handleFormAddChange}/>
        </div>
      <div>
        <button className="newUserButton" onClick={sendData}>Create</button>
        </div>
      </form>
    </div>
  );
}
