"use client";
import Image from "next/image";
import LoginInBtn from "../../app/common-components/Common-Login-Comp/LoginBtn";
import { useRouter } from "next/navigation";
import googleicon from "../../../public/login-form-image/icons8-google-48.png";
import "./login.css";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/utils/firebase";
import { loginCustomer } from "@/api/customer-api";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const Loginform = ({ signup }) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
  });

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result: any) => {
        console.log("Result", result);
      })
      .catch((error: any) => {
        console.log("Error", error);
      });
  };

  const handleFormSubmit = async (data: any) => {
    try {
      const response = await loginCustomer(data);
      if (response?.token) {
        localStorage.setItem("authToken", response.token);
        router.push("/dashboard");
      } else {
        console.error(
          "Error: ",
          response?.data?.message || "Invalid response format"
        );
        alert("Invalid login credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      <div className="form-wrapper">
        <div className="w-full">
          {/*____________________________  Login page form start  ____________________________  */}
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="bg-white rounded px-8  main-form"
          >
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
              <label
                htmlFor="username1"
                className="block text-gray-700 text-sm font-bold mb-2 label-email reset-email"
              >
                Email
              </label>
              <input
                id="email"
                {...register("email")}
                type="text"
                className="bg-gray-200 border border-gray-700 w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sign-up-input"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="username2"
                className="block text-gray-700 text-sm font-bold mb-2 label-email reset-email"
              >
                Password
              </label>
              <input
                id="password"
                {...register("password")}
                type="password"
                className="bg-gray-200 border border-gray-700 w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sign-up-input"
              />
            </div>
          </form>
          {/*____________________________  Login page form end  ____________________________  */}

          {/*____________________________  Login page forgetpassword Area start ____________________________  */}
          {/* <div className="forget-containerr">
            <div className="checkbox-wrapper">
              {" "}
              <input type="checkbox" className="checkboxx" /> <span className="rem-checkbox"> Remember me</span>
            </div>
            <div className="forget-wrapperr">Forget Password?</div>
          </div> */}
          {/*____________________________  Login page forgetpassword Area end ____________________________  */}

          {/*____________________________  Login page signInbtn Area start ____________________________  */}
          <div className="signIn-btn-container">
            <button
              className="hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
              type="button"
              onClick={handleSubmit(handleFormSubmit)}
              id="signin-btn"
            >
              {signup ? "signup" : "Login"}
            </button>{" "}
            <span className="text-for-logn ml-10">
              Or sign in with other accounts?
            </span>
          </div>
          <div className="social-icon-wrapper">
            {
              <button onClick={handleGoogleLogin}>
                <Image
                  src={googleicon}
                  alt="Logo"
                  className="google-icon-image icon"
                />
              </button>
            }
          </div>
          <div className="bottom-text-wrapper">
            <span className="text-for-logn">Dont Have an accounts?</span>{" "}
            <button
              className="click-sign-upp"
              onClick={() => router.push("/signup")}
            >
              Click here to sign up
            </button>
          </div>
          {/*____________________________  Login page signInbtn Area end ____________________________  */}
        </div>
      </div>
    </div>
  );
};
export default Loginform;
