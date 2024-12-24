import React from "react";
import Logo from "../../../app/common-components/Common-Login-Comp/logo";
import RightElipse2 from "../rightElipse2";
import Loginform from "../loginform";

const Login = () => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <div className="login-wrapper grid md:grid-cols-2">
        <div className="left-areaa md:col-span-1">
          <div className="image-logo-wrapper-reset">
            <Logo />
          </div>
          <div className="form-wrapper-container">
            <Loginform />
          </div>
        </div>
        <div className="right-areaa md:col-span-1">{<RightElipse2 />}</div>
      </div>
    </div>
  );
};
export default Login;
