import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {social} from "./SocialFollow.css"
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

export default function SocialFollow() {
  return (
    <div class="social-container">
      <h3>Social Follow</h3>
      <a
        href="https://www.instagram.com/laurelreview/?hl=en"
        className="instagram social"
      >
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
      <a href="https://twitter.com/laurelreview" className="twitter social">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a>
      <a
        href="https://www.facebook.com/laurelreview/"
        className="facebook social"
      >
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </a>
      <a
        href="https://www.tiktok.com/@thelaurelreview"
        className="tiktok social"
      >
        <FontAwesomeIcon icon={faTiktok} size="2x" />
      </a>
    </div>
  );
}
