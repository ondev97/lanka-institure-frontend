import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeAccount } from "../actions";
import { loadStDetails } from "../actions/stDetailsAction";
import cov from "../img/cover.png";
import "../assets/css/home.css";
import "../assets/css/mediaFiles/homemedia.css";
import imgSec1 from "../img/1.png";
import imgSec2 from "../img/2.png";
import imgSec3 from "../img/3.png";
import imgSec4 from "../img/4.png";
import sl from "../img/sl.png";
import usa from "../img/usa.png";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const accountDetails = useSelector((state) => state.accountDetails);

  useEffect(() => {
    dispatch(activeAccount());
    dispatch(loadStDetails());

    window.scrollTo(0, 0);
  }, [dispatch]);

  return (
    <div className="maininde">
      <div className="uppercover">
        <div className="cov_text">
          <h1>
            LANKA<span className="blackhe"> INSTITUTE</span>
            <br />
          </h1>
          <p>
            To provide a trusted and professional e-learning service using best
            tools possible with integrity focusing the virtual safety of
            students and keeping the parent/guardian informed on the
            interactions.
          </p>
          <div className="country_but">
            <div className="column">
              <img src={sl} alt="Sri Lanka" />
              <h2>SRI LANKA</h2>
            </div>
            <div className="column">
              <img src={usa} alt="USA" />
              <h2>UNITED STATES</h2>
            </div>
          </div>
        </div>
        {!accountDetails.key ? <LoginForm /> : ""}
        <div className="cov_img">
          <img src={cov} alt="image" />
        </div>
      </div>
      <div className="inde_counter">
        <div className="main_inde_counter">
          <div className="wr">
            <div className="counter_colu">
              <Link to="/freeclasses">
                <h2>FREE RECORDED COURSES</h2>
                <div className="img_sec">
                  <img src={imgSec4} />
                </div>
              </Link>
            </div>
            <div className="counter_colu">
              <Link to="/freeclasses">
                <h2>FREE LIVE COURSES</h2>
                <div className="img_sec">
                  <img src={imgSec2} />
                </div>
              </Link>
            </div>
            <div className="counter_colu">
              <h2>PAID RECORDED COURSES</h2>
              <div className="img_sec">
                <img src={imgSec3} />
              </div>
            </div>
            <div className="counter_colu">
              <h2>PAID LIVE COURSES</h2>
              <div className="img_sec">
                <img src={imgSec1} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="inde_counter new-box">
        <div className="main_inde_counter">
          <div className="title">
            <h1>අපි A සාමාර්ථ සොයා උඩුගම් බලා පිහිනන්නෙමු</h1>
          </div>
          <div className="wr">
            <div className="counter_colu">
              <h2>ඉතිහාසයේ </h2>
              <img src={first} alt="first" />
              <h3>
                Island 1<sup>st</sup> 2<sup>nd</sup> 3<sup>rd</sup>
              </h3>
              <h3>
                District 1<sup>st</sup> 19 ක්
              </h3>
            </div>
            <div className="counter_colu">
              <h2>මෙවර</h2>
              <img src={first} alt="first" />
              <h3>3,7,11 සමග මුල් 25 ට 13ක්</h3>
              <h3>
                District 1<sup>st</sup> 5 ක්
              </h3>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="inde_counter new-box one">
        <div className="main_inde_counter">
          <div className="title">
            <h1>Next Live Class</h1>
          </div>
          <div className="wr">
            <div className="counter_colu">
              <div className="img_sec">
                <img src={imgSec1} />
              </div>
              <h2>NEXT PAID LIVE CLASS</h2>
              <h3>Lesson Name :</h3>
              <h3>Lesson Start Date :</h3>
              <h3>Lesson Start Time :</h3>
            </div>
            <div className="counter_colu">
              <div className="img_sec">
                <img src={imgSec2} />
              </div>
              <h2>NEXT FREE LIVE CLASS</h2>
              <h3>Lesson Name :</h3>
              <h3>Lesson Start Date :</h3>
              <h3>Lesson Start Time :</h3>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="inde_counter one cont">
        <div className="main_inde_counter">
          <div className="title">
            <h1>Contact Us : 0716588634 / 0705532203</h1>
          </div>
        </div>
      </div> */}
    </div>
  );
}
