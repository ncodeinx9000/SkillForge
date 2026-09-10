function formatRange(min, max) {
  if (min == null || max == null) {
    return "Not specified";
  }

  return `₹${min.toLocaleString("en-IN")} – ₹${max.toLocaleString(
    "en-IN"
  )}`;
}

function BusinessIdeaCard({
  img,
  title,
  category,
  description,
  investment,
  estimatedIncome,
  matchScore,
  difficulty,
  idea,
  onSelect,
  selecting,
}) {
  // Prefer values coming from idea.
  // Fallback to props so your existing parent code still works.
  const businessTitle = idea?.title || title || "Untitled Business Idea";

  const businessCategory =
    idea?.category?.length > 0
      ? idea.category.join(" • ")
      : category || "Business";

  const businessDescription =
    idea?.description || description || "No description available.";

  const businessImage = idea?.image || img;

  const businessInvestment =
    idea?.investment || investment || {};

  const businessIncome =
    idea?.estimatedIncome || estimatedIncome || {};

  const businessMatchScore =
    idea?.personalizedMatchScore ??
    idea?.matchScore ??
    matchScore ??
    0;

  const businessDifficulty =
    idea?.difficulty || difficulty || "Beginner";

  const businessIdeaId = idea?._id;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition">

      {/* Image */}
      {businessImage ? (
        <img
          src={businessImage}
          alt={businessTitle}
          className="w-full h-44 object-cover"
        />
      ) : (
        <div className="w-full h-44 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-sm">
            Business Idea
          </span>
        </div>
      )}

      {/* Content */}
      <div className="p-4">

        {/* Category */}
        <p className="text-[10.5px] font-DM-Sans text-gray-500 mb-1">
          {businessCategory}
        </p>

        {/* Title */}
        <h3 className="text-[15px] font-DM-Sans font-semibold mb-2">
          {businessTitle}
        </h3>

        {/* Description */}
        <p className="font-DM-Sans text-[11.5px] text-gray-600 mb-4 line-clamp-3">
          {businessDescription}
        </p>

        {/* Investment */}
        <div className="flex items-center justify-between text-[11.5px] text-gray-600 mb-2">
          <span>Investment</span>

          <span className="font-medium">
            {formatRange(
              businessInvestment.min,
              businessInvestment.max
            )}
          </span>
        </div>

        {/* Estimated Income */}
        <div className="flex items-center justify-between text-[11.5px] text-gray-600 mb-2">
          <span>Est. income</span>

          <span className="font-medium">
            {formatRange(
              businessIncome.min,
              businessIncome.max
            )}

            {businessIncome.min != null &&
            businessIncome.max != null
              ? "/month"
              : ""}
          </span>
        </div>

        {/* Match Score */}
        <div className="flex items-center justify-between text-[11.5px] text-gray-600 mb-4">
          <span>Skill match</span>

          <span className="font-semibold text-green-600">
            {businessMatchScore}%
          </span>
        </div>

        {/* Difficulty */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Difficulty
          </span>

          <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">
            {businessDifficulty}
          </span>
        </div>

        {/* Select Business Idea */}
        <button
          type="button"
          onClick={() => onSelect?.(businessIdeaId)}
          disabled={selecting}
          className={`w-full mt-4 py-2.5 rounded-xl text-white text-sm font-medium transition ${
            selecting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#c4622a] hover:opacity-90"
          }`}
        >
          {selecting
            ? "Selecting..."
            : "Select Business Idea"}
        </button>

      </div>
    </div>
  );
}

export default BusinessIdeaCard;