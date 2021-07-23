import React, { useEffect } from "react";
import StLoginForm from "../components/StLoginForm";
import logo from "../img/Logo_1.png";
import { useDispatch } from "react-redux";
import { activeAccount } from "../actions";
import "../assets/css/stlogin.css";
import "../assets/css/mediaFiles/loginRegister.css";

export default function StLogin() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(activeAccount());
  }, [dispatch]);

  return (
    <>
      <div className="login_body">
        <div className="login_column">
          <div className="login_form">
            <div className="topSign">
              <h2>Login</h2>
            </div>
            <StLoginForm />
          </div>
        </div>
        <div className="login_column">
          <div className="image_login">
            <img src={logo} alt="" />
          </div>
          <div className="image_content">
            <h3>
              To provide a trusted and professional e-learning service using
              best tools possible with integrity focusing the virtual safety of
              students and keeping the parent/guardian informed on the
              interactions.
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
