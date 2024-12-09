import Logo from "../../../app/common-components/Common-Login-Comp/logo";
import RightElipse2 from "../rightElipse2";
import LoginInBtn from "../../../app/common-components/Common-Login-Comp/LoginBtn";
import SocialIcon from "../../../app/common-components/Common-Login-Comp/socialicon";
import Signupform from "../signupform";
import "../Login.css";

const Signup = () => {
  return (
    <div className="login-wrapper grid md:grid-cols-2">
      <div className="left-areaa md:col-span-1">
        <div className="image-logo-wrapper">
          <Logo />
        </div>
        <Signupform />
        <div className="signIn-layer">
        <div className="signIn-btn-wrapperr">
          <LoginInBtn buttonText="SignUp" />
          <span className="text-for-logn">Or sign in with other accounts?</span>
          <div className="social-icon-wrapper">{<SocialIcon />}</div>
          <div className="bottom-text-wrapper">
            <p className="text-for-logn">
              Already have an account?{" "}
              <span className="sign-text"> Sign In</span>{" "}
            </p>
          </div>
          </div>
        </div>
      </div>
      <div className="right-area md:col-span-1">{<RightElipse2 />}</div>
    </div>
  );
};

export default Signup;
