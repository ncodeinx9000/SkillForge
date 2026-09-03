import { GoDash } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaRegMessage } from "react-icons/fa6";
import mentorImage1 from "../../assets/mentor_image_1.jpg"
function LearnerMentorCard() {
  return (
    <div className="bg-[#fff] px-6 py-6 rounded-2xl mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3 font-DM-Sans mb-2">
          <img src={mentorImage1} alt="image" className="w-15 h-15 object-cover rounded-2xl"/>
          <div>
            <p className="text-[15px] font-semibold">Rajan Pillai</p>
            <p className="text-[13px] text-gray-600">Food Business Coach</p>
            <div className="flex items-center gap-0.5 text-[12px] text-[#c4622a]">
              <FaStar className="" />
              <p>4.8</p>
            </div>
          </div>
        </div>

        <div className="text-[10px] font-DM-Sans font-semibold ">
          <p className="text-orange-800 bg-orange-100 px-2 py-0.5 rounded-2xl mb-1">
            Top Mentor
          </p>
          <p className="text-green-800 text-center bg-green-100 px-0.5 py-0.5 rounded-2xl">
            Available
          </p>
        </div>
      </div>

      <p className="text-[12px] font-DM-Sans text-gray-600 mb-2">
        15+ years in fashion industry. Built a boutique chain from a single
        sewing machine in Jaipur.
      </p>

      <ul className="flex items-center gap-3 text-[10px] font-DM-Sans text-gray-600 font-semibold mb-3">
        <li className="bg-[#d4cec0] px-1.5 py-0.5 rounded-2xl">Tailoring</li>
        <li className="bg-[#d4cec0] px-1.5 py-0.5 rounded-2xl">Women Entrepreneurship</li>
        <li className="bg-[#d4cec0] px-1.5 py-0.5 rounded-2xl">Export</li>
      </ul>

     <hr className="h-px my-4 bg-gray-200 border-0" />

     <div className="flex items-center justify-between px-3 py-2 mb-3">
        <div className="flex flex-col items-center">
          <p className="text-[15px] font-DM-Sans font-bold">87</p>
          <p className="text-[11px] text-gray-600">Mentees</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[15px] font-DM-Sans font-bold">214</p>
          <p className="text-[11px] text-gray-600">Sessions</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[15px] font-DM-Sans font-bold">4.9</p>
          <p className="text-[11px] text-gray-600">Rating</p>
        </div>

         <div className="flex flex-col items-center">
          <p className="text-[15px] font-DM-Sans font-bold">15yr</p>
          <p className="text-[11px] text-gray-600">Rating</p>
        </div>
      </div>


      <div className="bg-[#1e3a1e] flex items-center justify-center gap-1 text-white text-[13px] font-DM-Sans font-semibold py-1.5 rounded-2xl">
        <FaRegMessage />
        <p>Message</p>
      </div>
    </div>
  );
}

export default LearnerMentorCard;
