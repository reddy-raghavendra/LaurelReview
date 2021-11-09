import React from "react";
import "./Navbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

export default function Navbar() {
  return (
    <div className="Navbar">
      <div className="NavbarWrapper">
        <div className="topLeft">
          <span className="logo">Laurel Review</span>
        </div>
        {/* <div className="topRight">
          <div className="NavbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="NavbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="NavbarIconContainer">
            <Settings />
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        </div> */}
      </div>
    </div>
  );
}
