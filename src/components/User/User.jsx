import axios from "axios";
import {
  CalendarToday,
  ContactsOutlined,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { getToken } from "../Token/Token";
// import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { Link } from "react-router-dom";
import "./user.css";
// import React from "react";
// import { useState } from "react";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


export default function User() {
  const history = useHistory()
  const { REACT_APP_API_URL } = process.env;
  // const { id } = React.useParams()
  if (getToken() != "Login Success") {
    history.push("/login");
  }
  var urlValues = window.location.pathname.split("/");
  const [userData, setData] = useState({});
  const [userLastName, setLastName] = useState("");
  const [userFirstName, setFirstName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userPhone, setPhone] = useState("");
  const [userAddress, setAddress] = useState("");
  const [userRole, setRole] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userStatus, setStatus] = useState("");
  const [userGender, setGender] = useState("");

  const id = urlValues[2];
  function createUser(event) {
    event.preventDefault();
    debugger;
    (async () => {
      // POST request using axios with async/await
      const element = document.querySelector(
        "#put-request-async-await .article-id"
      );
      // const article = { title: 'Axios POST Request Example' };
      const userData = {
        firstName: userFirstName,
        lastName: userLastName,
        phoneNo: userPhone,
        email: userEmail,
        password: userPassword,
        address: userAddress,
        gender: userGender,
        active: userStatus,
        role: userRole,
      };
      const response = await axios.put(
        `${REACT_APP_API_URL}api/update/${id}`,
        userData
      );
      // element.innerHTML = response.data.id;
      console.log(response);

      // window.open("http://localhost:3001/users")
    })();
  }

  async function getUser() {
    const url = `${REACT_APP_API_URL}api/users/${id}`;
    console.log(url);
    await axios.get(url).then((response) => {
      console.log(response.data);
      setData(response.data);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setPhone(response.data.phoneNo);
      setRole(response.data.role);
      setAddress(response.data.address);
      setEmail(response.data.email);
      setPassword(response.data.password);
      setStatus(response.data.active);
      setGender(response.data.gender);

      // setModel()
      console.log("Processing Request");
      // return result
    });
    console.log("iser: " + userData);
  }
  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            {/* <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            /> */}
            {/* <div className="userShowTopTitle"> */}
            <span id="nameView" className="userShowUsername">
              {userData.firstName}
            </span>
            {/* <span className="userShowUserTitle">Software Engineer</span> */}
            {/* </div> */}
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">User Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span id="fNameView" className="userShowInfoTitle">
                {userData.firstName}
              </span>
            </div>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span id="lNameView" className="userShowInfoTitle">
                {userData.lastName}
              </span>
            </div>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span id="genderView" className="userShowInfoTitle">
                {userData.gender}
              </span>
            </div>
            <div className="userShowInfo">
              {/* <SupervisorAccountIcon className="userShowIcon"/> */}
              <span id="roleView" className="userShowInfoTitle">
                {userData.role}
              </span>
            </div>

            {/* <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div> */}
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span id="phoneView" className="userShowInfoTitle">
                {userData.phoneNo}
              </span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span id="emailView" className="userShowInfoTitle">
                {userData.email}
              </span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span id="addressView" className="userShowInfoTitle">
                {userData.address}
              </span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>First Name</label>
                <input
                  type="text"
                  id="fNameEdit"
                  placeholder="Anna Becker"
                  className="userUpdateInput"
                  value={userFirstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Last Name</label>
                <input
                  type="text"
                  id="lNameEdit"
                  placeholder="Anna Becker"
                  className="userUpdateInput"
                  value={userLastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  id="emailEdit"
                  type="text"
                  placeholder="annabeck99@gmail.com"
                  className="userUpdateInput"
                  value={userEmail}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  id="phoneEdit"
                  type="text"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                  value={userPhone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  id="addressEdit"
                  type="text"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                  value={userAddress}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Role</label>
                <select
                  className="newUserSelect"
                  name="roles"
                  id="roleEdit"
                  value={userData.role}
                >
                  <option id="fullAccess" value="Full Access">
                    Full Access
                  </option>
                  <option id="intermediateAccess" value="Intermediate Access">
                    Intermediate Access
                  </option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              {/* <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
              </div> */}
              <button className="userUpdateButton" onClick={createUser}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
