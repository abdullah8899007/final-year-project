"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/utils/firebase";
import { SignUpApi } from "@/api/customer-api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import googleIcon from "../../public/login-form-image/icons8-google-48.png";

const loginFormSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  password2: z.string().min(6, "Confirm password is required"),
  mobileNumber: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
}).refine((data) => data.password === data.password2, {
  message: "Passwords do not match",
  path: ["password2"], // Path of the error
});

type LoginForm = z.infer<typeof loginFormSchema>;

const Signup = ({ signup }: { signup?: boolean }) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
  });

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google Login Successful:", result);
      router.push("/dashboard"); // Redirect after successful login
    } catch (error) {
      console.error("Google Login Failed:", error);
      alert("Google login failed. Please try again.");
    }
  };

  // Form Submit Handler
  const handleFormSubmit = async (data: LoginForm) => {
    try {
      console.log("Form Data Submitted:", data);

      const payload = {
        email: data.email.trim(),
        password: data.password,
        password2: data.password2,
        phone: data.mobileNumber.trim(),
      };

      const response = await SignUpApi(payload);

      if (response?.token) {
        localStorage.setItem("authToken", response.token);
        router.push("/dashboard");
      } else {
        alert(response?.message || "Unable to sign up. Please try again.");
      }
    } catch (error: any) {
      console.error("Sign-up Error:", error.message || error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="w-full">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="bg-white rounded px-8 main-form"
        >
          <div className="w-full px-3 mb-6">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              id="email"
              {...register("email")}
              type="email"
              className="bg-gray-200 border border-gray-700 w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sign-up-input"
              />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
               <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                {...register("password")}
                type="password"
                className="bg-gray-200 border border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sign-up-input"
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password.message}
                </p>
              )}
            </div>

          {/* Confirm Password Field */}
          <div className="w-full px-3 mb-6">
            <label htmlFor="password2" className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              id="password2"
              {...register("password2")}
              type="password"
              className="bg-gray-200 border border-gray-700 w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sign-up-input"
              />
            {errors.password2 && (
              <p className="text-red-500 text-xs italic">{errors.password2.message}</p>
            )}
          </div>

          {/* Mobile Number Field */}
          <div className="w-full px-3 mb-6">
            <label htmlFor="mobileNumber" className="block text-gray-700 text-sm font-bold mb-2">
              Mobile Number
            </label>
            <input
              id="mobileNumber"
              {...register("mobileNumber")}
              type="text"
              className="bg-gray-200 border border-gray-700 w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sign-up-input"
              />
            {errors.mobileNumber && (
              <p className="text-red-500 text-xs italic">{errors.mobileNumber.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="signIn-btn-container">
            <button
              type="submit"
              className="hover:bg-orange-800 bg-orange-500 text-white font-bold py-3 px-8 rounded-full focus:outline-none transition duration-200"
              >
              {signup ? "Signup" : "Login"}
            </button>
            <span className="text-for-logn ml-10">Or sign in with other accounts?</span>
          </div>

          {/* Google Login Button */}
          <div className="social-icon-wrapper">
            <button type="button" onClick={handleGoogleLogin}>
              <Image src={googleIcon} alt="Google Login" className="google-icon-image icon" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

