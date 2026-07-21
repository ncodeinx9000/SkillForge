import { BsArrowRight } from "react-icons/bs";

function BusinessIdeaCard({
  icon: Icon,
  iconBgColor,
  iconTextColor,
  name,
  description,
  para,
}) {
  return (
    <div className="lg:w-1/4 bg-[#fff] px-5 rounded-2xl">
      <div className="mb-4 border-b border-b-gray-300 py-6 px-4">
        <div className={`${iconBgColor} w-10 py-3 px-3 rounded-xl mb-2`}>
          <Icon className={`${iconTextColor}`} />
        </div>
        <p className="font-DM-Sans text-gray-700 text-[14px] mb-1">{name}</p>
        <p className="font-DM-Sans text-[15px] font-semibold mb-2">
          {description}
        </p>
        <p className="text-[12px] text-gray-600">{para}</p>
      </div>
      <div className="flex items-center justify-between px-4 mb-4">
        <p
          className={`text-[11px] font-DM-Sans font-semibold ${iconBgColor} ${iconTextColor} py-1 px-2 rounded-xl`}
        >
          Beginner
        </p>
        <a
          href=""
          className="flex items-center gap-1 text-sm font-DM-Sans text-[#c4622a] text-[13px] font-semibold"
        >
          View Raodmap <BsArrowRight />
        </a>
      </div>
    </div>
  );
}

export default BusinessIdeaCard;
