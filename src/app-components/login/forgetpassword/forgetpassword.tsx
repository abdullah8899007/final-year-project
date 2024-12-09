import LogoReset from "../../../app/common-components/Common-Login-Comp/logoReset";
import ForgetElipseComponent from "../forgetElipse";
import LoginInBtn from "../../../app/common-components/Common-Login-Comp/LoginBtn";
import "../Login.css";

const ForgetPassword = () => {
  return (
    <div className="forget-wrapperr-layer grid md:grid-cols-2">
      <div className="left-area-forget-layer md:col-span-1 reset-wrapper">
        <div className="image-logo-wrapper-layer">
          <div className="image-logo-wrapperr">
            <div className="image-logo-wrapper-container">
              <LogoReset />
              <h1 className="logo-reset">
                <span className="logo-reset-layer">Reset Password</span> </h1>
              <div className="logo-para-layer">
                <p className="logo-par">
                  Enter your email address and ll send you an email
                  with instructions to reset your password.
                </p>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="form-wrapper-reset">
            <div className="reset-wrapper-container">
              <div className="w-full">
                <form className="bg-white rounded px-8 main-form">
                  <div className="mb-4">
                    <label
                      htmlFor="username"
                      className="block text-gray-700 text-sm font-bold mb-2 label-email reset-email"
                    >
                      Email
                    </label>
                    <input
                      id="reset-username"
                      type="text"
                      className="bg-gray-200 border border-gray-700 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="signIn-resetbtn-wrapper">
            <LoginInBtn buttonText="Reset" />
          </div>
        </div>

      </div>
      <div className="right-area-forget md:col-span-1">
        <ForgetElipseComponent />
      </div>
    </div>
  );
};

export default ForgetPassword;
