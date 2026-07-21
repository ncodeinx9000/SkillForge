const ProgressBar = ({ currentStep, totalStep }) => {
  return (
    <div className="flex gap-2">
      {[...Array(totalStep)].map((_, index) => (
        <div
          key={index}
          className={`h-1.5 flex-1 rounded-full transiton-all duration-300 ${index < currentStep ? "bg-[#D97748]" : "bg-[#DDD6C3]"}`}
        ></div>
      ))}
    </div>
  );
};

export default ProgressBar;
