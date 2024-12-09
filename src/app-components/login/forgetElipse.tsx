import Image from "next/image";
import forgetElipseImage from "../../../public/login-form-image/Ellipse 1 (1).png";
import ForgetElipseImage from "./forgetElipseImage";

const ForgetElipseComponent = () => {
  return (
    <div className="forget-wrapper-elipse">
      <div className="forget-ellipse-containerr">
        <Image src={forgetElipseImage} alt="Logo" className="forget-elipse-imgg" />
      </div>
      <ForgetElipseImage />
    </div>
  );
};

export default ForgetElipseComponent;
