import Image from "next/image";
import image1 from "../../../public/login-form-image/image 3.png";
import image2 from "../../../public/login-form-image/image 2 (1).png";
import image3 from "../../../public/login-form-image/image 6.png";
import image4 from "../../../public/login-form-image/image 5 (1).png";
import image5 from "../../../public/login-form-image/image 4 (2).png";
import image7 from "../../../public/login-form-image/image 3.png";
const ForgetElipseImage = () => {
  return (
    <div className="forget-image-wrapper flex flex-row">
        <Image src={image1} alt="loading-imagee" className="img1" id="image1-wrapper" />
      <Image src={image2} alt="loading-imagee" className="img2" />
      <Image src={image4} alt="loading-imagee" className="img3" />
      <Image src={image3} alt="loading-imagee" className="img4" />
      <Image src={image4} alt="loading-imagee" className="img5" />
      <Image src={image5} alt="loading-imagee" className="img6" />
      <Image src={image7} alt="loading-imagee" className="img7" />
    </div>
  );
};

export default ForgetElipseImage;
