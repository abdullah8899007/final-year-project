import Image from "next/image";
import ElipseImage from "../../../public/login-form-image/Ellipse 1.png";
import OverlayFoodImage from "../../../public/login-form-image/image1.png";
import "./login.css";

const RightElipse = () => {
  return (
    <>
      <Image src={ElipseImage} alt="elipse" className="Elipse-image-login-signupp" />
      <Image
        src={OverlayFoodImage}
        alt="overlay loading"
        className="overlay-food-imgg"
      />
    </>
  );
};

export default RightElipse;
