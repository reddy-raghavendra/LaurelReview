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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {social} from "./Social.css";
import { getToken } from "../Token/Token";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
export default function EditAboutUS() {
  const { REACT_APP_API_URL } = process.env;
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
  if(getToken() != "Login Success"){
    history.push("/login");
  }
  async function  getAboutUs() {

    const url = `${REACT_APP_API_URL}api/AboutUs/${state}`;
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

    newFormData.AboutUsCoverImage = AboutUsCoverImage.imageUrl;



    (async () => {
      const element = document.querySelector(
        "#post-request-async-await .article-id"
      );
      const response = await axios.post(
        "${REACT_APP_API_URL}api/AboutUs/save",
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
          <input type="text" id="textArea" name="Facebook" align="left" placeholder="Facebook" required="true" onChange={handleFormAddChange}/>
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
        <button className="newUserButton" onClick={sendData}>Update</button>
        <button className="newUserButton" onClick={sendData}>Cancel</button>
      </form>
    </div>
  );
}
