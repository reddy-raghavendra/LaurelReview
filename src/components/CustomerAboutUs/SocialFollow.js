import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { social } from "./SocialFollow.css";
import {
  faWordpress,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function SocialFollow(props) {
  let instagram = "";
  let twitter = "";
  let facebook = "";
  let wordpress = "";
  debugger;
  if (props.props.instagram != "" && props.props.instagram != null) {
    instagram = (
      <a href={props.props.instagram} className="instagram social">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
    );
  }
  if (props.props.twitter != "" && props.props.twitter != null) {
    twitter = 
      <a href={props.props.twitter} className="twitter social">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a>
  }
  if (props.props.facebook != "" && props.props.facebook != null) {
    facebook = (
      <a href={props.props.facebook} className="facebook social">
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </a>
    );
  }
  if (props.props.wordpress != "" && props.props.wordpress != null) {
    wordpress = (
      <a href={props.props.wordpress} className="tiktok social">
        <FontAwesomeIcon icon={faWordpress} size="2x" />
      </a>
    );
  }
  return (
    <div class="social-container">
      {instagram}
      {twitter}
      {facebook}
      {wordpress}
    </div>
  );
}
