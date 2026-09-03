import { GoDash } from "react-icons/go";
import { BsDot } from "react-icons/bs";
import { GoClock } from "react-icons/go";

function WelcomeCard(){
    return(
        <div className="bg-white lg:ml-70 lg:mr-60 px-5 py-5 mx-6 my- rounded-2xl border border-gray-300 mt-23 ">
        <div className="flex items-center gap-2 text-[11px] font-DM-Sans tracking-wide text-[#c4622a] font-semibold mb-1">
          <GoDash />
          <p>MY ROADMAP</p>
        </div>
        <div className="flex justify-between items-end mb-5">
          <div>
            <h3 className="text-xl font-Outfit font-extrabold ">
              Home Tiffin Service
            </h3>
            <p className="flex items-center font-DM-Sans text-[12px] text-gray-600">
              Food & Catering{" "}
              <span>
                <BsDot />
              </span>{" "}
              Beginner
            </p>
          </div>
          <div>
            <p className="text-[30px] font-Outfit font-extrabold">45%</p>
            <p className="text-[12px] font-DM-Sans text-gray-600">complete</p>
          </div>
        </div>
        <div className="bg-[#c4622a] w-[100%] p-1 rounded-2xl mb-1.5"></div>
        <div className="flex items-center justify-between text-[12px] text-gray-500 font-DM-Sans mb-4">
            <p className=" ">9/20 tasks done</p>
            <p className="flex items-center gap-1 "> <span><GoClock /></span>2–4 weeks remaining</p>
        </div>

        <div className="flex items-center justify-between">
            <div className="flex flex-col justify-center items-center bg-[#e8e4da] w-[32%] rounded-2xl py-2.5"> 
                <p className="text-[14px] font-Outfit font-bold">5</p>
                <p className="text-[11px] font-DM-Sans text-gray-500">Steps</p>
            </div>
            <div className="flex flex-col justify-center items-center bg-[#e8e4da] w-[32%] rounded-2xl py-2.5">
                <p className="text-[14px] font-Outfit font-bold">Rs.15,000–40,000/month</p>
                <p className="text-[11px] font-DM-Sans text-gray-500">Est. income</p>
            </div>
            <div className="flex flex-col justify-center items-center bg-[#e8e4da] w-[32%] rounded-2xl py-2.5">
                <p className="text-[14px] font-Outfit font-bold">Rs.5,000–15,000</p>
                <p className="text-[11px] font-DM-Sans text-gray-500">Investment</p>
            </div>
        </div>
        
      </div>
    )
}

export default WelcomeCard;