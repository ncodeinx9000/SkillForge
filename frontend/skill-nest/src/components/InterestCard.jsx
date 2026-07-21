function InterestCard({ icon: Icon, iconBgColor, iconTextColor, name }) {
  return (
    <div className="bg-white rounded-xl px-4 py-5 ">
      <div className={` ${iconBgColor} w-11 rounded-2xl px-3.5 py-3 mb-3`}>
        <Icon className={`${iconTextColor}`} />
      </div>
      <p className="font-DM-Sans text-sm font-semibold">{name}</p>
      <a href="" className="text-sm text-gray-600">
        View ideas
      </a>
    </div>
  );
}

export default InterestCard;
