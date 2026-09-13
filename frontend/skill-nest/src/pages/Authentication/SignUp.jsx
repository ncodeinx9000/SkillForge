import { IoIosArrowRoundBack } from "react-icons/io";
import { PiPlantThin } from "react-icons/pi";
import { FiUser } from "react-icons/fi";
import { PiBag } from "react-icons/pi";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { GoLock } from "react-icons/go";
import { BsArrowRightShort } from "react-icons/bs";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";
import bgImage from "../../assets/bg-image.jpg"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/userSlice";

function SignUp() {

  const [selectedRole, setSelectedRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setCOnfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      if(password !== confirmPassword){
        alert("Passwords do not match");
        return;
      }

      const res = await api.post("/auth/register",
        {
          name: fullName,
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      console.log(res.data);

      // Store user in Redux
      dispatch(loginSuccess(res.data.user));

      // Navigate according to role
      if(res.data.user.role === "learner"){
        navigate("/onboarding");
      } else if(res.data.user.role === "mentor"){
        navigate("/mentor");
      } else if(res.data.user.role === "admin"){
        navigate("/admin");
      }
      
    } catch (error) {
      console.error("Signup error:", error);

      alert(
        error.response?.data?.message || "Registration failed"
      )
    }
  };

  return (
    <div className=" min-h-screen flex">
      <div className="w-full lg:w-[42%] bg-[#f5f2eb] flex flex-col justify-between px-6 py-6">
        <a
          onClick={() => navigate("/")}
          className="flex items-center gap-1 px-10 py-4 text-[15px] font-DM-Sans text-gray-500 font-bold cursor-pointer"
        >
          <IoIosArrowRoundBack /> Back to home
        </a>
        <div className="max-w-2xl px-20 py-7">
          <div className="flex items-center gap-3 mb-5">
            <PiPlantThin className="bg-primary text-white p-2 w-9 h-9 rounded-2xl" />
            <div>
              <h5 className="text-[15px] font-Outfit font-extrabold tracking-wide">
                EntreSkill Hub
              </h5>
              <p className="text-[11px] tracking-wide font-DM-Sans text-gray-500">
                SKILL-TO-STARUP PLATFORM
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-[34px] font-Outfit font-extrabold tracking-wide">
              Welcome back.
            </h2>
            <p className="text-[14px] font-DM-Sans text-gray-500 mb-6">
              Sign in to continue your entrepreneurship journey.
            </p>
          </div>
          <p className="text-[13px] font-DM-Sans text-gray-600 tracking-wide font-semibold mb-3">
            SIGN IN AS
          </p>
          <div className="flex gap-2 items-center text-[14px] font-DM-Sans font-semibold text-gray-900 mb-4">
            <div
              onClick={() => setSelectedRole("learner")}
              className={`border-2 px-3 py-2 w-34 rounded-2xl ${selectedRole === "learner" ? "border-black" : "border-gray-400"}`}
            >
              <FiUser />
              <p>Learner</p>
            </div>
            <div
              onClick={() => setSelectedRole("mentor")}
              className={`border-2   px-3 py-2 w-34 rounded-2xl ${selectedRole === "mentor" ? "border-black" : "border-gray-400"}`}
            >
              <PiBag />
              <p>Mentor</p>
            </div>
            <div
              onClick={() => setSelectedRole("admin")}
              className={`border-2  px-3 py-2 w-34 rounded-2xl ${selectedRole === "admin" ? "border-black" : "border-gray-400"}`}
            >
              <HiOutlineSquares2X2 />
              <p>Admin</p>
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <label
              htmlFor=""
              className="text-[13px] font-DM-Sans text-gray-600 tracking-wide font-semibold mb-3"
            >
              FULL NAME
            </label>
            <div className="border border-black w-105 px-3 py-2 rounded-2xl">
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                className="w-96 border-none outline-none "
                placeholder="Enter Your Full Name"
              />
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <label
              htmlFor=""
              className="text-[13px] font-DM-Sans text-gray-600 tracking-wide font-semibold mb-3"
            >
              EMAIL
            </label>
            <div className="flex items-center gap-2 border border-black w-105 px-3 py-2 rounded-2xl">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                className="w-96 border-none outline-none "
                placeholder=" you@example.com"
              />
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <div className="flex items-center w-105 justify-between mb-2">
              <label
                htmlFor=""
                className="text-[13px] font-DM-Sans text-gray-600 tracking-wide font-semibold"
              >
                PASSWORD
              </label>
            </div>

            <div className="flex items-center gap-2 border border-black w-105 px-3 py-2 rounded-2xl">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                className="w-96 border-none outline-none"
                placeholder=" Enter password"
              />
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <div className="flex items-center w-105 justify-between mb-2">
              <label
                htmlFor=""
                className="text-[13px] font-DM-Sans text-gray-600 tracking-wide font-semibold"
              >
                CONFIRM PASSWORD
              </label>
            </div>

            <div className="flex items-center gap-2 border border-black w-105 px-3 py-2 rounded-2xl">
              <input
                onChange={(e) => setCOnfirmPassword(e.target.value)}
                value={confirmPassword}
                type="password"
                className="w-96 border-none outline-none"
                placeholder="Enter your confirm password"
              />
            </div>
          </div>
          <div
            onClick={handleSignUp}
            className="flex items-center justify-center gap-1 w-105 text-white font-DM-Sans font-semibold bg-[#c4622a] rounded-2xl py-2 mb-6"
          >
            <p>Sign Up</p>
            <BsArrowRightShort />
          </div>
          <div className="flex items-center justify-center gap-1 w-105">
            <span className="text-[14px] font-DM-Sans text-gray-600">
              Already have an account?
            </span>
            <a
              onClick={() => navigate("/login")}
              className="text-[#c4622a] text-[16px] font-DM-Sans font-semibold cursor-pointer"
            >
              Login
            </a>
          </div>
        </div>
        <div className="flex gap-9 text-[13.5px] px-10 py-4 font-DM-Sans text-gray-500  ">
          <p className="flex items-center gap-1">
            <RiSecurePaymentLine />
            <span>SSL Secured</span>
          </p>
          <p className="flex items-center gap-1">
            <GoLock /> <p>Role-Based Access</p>
          </p>
        </div>
      </div>
      <div className="hidden lg:block w-[58%] relative overflow-hidden">
        <img
          src={bgImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#143d1f] via-[#1f5a2d]/90 to-[#2e7d32]/70"></div>

        <div className="absolute inset-0 flex flex-col  px-12 py-9">
          <div className="bg-[#e0936629] px-2 py-1 rounded-full flex items-center w-71 text-[13px] font-Outfit font-semibold  mb-6">
            <PiPlantThin className="text-[#c4622a] p-2 w-8 h-7 " />
            <p className="text-[#c4622a]">SBA UNIFIED MENTOR PROGRAMME</p>
          </div>
          <h1 className="w-90 text-5xl font-Outfit text-[10xl] font-extrabold mb-6">
            <span className="text-white">Every great business starts </span>
            <span className="text-[#c4622a]">with a skill.</span>
          </h1>
          <p className="text-[#f5f2eb8d] font-Outfit w-81 mb-6">
            Structured roadmaps. Verified mentors. Step-by-step guidance for
            micro-entrepreneurs across India.
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-2 w-200 mb-8">
            <div className="bg-[#ffffff] border border-gray-400 px-2 py-1 text-[13px] font-DM-Sans font-semibold rounded-full">
              Tailoring & Fashion
            </div>
            <div className="bg-[#ffffff] border border-gray-400 px-2 py-1 text-[13px] font-DM-Sans font-semibold rounded-full">
              Food & Catering
            </div>
            <div className="bg-[#ffffff] border border-gray-400 px-2 py-1 text-[13px] font-DM-Sans font-semibold rounded-full">
              Handicrafts & Art
            </div>
            <div className="bg-[#ffffff] border border-gray-400 px-2 py-1 text-[13px] font-DM-Sans font-semibold rounded-full">
              Digital & Tech
            </div>
            <div className="bg-[#ffffff] border border-gray-400 px-2 py-1 text-[13px] font-DM-Sans font-semibold rounded-full">
              Repair Services
            </div>
            <div className="bg-[#ffffff] border border-gray-400 px-2 py-1 text-[13px] font-DM-Sans font-semibold rounded-full">
              Retail & Trading
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-[#c4622a] text-white text-sm font-semibold px-8 py-3 rounded-xl font-DM-Sans hover:bg-[#e4864f] transition-colors">
              Discover My Business <FaArrowRightLong />
            </button>

            <button className="font-DM-Sans text-sm font-semibold px-6 py-3 bg-[#ffffff] border border-gray-500 rounded-xl">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
