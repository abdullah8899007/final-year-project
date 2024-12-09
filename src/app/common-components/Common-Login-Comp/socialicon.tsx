import Image from "next/image";
import facebookicon from "../../../../public/login-form-image/icons8-facebook-circled-48.png";
import googleicon from "../../../../public/login-form-image/icons8-google-48.png";
import appleicon from "../../../../public/login-form-image/Apple.png";

const SocialIcon = () => {
  return (
    <div className="icons-wrapper">
      <Image
        src={facebookicon}
        alt="Logo"
        className="facebook-icon-image icon"
      />
      <Image src={googleicon} alt="Logo" className="facebook-icon-image icon" />
      <Image src={appleicon} alt="Logo" className="google-icon-image icon" />
    </div>
  );
};

export default SocialIcon;
