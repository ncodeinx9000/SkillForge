import { GoDash } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaRegMessage } from "react-icons/fa6";

function MentorCard(){
    return(
        <div className="bg-[#fff] px-6 py-6 rounded-2xl mb-4">
                      <div className="flex gap-1.5 items-center font-DM-Sans font-semibold text-[11px] text-[#c4622a] mb-2">
                        <GoDash />
                        <p>MY MENTOR</p>
                      </div>
                      <div className="flex items-center gap-3 font-DM-Sans mb-2">
                        <img src="" alt="image" />
                        <div>
                          <p className="text-[15px] font-semibold">Rajan Pillai</p>
                          <p className="text-[13px] text-gray-600">
                            Food Business Coach
                          </p>
                          <div className="flex items-center gap-0.5 text-[12px] text-[#c4622a]">
                            <FaStar className="" />
                            <p>4.8</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#eae3d29d] flex items-center justify-between  px-3 py-1.5 rounded-2xl mb-2">
                        <div className="flex gap-2 items-center text-[13px]">
                          <SlCalender className="text-[#c4622a]" />
                          <p className="text-gray-600">Next session:</p>
                        </div>
                        <div className="text-[13px] font-semibold">Thu 10 AM</div>
                      </div>
                      <div className="bg-[#f8ede7d1] font-DM-Sans px-3 py-2 mb-2">
                        <p className="text-[11px] font-semibold">Latest feedback</p>
                        <p className="text-[13px] italic text-gray-600">
                          "Focus on FSSAI registration this week before anything else."
                        </p>
                      </div>
                      <div className="bg-[#1e3a1e] flex items-center justify-center gap-1 text-white text-[13px] font-DM-Sans font-semibold py-1.5 rounded-2xl">
                        <FaRegMessage />
                        <p>Message</p>
                      </div>
                    </div>
    )
}

export default MentorCard;