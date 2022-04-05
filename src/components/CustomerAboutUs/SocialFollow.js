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
  return (
    <div class="social-container">
      <a href={props.props.instagram} className="instagram social">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
      <a href={props.props.twitter} className="twitter social">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a>
      <a href={props.props.facebook} className="facebook social">
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </a>
      <a href={props.props.wordpress} className="tiktok social">
        <FontAwesomeIcon icon={faWordpress} size="2x" />
      </a>
    </div>
  );
}
