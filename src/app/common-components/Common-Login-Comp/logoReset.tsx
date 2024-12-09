import Image from "next/image";
import logoImage from "../../../../public/login-form-image/logo.png";

const LogoReset: React.FC = () => {
  return (
    <>
      <div className="logo-wrapper-reset">
        <Image src={logoImage} alt="Logo" className="logo-image-reset" />
      </div>
    </>
  );
};

export default LogoReset;
