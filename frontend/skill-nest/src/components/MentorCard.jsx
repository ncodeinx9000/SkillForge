import { IoLocationOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";

function MentorCard({
  name,
  speciality,
  location,
  skill1,
  skill2,
  mentees,
  sessions,
  rating,
}) {
  return (
    <div className="bg-[#fff] px-6 py-3 rounded-2xl transition-all duration-400 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between border-b border-b-gray-300 py-4">
        <div className="font-DM-Sans">
          <img src="" alt="" />
          <div className="bg-orange-200 w-8 px-2 py-1 rounded-xl mb-2">
            <FaRegUser className="text-orange-500" />
          </div>
          <p className="text-[15px] font-semibold">{name}</p>
          <p className="text-[13px] text-gray-500">{speciality}</p>
          <p className="flex items-center gap-1 text-[12px] text-gray-400 mb-3">
            <IoLocationOutline />
            <span>{location}</span>
          </p>

          <span className="bg-gray-300 text-gray-700 w-18 px-3 text-[12px] font-DM-Sans rounded-xl mr-2">
            {skill1}
          </span>
          <span className="bg-gray-300 text-gray-700 w-18 px-3 text-[12px] font-DM-Sans rounded-xl">
            {skill2}
          </span>
        </div>
        <div className="text-[10px] bg-green-200 text-green-900 px-2 py-0.5 font-semibold rounded-xl">
          Top Mentor
        </div>
      </div>
      <div className="flex items-center justify-between px-3 py-2 mb-3">
        <div className="flex flex-col items-center">
          <p className="text-[15px] font-DM-Sans font-bold">{mentees}</p>
          <p className="text-[11px] text-gray-600">Mentees</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[15px] font-DM-Sans font-bold">{sessions}</p>
          <p className="text-[11px] text-gray-600">Sessions</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[15px] font-DM-Sans font-bold">{rating}</p>
          <p className="text-[11px] text-gray-600">Rating</p>
        </div>
      </div>
      <button className="w-full text-[13px] text-white bg-green-900  py-1.5 rounded-2xl font-bold font-DM-Sans mb-4">
        Book a Session
      </button>
    </div>
  );
}

export default MentorCard;
