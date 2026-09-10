import { GoDash } from "react-icons/go";
import { BsDot } from "react-icons/bs";
import { GoClock } from "react-icons/go";

function WelcomeCard({
  businessIdea,
  roadmap,
  roadmapProgress = 0,
  completedTasks = 0,
}) {
  const totalTasks =
    roadmap?.steps?.reduce(
      (total, step) =>
        total + (step.tasks?.length || 0),
      0
    ) || 0;

  const totalSteps =
    roadmap?.steps?.length || 0;

  const progress =
    typeof roadmapProgress === "number"
      ? roadmapProgress
      : 0;

  return (
    <div className="w-full bg-white px-5 sm:px-6 py-5 rounded-2xl border border-gray-300 shadow-sm">

      {/* Label */}
      <div className="flex items-center gap-2 text-[11px] font-DM-Sans tracking-wide text-[#c4622a] font-semibold mb-2">
        <GoDash />
        <p>MY ROADMAP</p>
      </div>

      {/* Title + Progress */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-5">

        <div>
          <h3 className="text-xl sm:text-2xl font-Outfit font-extrabold">
            {roadmap?.title ||
              businessIdea?.title ||
              "My Roadmap"}
          </h3>

          <p className="flex items-center flex-wrap font-DM-Sans text-[12px] text-gray-600">
            {roadmap?.category ||
              businessIdea?.category?.[0] ||
              "Business"}

            <span>
              <BsDot />
            </span>

            {roadmap?.level ||
              businessIdea?.difficulty ||
              "Beginner"}
          </p>
        </div>

        <div className="sm:text-right">
          <p className="text-[30px] font-Outfit font-extrabold">
            {progress}%
          </p>

          <p className="text-[12px] font-DM-Sans text-gray-600">
            complete
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-[#c4622a] rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      {/* Progress information */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[12px] text-gray-500 font-DM-Sans mb-4">

        <p>
          {completedTasks}/{totalTasks} tasks done
        </p>

        <p className="flex items-center gap-1">
          <GoClock />

          {roadmap?.estimatedDuration ||
            "Duration not specified"}
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

        {/* Steps */}
        <div className="flex flex-col justify-center items-center bg-[#e8e4da] rounded-2xl py-3">
          <p className="text-[14px] font-Outfit font-bold">
            {totalSteps}
          </p>

          <p className="text-[11px] font-DM-Sans text-gray-500">
            Steps
          </p>
        </div>

        {/* Income */}
        <div className="flex flex-col justify-center items-center bg-[#e8e4da] rounded-2xl py-3 text-center">
          <p className="text-[14px] font-Outfit font-bold">
            {roadmap?.estimatedIncome ||
              "Not specified"}
          </p>

          <p className="text-[11px] font-DM-Sans text-gray-500">
            Est. income
          </p>
        </div>

        {/* Investment */}
        <div className="flex flex-col justify-center items-center bg-[#e8e4da] rounded-2xl py-3 text-center">
          <p className="text-[14px] font-Outfit font-bold">
            {roadmap?.investmentRange ||
              `${businessIdea?.investment?.min
                ? `₹${businessIdea.investment.min}`
                : ""} - ${
                  businessIdea?.investment?.max
                    ? `₹${businessIdea.investment.max}`
                    : ""
                }`}
          </p>

          <p className="text-[11px] font-DM-Sans text-gray-500">
            Investment
          </p>
        </div>

      </div>
    </div>
  );
}

export default WelcomeCard;