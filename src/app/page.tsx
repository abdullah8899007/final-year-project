import Login from "../app-components/login/login/index";
// import Signup from "../app-components/login/signup/index";
// import ForgetPassword from "../app-components/login/forgetpassword/forgetpassword";
import "../app-components/login/login.css";
export default function Home() {
  return (
    <div>
      <div style={{ backgroundColor: "white" }}>
        <Login />
      </div>
      <div style={{ backgroundColor: "white" }}>
        {/* <Signup /> */}
      </div>
      <div style={{ backgroundColor: "white" }}>
        {/* <ForgetPassword /> */}
      </div>
    </div>
  );
}

