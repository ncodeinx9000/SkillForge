import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Learner/LearnerDashboard/Sidebar";
import Navbar from "../../components/Learner/LearnerDashboard/Navbar";

import WelcomeCard from "../../components/LearnerRoadmap/WelcomeCard";
import Step from "../../components/LearnerRoadmap/Step";

import api from "../../lib/axios";

function Roadmap() {
  const navigate = useNavigate();

  // =====================================================
  // STATE
  // =====================================================

  const [showSidebar, setShowSidebar] = useState(false);

  const [activeRoadmap, setActiveRoadmap] = useState(null);

  const [completedRoadmaps, setCompletedRoadmaps] =
    useState([]);

  const [selectedCompletedRoadmap, setSelectedCompletedRoadmap] =
    useState(null);

  const [completedTaskIds, setCompletedTaskIds] =
    useState([]);

  const [completedResourceIds, setCompletedResourceIds] =
    useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [activeSection, setActiveSection] =
    useState("active");

  // =====================================================
  // FETCH ROADMAP / PROGRESS
  // =====================================================

  useEffect(() => {
    fetchRoadmap();
  }, []);

  const fetchRoadmap = async () => {
    try {
      setLoading(true);
      setError("");

      // -------------------------------------------------
      // Get learner progress
      // -------------------------------------------------

      const response =
        await api.get("/progress/my-progress");

      console.log(
        "Learner roadmap response:",
        response.data
      );

      if (!response.data.success) {
        setError(
          response.data.message ||
            "Failed to load roadmap"
        );

        return;
      }

      // -------------------------------------------------
      // Get active + completed roadmaps
      // -------------------------------------------------

      const active =
        response.data.activeRoadmap || null;

      const completed =
        response.data.completedRoadmaps || [];

      setActiveRoadmap(active);

      setCompletedRoadmaps(completed);

      // -------------------------------------------------
      // Determine section
      // -------------------------------------------------

      if (active) {
        setActiveSection("active");

        /*
         * Active roadmap is the current roadmap.
         */
        setCompletedTaskIds(
          active.completedTaskIds || []
        );

        setCompletedResourceIds(
          active.completedResourceIds || []
        );
      } else if (completed.length > 0) {
        /*
         * If there is no active roadmap,
         * automatically show completed roadmap history.
         */

        setActiveSection("completed");

        const completedRoadmap =
          selectedCompletedRoadmap &&
          completed.find(
            (item) =>
              item?._id ===
              selectedCompletedRoadmap?._id
          );

        const roadmapToSelect =
          completedRoadmap || completed[0];

        setSelectedCompletedRoadmap(
          roadmapToSelect
        );

        setCompletedTaskIds(
          roadmapToSelect?.completedTaskIds || []
        );

        setCompletedResourceIds(
          roadmapToSelect?.completedResourceIds || []
        );
      } else {
        /*
         * No active and no completed roadmap.
         */

        setActiveSection("active");

        setCompletedTaskIds([]);

        setCompletedResourceIds([]);
      }
    } catch (error) {
      console.error(
        "Get learner roadmap error:",
        error.response?.data || error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load your roadmap"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // TASK COMPLETION
  // =====================================================

  const handleTaskToggle = async (taskId) => {
    try {
      const response =
        await api.patch(
          `/progress/task/${taskId}`
        );

      console.log(
        "Task completion response:",
        response.data
      );

      if (!response.data.success) {
        alert(
          response.data.message ||
            "Failed to update task progress."
        );

        return;
      }

      // -------------------------------------------------
      // Update task IDs immediately
      // -------------------------------------------------

      setCompletedTaskIds(
        response.data.progress
          ?.completedTaskIds || []
      );

      /*
       * Reload complete roadmap data.
       *
       * This also handles:
       * Active -> Completed
       * step progress
       * roadmap progress
       * completed roadmap history
       */

      await fetchRoadmap();
    } catch (error) {
      console.error(
        "Task completion error:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update task progress."
      );
    }
  };

  // =====================================================
  // RESOURCE COMPLETION
  // =====================================================

  const handleResourceToggle = async (
    resourceId
  ) => {
    try {
      // -------------------------------------------------
      // Call backend
      // -------------------------------------------------

      const response =
        await api.patch(
          `/progress/resource/${resourceId}`
        );

      console.log(
        "Resource completion response:",
        response.data
      );

      if (!response.data.success) {
        alert(
          response.data.message ||
            "Failed to update resource progress."
        );

        return;
      }

      // -------------------------------------------------
      // Update completed resource IDs immediately
      // -------------------------------------------------

      setCompletedResourceIds(
        response.data.progress
          ?.completedResourceIds || []
      );

      /*
       * Reload complete progress data.
       *
       * This updates resource progress and keeps
       * the UI synchronized with MongoDB.
       */

      await fetchRoadmap();
    } catch (error) {
      console.error(
        "Resource completion error:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update resource progress."
      );
    }
  };

  // =====================================================
  // SELECT COMPLETED ROADMAP
  // =====================================================

  const handleCompletedRoadmapClick = (
    roadmap
  ) => {
    setSelectedCompletedRoadmap(roadmap);

    // -----------------------------------------------
    // Task completion IDs
    // -----------------------------------------------

    setCompletedTaskIds(
      roadmap?.completedTaskIds || []
    );

    // -----------------------------------------------
    // Resource completion IDs
    // -----------------------------------------------

    setCompletedResourceIds(
      roadmap?.completedResourceIds || []
    );

    setActiveSection("completed");
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="bg-[#f5f2eb] min-h-screen">
        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />

        <Navbar showSidebar={showSidebar} />

        <main
          className={`
            min-h-screen
            pt-[82px]
            transition-all
            duration-300
            ease-in-out
            ${
              showSidebar
                ? "md:ml-[220px]"
                : "md:ml-[88px]"
            }
          `}
        >
          <div className="px-4 sm:px-6 py-8">
            <div className="max-w-[1400px] mx-auto min-h-[500px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-10 h-10 border-4 border-[#e8e4da] border-t-[#c4622a] rounded-full animate-spin mx-auto mb-4" />

                <p className="text-gray-500 font-DM-Sans">
                  Loading your roadmap...
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="bg-[#f5f2eb] min-h-screen">
        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />

        <Navbar showSidebar={showSidebar} />

        <main
          className={`
            min-h-screen
            pt-[82px]
            transition-all
            duration-300
            ease-in-out
            ${
              showSidebar
                ? "md:ml-[220px]"
                : "md:ml-[88px]"
            }
          `}
        >
          <div className="px-4 sm:px-6 py-8">
            <div className="max-w-[1400px] mx-auto">
              <div className="bg-white rounded-3xl p-10 text-center shadow-sm">
                <h2 className="text-2xl font-Outfit font-bold mb-2">
                  Unable to load roadmap
                </h2>

                <p className="text-gray-500 font-DM-Sans mb-6">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={fetchRoadmap}
                  className="
                    bg-[#c4662a]
                    hover:bg-[#ad5521]
                    text-white
                    px-6
                    py-2.5
                    rounded-xl
                    font-DM-Sans
                    font-semibold
                    transition-colors
                  "
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // =====================================================
  // DETERMINE WHICH ROADMAP TO DISPLAY
  // =====================================================

  let roadmapToDisplay = null;

  if (activeSection === "active") {
    roadmapToDisplay = activeRoadmap;
  } else {
    roadmapToDisplay =
      selectedCompletedRoadmap ||
      completedRoadmaps[0] ||
      null;
  }

  // =====================================================
  // DETERMINE RESOURCE IDS FOR CURRENT ROADMAP
  // =====================================================

  const currentCompletedResourceIds =
    roadmapToDisplay?.completedResourceIds ||
    completedResourceIds ||
    [];

  // =====================================================
  // DETERMINE TASK IDS FOR CURRENT ROADMAP
  // =====================================================

  const currentCompletedTaskIds =
    roadmapToDisplay?.completedTaskIds ||
    completedTaskIds ||
    [];

  // =====================================================
  // EMPTY ACTIVE ROADMAP
  // =====================================================

  const noActiveRoadmap =
    activeSection === "active" &&
    !activeRoadmap;

  // =====================================================
  // EMPTY COMPLETED ROADMAP
  // =====================================================

  const noCompletedRoadmap =
    activeSection === "completed" &&
    completedRoadmaps.length === 0;

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="bg-[#f5f2eb] min-h-screen">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />

      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar showSidebar={showSidebar} />

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main
        className={`
          min-h-screen
          pt-[82px]
          transition-all
          duration-300
          ease-in-out
          ${
            showSidebar
              ? "md:ml-[220px]"
              : "md:ml-[88px]"
          }
        `}
      >
        <div className="px-4 sm:px-6 py-8">
          <div className="max-w-[1400px] mx-auto">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="mb-7">
              <p className="text-[#c4622a] text-sm font-DM-Sans font-semibold tracking-wide">
                LEARNER JOURNEY
              </p>

              <h1 className="text-4xl sm:text-5xl font-Outfit font-extrabold mt-1">
                My Roadmap
              </h1>

              <p className="text-gray-500 mt-2 font-DM-Sans">
                Follow your roadmap and complete each
                step toward launching your business.
              </p>
            </div>

            {/* =================================================
                ACTIVE / COMPLETED TABS
            ================================================= */}

            <div className="bg-[#e8e4da] rounded-2xl p-1.5 flex mb-7">

              {/* -------------------------------------------------
                  ACTIVE
              ------------------------------------------------- */}

              <button
                type="button"
                onClick={() => {
                  setActiveSection("active");

                  if (activeRoadmap) {
                    setCompletedTaskIds(
                      activeRoadmap.completedTaskIds ||
                        []
                    );

                    setCompletedResourceIds(
                      activeRoadmap.completedResourceIds ||
                        []
                    );
                  }
                }}
                className={`
                  flex-1
                  py-3
                  rounded-xl
                  font-DM-Sans
                  text-sm
                  font-semibold
                  transition-all
                  ${
                    activeSection === "active"
                      ? "bg-white text-[#1e3a1e] shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }
                `}
              >
                Active Roadmap

                <span
                  className={`
                    ml-2
                    px-2
                    py-0.5
                    rounded-full
                    text-xs
                    ${
                      activeSection === "active"
                        ? "bg-[#1e3a1e] text-white"
                        : "bg-gray-300 text-gray-600"
                    }
                  `}
                >
                  {activeRoadmap ? 1 : 0}
                </span>
              </button>

              {/* -------------------------------------------------
                  COMPLETED
              ------------------------------------------------- */}

              <button
                type="button"
                onClick={() => {
                  setActiveSection("completed");

                  if (
                    completedRoadmaps.length > 0
                  ) {
                    const roadmap =
                      selectedCompletedRoadmap ||
                      completedRoadmaps[0];

                    setSelectedCompletedRoadmap(
                      roadmap
                    );

                    setCompletedTaskIds(
                      roadmap?.completedTaskIds ||
                        []
                    );

                    setCompletedResourceIds(
                      roadmap?.completedResourceIds ||
                        []
                    );
                  }
                }}
                className={`
                  flex-1
                  py-3
                  rounded-xl
                  font-DM-Sans
                  text-sm
                  font-semibold
                  transition-all
                  ${
                    activeSection === "completed"
                      ? "bg-white text-[#1e3a1e] shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }
                `}
              >
                Completed Roadmaps

                <span
                  className={`
                    ml-2
                    px-2
                    py-0.5
                    rounded-full
                    text-xs
                    ${
                      activeSection === "completed"
                        ? "bg-[#1e3a1e] text-white"
                        : "bg-gray-300 text-gray-600"
                    }
                  `}
                >
                  {completedRoadmaps.length}
                </span>
              </button>
            </div>

            {/* =================================================
                NO ACTIVE ROADMAP
            ================================================= */}

            {noActiveRoadmap && (
              <div className="bg-white rounded-3xl p-10 sm:p-14 text-center shadow-sm">

                <div className="w-16 h-16 mx-auto rounded-full bg-[#e8e4da] flex items-center justify-center mb-5">
                  <span className="text-2xl">
                    🗺️
                  </span>
                </div>

                <h2 className="text-2xl font-Outfit font-bold">
                  No active roadmap
                </h2>

                <p className="text-gray-500 font-DM-Sans mt-2 max-w-md mx-auto">
                  You don't currently have a roadmap
                  in progress. Choose a business idea
                  to start a new journey.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/learner/business-ideas"
                    )
                  }
                  className="
                    mt-6
                    bg-[#c4662a]
                    hover:bg-[#ad5521]
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    font-DM-Sans
                    font-semibold
                    transition-colors
                  "
                >
                  Explore Business Ideas
                </button>
              </div>
            )}

            {/* =================================================
                NO COMPLETED ROADMAP
            ================================================= */}

            {noCompletedRoadmap && (
              <div className="bg-white rounded-3xl p-10 sm:p-14 text-center shadow-sm">

                <div className="w-16 h-16 mx-auto rounded-full bg-[#e8e4da] flex items-center justify-center mb-5">
                  <span className="text-2xl">
                    🏆
                  </span>
                </div>

                <h2 className="text-2xl font-Outfit font-bold">
                  No completed roadmaps
                </h2>

                <p className="text-gray-500 font-DM-Sans mt-2">
                  Complete your active roadmap and it
                  will appear here as part of your
                  history.
                </p>
              </div>
            )}

            {/* =================================================
                COMPLETED ROADMAP SELECTOR
            ================================================= */}

            {activeSection === "completed" &&
              completedRoadmaps.length > 0 && (
                <div className="mb-6">

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                    {completedRoadmaps.map(
                      (item, index) => {
                        const selected =
                          selectedCompletedRoadmap?._id ===
                          item?._id;

                        const percentage =
                          item?.roadmapProgress
                            ?.percentage || 0;

                        const title =
                          item?.businessIdea
                            ?.title ||
                          item?.roadmap?.title ||
                          "Completed Roadmap";

                        return (
                          <button
                            key={
                              item?.roadmap?._id ||
                              item?.businessIdea?._id ||
                              index
                            }
                            type="button"
                            onClick={() =>
                              handleCompletedRoadmapClick(
                                item
                              )
                            }
                            className={`
                              text-left
                              bg-white
                              rounded-2xl
                              p-5
                              border-2
                              transition-all
                              ${
                                selected
                                  ? "border-[#c4622a] shadow-md"
                                  : "border-transparent hover:border-[#e8e4da]"
                              }
                            `}
                          >
                            <div className="flex items-start justify-between gap-3">

                              <div className="min-w-0">

                                <p className="text-xs text-green-600 font-DM-Sans font-bold uppercase">
                                  Completed
                                </p>

                                <h3 className="font-Outfit font-bold text-lg mt-1 truncate">
                                  {title}
                                </h3>

                              </div>

                              <span className="text-green-600 font-Outfit font-bold shrink-0">
                                {percentage}%
                              </span>

                            </div>

                            <p className="text-sm text-gray-500 mt-2 font-DM-Sans">
                              {item?.roadmap
                                ?.category ||
                                item?.businessIdea
                                  ?.category?.[0] ||
                                "Business"}
                            </p>
                          </button>
                        );
                      }
                    )}

                  </div>
                </div>
              )}

            {/* =================================================
                ROADMAP CONTENT
            ================================================= */}

            {roadmapToDisplay && (
              <>
                {/* =================================================
                    WELCOME CARD
                ================================================= */}

                <WelcomeCard
                  businessIdea={
                    roadmapToDisplay.businessIdea
                  }
                  roadmap={
                    roadmapToDisplay.roadmap
                  }
                  roadmapProgress={
                    roadmapToDisplay
                      .roadmapProgress
                      ?.percentage || 0
                  }
                  completedTasks={
                    roadmapToDisplay
                      .roadmapProgress
                      ?.completed || 0
                  }
                />

                {/* =================================================
                    COMPLETED ROADMAP NOTICE
                ================================================= */}

                {activeSection === "completed" && (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mt-6 mb-6">

                    <div className="flex items-start gap-3">

                      <div
                        className="
                          w-10
                          h-10
                          shrink-0
                          rounded-full
                          bg-green-100
                          text-green-600
                          flex
                          items-center
                          justify-center
                          text-lg
                        "
                      >
                        ✓
                      </div>

                      <div>

                        <h3 className="font-Outfit font-bold text-green-800">
                          Roadmap Completed
                        </h3>

                        <p className="text-sm text-green-700 font-DM-Sans mt-1">
                          This roadmap is part of your
                          completed journey. You can
                          review all of its steps and
                          tasks here.
                        </p>

                        {roadmapToDisplay.completedAt && (
                          <p className="text-xs text-green-600 font-DM-Sans mt-2">
                            Completed on{" "}
                            {new Date(
                              roadmapToDisplay.completedAt
                            ).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </p>
                        )}

                      </div>
                    </div>
                  </div>
                )}

                {/* =================================================
                    STEPS
                ================================================= */}

                <div className="mt-6 pb-12">

                  {roadmapToDisplay.roadmap
                    ?.steps?.length > 0 ? (
                    roadmapToDisplay.roadmap.steps.map(
                      (step) => (
                        <Step
                          key={step._id}
                          step={step}

                          completedTaskIds={
                            currentCompletedTaskIds
                          }

                          onTaskToggle={
                            handleTaskToggle
                          }

                          completedResourceIds={
                            currentCompletedResourceIds
                          }

                          onResourceToggle={
                            handleResourceToggle
                          }

                          readOnly={
                            activeSection ===
                            "completed"
                          }
                        />
                      )
                    )
                  ) : (
                    <div className="bg-white rounded-2xl p-8 text-center">

                      <p className="text-gray-500 font-DM-Sans">
                        No steps are available for
                        this roadmap yet.
                      </p>

                    </div>
                  )}

                </div>
              </>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}

export default Roadmap;