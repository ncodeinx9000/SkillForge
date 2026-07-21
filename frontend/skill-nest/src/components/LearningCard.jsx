import { FaRegClock } from "react-icons/fa";

function LearningCard({
  icon: Icon,
  iconBgColor,
  iconTextColor,
  fileName,
  topics,
  duration,
}) {
  return (
    <div className="bg-[#fff] px-6 py-6 rounded-2xl">
      <div className={`${iconBgColor} w-10 mb-3 px-3 py-2 rounded-xl`}>
        <Icon className={`font-extrabold ${iconTextColor}`} />
      </div>
      <p className="text-[11px] text-gray-600  tracking-wide font-DM-Sans font-semibold">
        {fileName}
      </p>
      <p className="mb-3 text-[14px] font-DM-Sans font-semibold">{topics}</p>
      <p className="flex items-center gap-1 text-[13px] text-gray-500">
        <span>
          <FaRegClock />
        </span>
        <p>{duration}</p>
      </p>
    </div>
  );
}

export default LearningCard;
