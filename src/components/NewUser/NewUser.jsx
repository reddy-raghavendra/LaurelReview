import "./newUser.css";
import React from 'react'
import axios from "axios";
import Alert from 'react-popup-alert'
import { getToken } from "../Token/Token"
import { useHistory } from "react-router-dom";

export default function NewUser() {
  const {REACT_APP_API_URL} = process.env
  const [alert, setAlert] = React.useState({
    type: 'error',
    text: 'This is a alert message',
    show: false
  })
  const history = useHistory()


  function createUser(event) {
    if(getToken() != "Login Success"){
      history.push("/login");
    }
    let userData = getData();
    event.preventDefault();
    (async () => {
      // POST request using axios with async/await
      const element = document.querySelector('#post-request-async-await .article-id');
      // const article = { title: 'Axios POST Request Example' };
      // const userData = {    "firstName":"Raghav",
      //                       "lastName":"Reddy",
      //                      "phoneNo":6605415168,
      // "email":"test1@gmail.com",
      // "password":"test@123",
      // "address":"Maryville",
      // "gender":"male",
      // "active":true,
      // "role":"full access"}

      const response = await axios.post(`${REACT_APP_API_URL}api/save`, userData);
      // element.innerHTML = response.data.id;
      console.log(response)
      // alert("Created Successfully")
      if (response.status == 200) {
        history.push("/users")
      }
    })();
  }

  function getData() {
    debugger
    let genders = document.getElementsByName("gender")
    var genderType;
    if (genders[0].checked === true) {
      genderType = genders[0].value
    } else if (genders[1].checked === true) {
      genderType = genders[1].value
    } else {
      genderType = genders[2].value
    }
    var active = document.getElementById("active").value === "yes" ? true : false

    // closeAlert(){

    // }

    var userData = {
      "firstName": document.getElementById("fName").value,
      "lastName": document.getElementById("lName").value,
      "phoneNo": document.getElementById("phoneNo").value,
      "email": document.getElementById("email").value,
      "password": document.getElementById("password").value,
      "address": document.getElementById("address").value,
      "gender": genderType,
      "active": active,
      "role": document.getElementById("role").value
    }
    console.log(userData)
    return userData
  }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label className="required-field">First Name</label>
          <input type="text" id="fName" align="left" placeholder="First Name" required="true" />
        </div>
        <div className="newUserItem">
          <label className="required-field">Last Name</label>
          <input type="text" id="lName" align="left" placeholder="Last name" required="true" />
        </div>
        <div className="newUserItem">
          <label className="required-field">Email</label>
          <input type="email" id="email" align="left" placeholder="john@email.com" required="true" />
        </div>
        <div className="newUserItem">
          <label className="required-field">Password</label>
          <input type="password" id="password" align="left" placeholder="password" required="true" />
        </div>
        <div className="newUserItem">
          <label className="required-field">Phone</label>
          <input type="text" id="phoneNo" align="left" placeholder="+1 123 456 78" required="true" />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" id="address" align="left" placeholder="New York | USA" required="true" />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="newUserItem">
          <label>Role</label>
          <select className="newUserSelect" name="roles" id="role">
            <option value="Full Access">Full Access</option>
            <option value="Intermediate Access">Intermediate Access</option>
          </select>
        </div>
        <div className="newUserItem">
        </div>
        <button className="newUserButton" onClick={createUser}>Create</button>
      </form>
    </div>
  );
}
