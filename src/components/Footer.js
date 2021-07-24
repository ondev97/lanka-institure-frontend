import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../assets/css/footer.css";
import "../assets/css/mediaFiles/footermedia.css";
import ftimg from "../img/Logo_1.png";

export default function Footer() {
  let location = useLocation().pathname;
  console.log(location);
  if (
    location === "/stlogin" ||
    location === "/stsignup" ||
    location === "/passwordreset"
  ) {
    return "";
  }
  return (
    <div className="footer_main">
      <div className="footer_mid">
        <div className="footer_column">
          <div className="lg">
            <img src={ftimg} alt="footer" />
          </div>
          <div className="ab">
            <p>
              To provide a trusted and professional e-learning service using
              best tools possible with integrity focusing the virtual safety of
              students and keeping the parent/guardian informed on the
              interactions.
            </p>
          </div>
        </div>
        <div className="footer_column">
          <h2>Follow Us</h2>
          <ul className="scial">
            <li>
              <i className="fab fa-facebook-square"></i>
            </li>
            <li>
              <i className="fab fa-twitter-square"></i>
            </li>
            <li>
              <i className="fab fa-linkedin"></i>
            </li>
          </ul>
        </div>
        <div className="footer_column">
          <h2>Explore</h2>
          <ul className="links">
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li> */}
            <li>
              <Link to="#">All Courses</Link>
            </li>
            <li>
              <Link to="#">Free Courses</Link>
            </li>
            <li>
              <Link to="#">Paid Courses</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="small_footer">
        <h3>
          COPYRIGHT © LANKA INSTITUTE | PROUDLY POWERED BY
          <span>
            {
              <Link to="//helamid.com" target="_blank">
                &nbsp;HELAMID
              </Link>
            }
          </span>
        </h3>
      </div>
    </div>
  );
}
