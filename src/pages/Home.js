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
      <div className="simple_card_sec">
        <div className="card_sec_main">
          <div className="card">
            <div className="card_body">
              <h1>G.C.E. ORDINARY LEVEL</h1>
            </div>
            <div className="card_head">
              <img src={imgSec1} alt="card image" />
            </div>
          </div>
          <div className="card">
            <div className="card_body">
              <h1>G.C.E. ADVANCED LEVEL</h1>
            </div>
            <div className="card_head">
              <img src={imgSec2} alt="card image" />
            </div>
          </div>
          <div className="card">
            <div className="card_body">
              <h1>HIGHER EDUCATION</h1>
            </div>
            <div className="card_head">
              <img src={imgSec3} alt="card image" />
            </div>
          </div>
          <div className="card">
            <div className="card_body">
              <h1>OTHERS</h1>
            </div>
            <div className="card_head">
              <img src={imgSec4} alt="card image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
