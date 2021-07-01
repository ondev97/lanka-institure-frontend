import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { activeAccount } from "../actions";
import { loadStDetails } from "../actions/stDetailsAction";
import cov from "../img/cover.jpg";
import "../assets/css/home.css";
import "../assets/css/mediaFiles/homemedia.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import imgSec1 from "../img/1.png";
import imgSec2 from "../img/2.png";
import imgSec3 from "../img/3.png";
import imgSec4 from "../img/4.png";
import first from "../img/ISLAND.png";
export default function Home() {
  const dispatch = useDispatch();

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
            SFT<span className="blackhe">Lanka</span>
            <br />
            <span>පිටවීම සරසවියට පමණයි</span>
          </h1>
          <p>
            වැඩිම සිසුන් ගණනකට A සාමාර්ථ හා සරසවි වරම් දුන් ශ්‍රී ලංකාවේ අංක 1
            තාක්ෂණවේදය සදහා විද්‍යාව (Science For Technology - SFT) ගුරුවරයා.
          </p>
          <h2>ප්‍රදීප් S දිසානායක</h2>
          <div className="button">
            <div className="buttele">
              <i className="fab fa-whatsapp"></i>
              0712123456
            </div>
            <div className="buttele">
              <i class="fab fa-telegram-plane"></i>
              Telegram Channel
            </div>
          </div>
        </div>
        <div className="loginform">
          <div className="loginWrapper">
            <h1>Student Login</h1>
            <form>
              <p>
                <label>Username</label>
                <input type="text" name="Username" />
              </p>
              <p>
                <label>Password</label>
                <input type="password" name="password" />
              </p>
              <div className="butSec">
                <button>Login</button>
                <p>Forget Password</p>
              </div>
            </form>
          </div>
        </div>
        <div className="cov_img">
          <img src={cov} alt="image" />
        </div>
      </div>
      <div className="inde_counter">
        <div className="main_inde_counter">
          <div className="wr">
            <div className="counter_colu">
              <div className="img_sec">
                <img src={imgSec1} />
              </div>
              <h2>UPCOMING CLASS : 2021.07.05 | 04 PM</h2>
            </div>
            <div className="counter_colu">
              <div className="img_sec">
                <img src={imgSec2} />
              </div>
              <h2>UPCOMING CLASS : 2021.07.05 | 04 PM</h2>
            </div>
            <div className="counter_colu">
              <div className="img_sec">
                <img src={imgSec3} />
              </div>
              <h2>UPCOMING CLASS : 2021.07.05 | 04 PM</h2>
            </div>
            <div className="counter_colu">
              <div className="img_sec">
                <img src={imgSec4} />
              </div>
              <h2>UPCOMING CLASS : 2021.07.05 | 04 PM</h2>
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
