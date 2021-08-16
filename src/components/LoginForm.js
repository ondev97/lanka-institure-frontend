import React, { useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import StValidateLogin from "../utils/hooks/StValidateLogin";

function LoginForm() {
  const [
    values,
    hadelOnChange,
    hadelSubmit,
    errors,
    hideError,
    hide,
    acDetails,
  ] = StValidateLogin();
  const passwordRef = useRef();

  //function for trigger show password field
  const showPassword = (e) => {
    let checked = e.target.checked;

    if (checked) {
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
    }
  };

  if (Object.values(acDetails).length !== 0) {
    if (!acDetails.user.is_teacher) {
      return <Redirect to="/studentdashboard/maindashboard" />;
    } else if (acDetails.user.is_teacher) {
      return <Redirect to="/teacherdashboard/managecourse" />;
    }
  }
  return (
    <>
      <div className="loginform">
        <div className="loginWrapper">
          <h1>Student Login</h1>
          <form onSubmit={hadelSubmit}>
            {errors.comerrors && (
              <p className={`comtip ${hide.un ? "hidetip" : ""}`}>
                {errors.comerrors}
              </p>
            )}
            <p>
              <label>Username</label>
              <input
                type="text"
                name="un"
                value={values.un}
                onChange={hadelOnChange}
                className={errors.un ? "error" : ""}
                onFocus={hideError}
                style={{ textTransform: "uppercase" }}
              />
              {errors.un && (
                <span className={`tip ${hide.un ? "hidetip" : ""}`}>
                  {errors.un}
                </span>
              )}
            </p>
            <p>
              <label>Password</label>
              <input
                type="password"
                name="pw"
                value={values.pw}
                onChange={hadelOnChange}
                className={errors.pw ? "error" : ""}
                onFocus={hideError}
                ref={passwordRef}
              />
              {errors.pw && (
                <span className={`tip ${hide.pw ? "hidetip" : ""}`}>
                  {errors.pw}
                </span>
              )}
            </p>
            <p className="showpw">
              <input
                type="checkbox"
                name="showPw"
                id="showpw"
                onChange={showPassword}
              />
              <label htmlFor="showpw">Show Password</label>
            </p>
            <div className="butSec">
              <button>Login</button>
              <Link to="/passwordreset">
                <p>Forget Password</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
