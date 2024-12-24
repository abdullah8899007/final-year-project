

import React from "react";
import Logo from "../common-components/Common-Login-Comp/logo";
import Loginform from "@/app-components/login/loginform";
import RightElipse from "@/app-components/login/rightElipse2";
import Signup from "@/app-components/signup";
// import "../Login.css";

const Login = () => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <div className="login-wrapper grid md:grid-cols-2">
        <div className="left-areaa md:col-span-1">
          <div className="image-logo-wrapper-reset">
            <Logo />
          </div>
          <div className="form-wrapper-container">
            <Signup signup={'signup'} />
          </div>
        </div>
        <div className="right-areaa md:col-span-1">{<RightElipse />}</div>
      </div>
    </div>
  );
};
export default Login;




