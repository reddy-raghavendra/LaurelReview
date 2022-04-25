import "./newChapbook.css";
import storage from "../Firebase/Firebase";
import React from 'react'
import axios from "axios";
import { useState } from "react";
import Alert from 'react-popup-alert'
import { useHistory } from "react-router-dom";
import { getToken } from "../Token/Token";

export default function Newchapbook() {
 

  const history = useHistory()
  if (getToken() != "Login Success") {
    history.push("/login");
  }
  const { REACT_APP_API_URL } = process.env;
  // const { id } = React.useParams()
  const [imageUrl, setImageUrl] = useState("");
  // const [audioUrl, setAudioUrl] = useState("");
  const [formData, setFormData] = useState({
    chapBookName: "",
    chapBookDesc: "",
    chapBookDate: "",
    chapBookCoverImage: ""
    // status: true

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
      .on("state_changed", () => {
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
    const newFormData = { ...formData };
    let chapBookCoverImage = { imageUrl };
    //let chapbookAudioFile = {audioUrl};
    newFormData.chapBookCoverImage = chapBookCoverImage.imageUrl;
    // newFormData.chapbookAudioFile = chapbookAudioFile.audioUrl;


    (async () => {
      const element = document.querySelector(
        "#post-request-async-await .article-id"
      );
      const response = await axios.post(
        `${REACT_APP_API_URL}api/chapbook/save`,
        newFormData
      );
      if (response.status == 200) {
        alert("chapbook saved successfully")
        history.push("/ChapbookList")
      }
    })();
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Create chapbook</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label className="required-field">Title</label>
          <input type="text" id="Title" name="chapBookName" align="left" placeholder="Title" required="true" onChange={handleFormAddChange} />
        </div>
        <div className="newUserItem">
          <label className="required-field">Author Name</label>
          <input type="text" id="AuthorName" name="chapBookDate" align="left" placeholder="Author Name" required="true" onChange={handleFormAddChange} />
        </div>
        <div className="newUserItem">
          <label className="required-field">Description of the chapbook</label>
          <input type="textarea" id="textArea" name="chapBookDesc" align="left" required="true" onChange={handleFormAddChange} />
        </div>
        <div className="newUserItem">
          <label className="required-field">Cover Image</label>
          <input type="file" id="image" name="chapBookCoverImage" align="left" required="true" onChange={handleImageFile} />
        </div>
        {/* <div className="newUserItem">
          <label>Status</label>
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleFormAddChange}
          />
        </div> */}
        <button className="newUserButton" onClick={sendData}>Create</button>
      </form>
    </div>
  );
}
