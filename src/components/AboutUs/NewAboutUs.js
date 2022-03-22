import "./NewAboutUs.css";
import storage from "../Firebase/Firebase";
import React from 'react'
import axios from "axios";
import { useState } from "react";
import Alert from 'react-popup-alert'
import { useHistory } from "react-router-dom";

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
          <input type="textarea" id="textArea" name="AboutUsDesc" align="left" required="true" onChange={handleFormAddChange}/>
        </div>
      
      <div>
        <button className="newUserButton" onClick={sendData}>Create</button>
        </div>
      </form>
    </div>
  );
}
