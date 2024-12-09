import Image from "next/image";
import logoImage from "../../../../public/login-form-image/logo.png";
// import "./login.css";

const Logo: React.FC = () => {
  return (
    <>
      <div className="logo-wrapper logo-wrapper-signup">
        <Image src={logoImage} alt="Logo" className="logo-image" />
      </div>
      <div className="title-wrapper-logg">
        <h1 className="logo-titlee">Sign In</h1>
        <span className="logo-title-text">Sign in to stay connected. </span>
      </div>
    </>
  );
};

export default Logo;
