import "./NewPodCast.css";
import React from 'react'
import axios from "axios";
import Alert from 'react-popup-alert'
export default function NewUser() {
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Podcast</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Name Of the Podcast</label>
          <input type="text" id="podcastName" align="left" placeholder="Podcast name" required="true" />
        </div>
        <div className="newUserItem">
          <label>Date</label>
          <input type="date" id="date" align="left" placeholder="Date" required="true" />
        </div>
        <div className="newUserItem">
          <label>Audio file</label>
          <input type="file" id="audio" align="left"  required="true" />
        </div>
        <div className="newUserItem">
          <label>Cover Image</label>
          <input type="file" id="image" align="left" required="true" />
        </div>
        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}
