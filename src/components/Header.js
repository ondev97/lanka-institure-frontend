import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../assets/css/header.css";
import "../assets/css/mediaFiles/headermedia.css";
import { AnimatePresence, motion } from "framer-motion";
import ProfileDetails from "../utils/hooks/ProfileDetails";
import logo from "../img/Logo_1.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Header({ acDetails }) {
  const [isham, setisham] = useState(false);
  const [path, setpath] = useState("");
  const profileDetails = ProfileDetails(acDetails);

  const mobnavani = {
    visible: {
      right: 0,
      transition: { duration: 0.75, ease: "easeOut" },
    },
    hidden: {
      right: "-100%",
      transition: { duration: 1, ease: "easeIn" },
    },
  };
  const mainRoute = [
    "/",
    "about",
    "contact",
    "allteachers",
    "allsubjects",
    "stlogin",
    "stsignup",
    "passwordreset",
    "guidelines",
    "features",
    "freeclasses",
    "freesubcources",
    "freemodule",
  ];

  const hambutton = () => {
    setisham(!isham);
  };

  const { pathname } = useLocation();

  useEffect(() => {
    if (isham) {
      setisham(!isham);
    }
    if (pathname !== "/") {
      let pathArr = pathname.split("/");
      setpath(pathArr[1]);
    } else {
      setpath("/");
    }
  }, [pathname]);

  const headerProPic = () => {
    if (acDetails.key) {
      if (acDetails.is_teacher) {
        return (
          <div className="pro_pic">
            <div className="ac_details_header">
              <h3 style={{ textTransform: "uppercase" }}>
                {profileDetails.userName}
              </h3>
              <p>Instructor</p>
            </div>
            <Link to="teacherdashboard/managecourse">
              <div className="img">
                <LazyLoadImage
                  src={`${profileDetails.pic}`}
                  alt=""
                  effect="blur"
                />
              </div>
            </Link>
          </div>
        );
      } else {
        return (
          <div className="pro_pic">
            <div className="ac_details_header">
              <h3 style={{ textTransform: "uppercase" }}>
                {profileDetails.userName}
              </h3>
              <p>Student</p>
            </div>
            <Link to="studentdashboard/maindashboard">
              <div className="img">
                <LazyLoadImage
                  src={`${profileDetails.pic}`}
                  alt=""
                  effect="blur"
                />
              </div>
            </Link>
          </div>
        );
      }
    } else {
      return (
        <div className="buttons">
          {/* <Link to="/stlogin">
            <button>LOG IN</button>
          </Link> */}
          <Link to="/stsignup">
            <button>REGISTER</button>
          </Link>
        </div>
      );
    }
  };

  if (mainRoute.includes(path)) {
    return (
      <>
        <nav>
          <div className="column">
            <div className="hlogo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
          </div>
          <div className="column">
            <div className="navigation">
              <ul>
                <li>
                  <Link to="/">HOME</Link>
                </li>
                {/* <li>
                <Link to="/about">ABOUT US</Link>
              </li>
              <li>
                <Link to="/contact">CONTACT US</Link>
              </li> */}
                <li>
                  <Link to="#">ALL COURSES</Link>
                </li>
                <li>
                  <Link to="/freeclasses">FREE COURSES</Link>
                </li>
                <li>
                  <Link to="#">PAID COURSES</Link>
                </li>
                {/* <li>
                  <Link to="#">ALL INSTRUCTORS</Link>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="column">{headerProPic()}</div>
          <div className="ham">
            <button className="hambeggermenu" onClick={hambutton}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </nav>
        <AnimatePresence exitBeforeEnter>
          {isham ? (
            <motion.div
              className="hammenu"
              variants={mobnavani}
              animate="visible"
              initial="hidden"
              exit="hidden"
            >
              <div className="menham">
                <ul>
                  <Link to="/">
                    <li>HOME</li>
                  </Link>
                  <Link to="#">
                    <li>ALL COURSES</li>
                  </Link>
                  <Link to="/freeclasses">
                    <li>FREE COURSES</li>
                  </Link>
                  <Link to="#">
                    <li>PAID COURSES</li>
                  </Link>
                  {/* <Link to="#">
                    <li>ALL INSTRUCTORS</li>
                  </Link> */}
                </ul>
                <div className="butham">{headerProPic()}</div>
              </div>
            </motion.div>
          ) : (
            ""
          )}
        </AnimatePresence>
      </>
    );
  } else {
    return "";
  }
}
