import { GoDash } from "react-icons/go";
import { CiFilter, CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Learner/LearnerDashboard/Navbar";
import Sidebar from "../../components/Learner/LearnerDashboard/Sidebar";
import BusinessIdeaCard from "../../components/Learner/BusinessIdea";
import api from "../../lib/axios";
import welcomeImage from "../../assets/welcome-image.png";

function BusinessIdea() {
  const navigate = useNavigate();
  
  const [showSidebar, setShowSidebar] = useState(false);

  const [ideas, setIdeas] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [error, setError] = useState("");

  const [selectingId, setSelectingId] = useState(null);

  // Selectibg business Idea
  const handleSelectBusinessIdea = async (businessIdeaId) => {
    try {
      setSelectingId(businessIdeaId);

      const response = await api.post(`/businessIdea/select/${businessIdeaId}`);

      if (!response.data.success) {
        alert(response.data.message || "Failed to select business idea");
        return;
      }

      alert("Business idea selected successfully!");

      navigate("/learner/my-roadmap");
    } catch (error) {
      console.error(
        "Select business idea error:",
        error.response?.data || error,
      );

      alert(error.response?.data?.message || "Failed to select business idea");
    } finally {
      setSelectingId(null);
    }
  };

  // ---------------------------------------------------------
  // Fetch recommended business ideas
  // ---------------------------------------------------------
  useEffect(() => {
    const fetchBusinessIdeas = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/businessIdea/getBusinessIdeas");

        console.log("Business ideas response:", response.data);

        if (response.data.success) {
          setIdeas(response.data.ideas || []);
        } else {
          setError(response.data.message || "Failed to load business ideas");
        }
      } catch (error) {
        console.error(
          "Failed to fetch business ideas:",
          error.response?.data || error,
        );

        setError(
          error.response?.data?.message || "Failed to load business ideas",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessIdeas();
  }, []);

  // ---------------------------------------------------------
  // Search business ideas
  // ---------------------------------------------------------
  const filteredIdeas = ideas.filter((idea) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) {
      return true;
    }

    const titleMatch = idea.title?.toLowerCase().includes(searchText);

    const descriptionMatch = idea.description
      ?.toLowerCase()
      .includes(searchText);

    const categoryMatch = Array.isArray(idea.category)
      ? idea.category.some((category) =>
          category?.toLowerCase().includes(searchText),
        )
      : idea.category?.toLowerCase().includes(searchText);

    const tagMatch = Array.isArray(idea.tags)
      ? idea.tags.some((tag) => tag?.toLowerCase().includes(searchText))
      : false;

    return titleMatch || descriptionMatch || categoryMatch || tagMatch;
  });

  // ---------------------------------------------------------
  // Loading state
  // ---------------------------------------------------------
  if (loading) {
    return (
      <div className="bg-[#f5f2eb] min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-sm">Loading business ideas...</p>
      </div>
    );
  }

  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------
  return (
    <div className="bg-[#f5f2eb] min-h-screen">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <Navbar showSidebar={showSidebar} />

      <div
        className={`${
          showSidebar
            ? "lg:pl-60 px-6 py-5 mt-23"
            : "lg:pl-50 lg:pr-30 px-6 py-5 mt-23"
        }`}
      >
        {/* -------------------------------------------------
            Header
        ------------------------------------------------- */}
        <div className="flex gap-2 items-center font-DM-Sans font-semibold text-[11px] text-[#c4622a] tracking-wide mb-2">
          <GoDash />

          <p>BUSINESS IDEAS</p>
        </div>

        <h2 className="text-[23px] font-Outfit font-extrabold mb-6">
          Curated ideas, matched to your skills
        </h2>

        {/* -------------------------------------------------
            Search
        ------------------------------------------------- */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex flex-1 items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-gray-200/60 shadow-sm">
            <CiSearch className="text-gray-400 text-xl" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
              placeholder="Search ideas..."
            />
          </div>

          <button
            type="button"
            className="flex items-center gap-2 bg-white px-6 py-2.5 rounded-full border border-gray-200/60 shadow-sm text-sm text-gray-700 font-medium shrink-0 hover:bg-gray-50 transition-colors"
          >
            <CiFilter className="text-lg" />

            <span>Filters</span>
          </button>
        </div>

        {/* -------------------------------------------------
            Error
        ------------------------------------------------- */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* -------------------------------------------------
            No ideas
        ------------------------------------------------- */}
        {!error && filteredIdeas.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              No business ideas found
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              There are currently no published business ideas matching your
              profile.
            </p>
          </div>
        ) : (
          /* -------------------------------------------------
             Business Ideas
          ------------------------------------------------- */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIdeas.map((idea) => {
              // Category can be an array
              const category = Array.isArray(idea.category)
                ? idea.category.join(", ")
                : idea.category || "Business";

              // Investment
              const investment =
                idea.investment?.min != null && idea.investment?.max != null
                  ? `₹${idea.investment.min.toLocaleString(
                      "en-IN",
                    )} – ₹${idea.investment.max.toLocaleString("en-IN")}`
                  : "Not specified";

              // Estimated income
              const estimatedIncome =
                idea.estimatedIncome?.min != null &&
                idea.estimatedIncome?.max != null
                  ? `₹${idea.estimatedIncome.min.toLocaleString(
                      "en-IN",
                    )} – ₹${idea.estimatedIncome.max.toLocaleString(
                      "en-IN",
                    )}/month`
                  : "Not specified/month";

              return (
                <BusinessIdeaCard
                  key={idea._id}
                  idea={idea}
                  img={idea.image || welcomeImage}
                  title={idea.title}
                  category={category}
                  description={idea.description}
                  investment={investment}
                  estimatedIncome={estimatedIncome}
                  matchScore={idea.matchScore ?? 0}
                  difficulty={idea.difficulty || "Beginner"}
                  onSelect={handleSelectBusinessIdea}
                  selecting={selectingId === idea._id}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default BusinessIdea;
