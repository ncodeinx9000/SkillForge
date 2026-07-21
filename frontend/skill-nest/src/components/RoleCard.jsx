function RoleCard({
  icon: Icon,
  iconBgColor,
  iconTextColor,
  role,
  description,
}) {
  return (
    <div className="bg-[#fff] px-6 py-6 rounded-2xl">
      <div
        className={`${iconBgColor} text-[15px] w-10 px-3 py-3 rounded-xl mb-3`}
      >
        <Icon className={`${iconTextColor}`} />
      </div>
      <p className="font-Outfit font-extrabold text-[16px] mb-2">{role}</p>
      <p className="text-[13px] w-50 text-gray-500">{description}</p>
    </div>
  );
}

export default RoleCard;
