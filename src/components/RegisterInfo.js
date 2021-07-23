import React from "react";
import logo from "../img/Logo_1.png";

function RegisterInfo() {
  return (
    <div className="regi_ins">
      <div className="image_login">
        <img src={logo} alt="Lanka Institute" />
      </div>
      <div className="image_content">
        <h3>
          To provide a trusted and professional e-learning service using best
          tools possible with integrity focusing the virtual safety of students
          and keeping the parent/guardian informed on the interactions.
        </h3>
      </div>
    </div>
  );
}

export default RegisterInfo;
