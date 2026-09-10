import { useEffect, useState } from "react";

import Sidebar from "../../components/Learner/LearnerDashboard/Sidebar";
import Navbar from "../../components/Learner/LearnerDashboard/Navbar";

import { FaBullseye } from "react-icons/fa";
import { LuBookMarked } from "react-icons/lu";
import { FiBookOpen } from "react-icons/fi";
import { RxPeople } from "react-icons/rx";
import { GrEmptyCircle } from "react-icons/gr";
import { LuWrench } from "react-icons/lu";
import { LuShield } from "react-icons/lu";
import { MdCurrencyRupee } from "react-icons/md";
import { CiGlobe } from "react-icons/ci";

import api from "../../lib/axios";

function MyProgress() {
  const [showSidebar, setShowSidebar] = useState(false);

  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH PROGRESS
  // =====================================================

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/progress/my-progress");

      console.log("My progress response:", response.data);

      if (!response.data.success) {
        setError(
          response.data.message || "Failed to load your progress"
        );
        return;
      }

      setProgress(response.data);
    } catch (error) {
      console.error(
        "Get progress error:",
        error.response?.data || error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load your progress"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOADING SCREEN
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
            ${showSidebar ? "md:ml-[220px]" : "md:ml-[88px]"}
          `}
        >
          <div className="px-4 sm:px-6 py-8">
            <div className="max-w-[1400px] mx-auto flex justify-center items-center min-h-[400px]">
              <p className="text-gray-500 font-DM-Sans">
                Loading your progress...
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // =====================================================
  // ERROR SCREEN
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
            ${showSidebar ? "md:ml-[220px]" : "md:ml-[88px]"}
          `}
        >
          <div className="px-4 sm:px-6 py-8">
            <div className="max-w-[1400px] mx-auto">
              <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
                <h2 className="text-xl font-Outfit font-bold mb-2">
                  Unable to load progress
                </h2>

                <p className="text-gray-500 mb-5 font-DM-Sans">
                  {error}
                </p>

                <button
                  onClick={fetchProgress}
                  className="
                    bg-[#c4662a]
                    hover:bg-[#ad5521]
                    text-white
                    px-5
                    py-2.5
                    rounded-xl
                    font-DM-Sans
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
  // DATA
  // =====================================================

  const activeRoadmap = progress?.activeRoadmap || null;

  const completedRoadmaps =
    progress?.completedRoadmaps || [];

  /*
    If an active roadmap exists:
      show active roadmap as the main progress.

    If no active roadmap exists:
      show the latest completed roadmap.

    This is important because after completing a roadmap,
    activeRoadmap becomes null but completedRoadmaps still
    contains the learner's history.
  */
  const currentRoadmap =
    activeRoadmap || completedRoadmaps[0] || null;

  const isCompleted =
    currentRoadmap?.status === "Completed" ||
    currentRoadmap?.roadmapProgress?.percentage === 100;

  // =====================================================
  // PROGRESS VALUES
  // =====================================================

  const roadmapProgress =
    currentRoadmap?.roadmapProgress?.percentage || 0;

  const completedTasks =
    currentRoadmap?.roadmapProgress?.completed || 0;

  const totalTasks =
    currentRoadmap?.roadmapProgress?.total || 0;

  const stepProgress =
    currentRoadmap?.stepProgress || [];

  const completedSteps =
    stepProgress.filter((step) => step.completed).length;

  const totalSteps = stepProgress.length;

  const resourceProgress =
    currentRoadmap?.resourceProgress || {};

  const completedResources =
    resourceProgress.completed || 0;

  const totalResources =
    resourceProgress.total || 0;

  const mentorCount =
    currentRoadmap?.bookedMentor?.length || 0;

  // =====================================================
  // CURRENT STEP
  // =====================================================

  const currentStep =
    stepProgress.find(
      (step) =>
        !step.completed &&
        step.percentage > 0
    ) ||
    stepProgress.find(
      (step) => !step.completed
    );

  // =====================================================
  // DAYS ACTIVE
  // =====================================================

  const calculateDaysActive = () => {
    if (!currentRoadmap?.startedAt) {
      return 0;
    }

    const startDate = new Date(
      currentRoadmap.startedAt
    );

    const endDate = currentRoadmap.completedAt
      ? new Date(currentRoadmap.completedAt)
      : new Date();

    const difference =
      endDate.getTime() - startDate.getTime();

    const days = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );

    return Math.max(days, 1);
  };

  const daysActive = calculateDaysActive();

  // =====================================================
  // STEP ICON
  // =====================================================

  const getStepIcon = (order) => {
    switch (order) {
      case 1:
        return <GrEmptyCircle />;

      case 2:
        return <LuWrench />;

      case 3:
        return <LuShield />;

      case 4:
        return <MdCurrencyRupee />;

      case 5:
        return <CiGlobe />;

      default:
        return <FaBullseye />;
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

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
          ${showSidebar ? "md:ml-[220px]" : "md:ml-[88px]"}
        `}
      >
        <div className="px-4 sm:px-6 py-8">

          <div className="max-w-[1400px] mx-auto">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="mb-7">

              <p className="text-[#c4622a] font-DM-Sans text-sm font-semibold tracking-wide">
                LEARNER JOURNEY
              </p>

              <h1 className="text-4xl sm:text-5xl font-Outfit font-extrabold mt-1">
                My Progress
              </h1>

              <p className="text-gray-500 mt-2 font-DM-Sans">
                Track your business journey and achievements.
              </p>

            </div>

            {/* =================================================
                NO ROADMAP
            ================================================= */}

            {!currentRoadmap && (
              <div className="bg-white rounded-3xl p-12 text-center shadow-sm">

                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#e8e4da] flex items-center justify-center">
                  <FaBullseye className="text-[#c4622a] text-2xl" />
                </div>

                <h2 className="text-2xl font-Outfit font-bold">
                  No roadmap yet
                </h2>

                <p className="text-gray-500 mt-2 font-DM-Sans">
                  Select a business idea and start your
                  entrepreneurial journey.
                </p>

              </div>
            )}

            {/* =================================================
                PROGRESS CONTENT
            ================================================= */}

            {currentRoadmap && (
              <>
                {/* =================================================
                    CURRENT PROGRESS BANNER
                ================================================= */}

                <div className="bg-[#1e3a1e] text-white rounded-3xl p-6 sm:p-8 mb-6">

                  {/* Status */}

                  <div className="flex flex-wrap items-center gap-3 mb-3">

                    <p className="text-[#d0c8bb] font-DM-Sans">
                      Progress Report
                    </p>

                    {isCompleted ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Completed
                      </span>
                    ) : (
                      <span className="bg-[#c4662a] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Active
                      </span>
                    )}

                  </div>

                  {/* Title */}

                  <h2 className="text-3xl sm:text-4xl font-Outfit font-bold">
                    {currentRoadmap?.businessIdea?.title ||
                      currentRoadmap?.roadmap?.title ||
                      "Your Business Journey"}
                  </h2>

                  {/* Progress */}

                  <div className="mt-6">

                    <div className="flex flex-wrap justify-between gap-2 text-sm mb-2">

                      <span>
                        {roadmapProgress}% of roadmap complete
                      </span>

                      <span>
                        {completedSteps}/{totalSteps} steps completed
                      </span>

                    </div>

                    <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">

                      <div
                        className="
                          h-full
                          bg-white
                          rounded-full
                          transition-all
                          duration-500
                        "
                        style={{
                          width: `${roadmapProgress}%`,
                        }}
                      />

                    </div>

                  </div>

                  {/* Statistics */}

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-7">

                    <div>
                      <p className="text-2xl font-Outfit font-bold">
                        {roadmapProgress}%
                      </p>

                      <p className="text-sm text-white/70">
                        Roadmap Progress
                      </p>
                    </div>

                    <div>
                      <p className="text-2xl font-Outfit font-bold">
                        {completedTasks}/{totalTasks}
                      </p>

                      <p className="text-sm text-white/70">
                        Tasks Done
                      </p>
                    </div>

                    <div>
                      <p className="text-2xl font-Outfit font-bold">
                        {completedResources}/{totalResources}
                      </p>

                      <p className="text-sm text-white/70">
                        Resources
                      </p>
                    </div>

                    <div>
                      <p className="text-2xl font-Outfit font-bold">
                        {daysActive}
                      </p>

                      <p className="text-sm text-white/70">
                        Days Active
                      </p>
                    </div>

                  </div>

                </div>

                {/* =================================================
                    STAT CARDS
                ================================================= */}

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">

                  {/* Roadmap Progress */}

                  <div className="bg-white rounded-2xl p-5 shadow-sm">

                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                      <FaBullseye className="text-[#c2815b] text-lg" />
                    </div>

                    <p className="text-3xl font-Outfit font-bold">
                      {roadmapProgress}%
                    </p>

                    <p className="text-gray-500 text-sm mt-1 font-DM-Sans">
                      Roadmap Progress
                    </p>

                  </div>

                  {/* Completed Roadmaps */}

                  <div className="bg-white rounded-2xl p-5 shadow-sm">

                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                      <LuBookMarked className="text-gray-800 text-lg" />
                    </div>

                    <p className="text-3xl font-Outfit font-bold">
                      {completedRoadmaps.length}
                    </p>

                    <p className="text-gray-500 text-sm mt-1 font-DM-Sans">
                      Completed Roadmaps
                    </p>

                  </div>

                  {/* Resources */}

                  <div className="bg-white rounded-2xl p-5 shadow-sm">

                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                      <FiBookOpen className="text-blue-600 text-lg" />
                    </div>

                    <p className="text-3xl font-Outfit font-bold">
                      {completedResources}
                    </p>

                    <p className="text-gray-500 text-sm mt-1 font-DM-Sans">
                      Resources Completed
                    </p>

                  </div>

                  {/* Mentors */}

                  <div className="bg-white rounded-2xl p-5 shadow-sm">

                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                      <RxPeople className="text-purple-600 text-lg" />
                    </div>

                    <p className="text-3xl font-Outfit font-bold">
                      {mentorCount}
                    </p>

                    <p className="text-gray-500 text-sm mt-1 font-DM-Sans">
                      Mentors
                    </p>

                  </div>

                </div>

                {/* =================================================
                    CURRENT STEP
                ================================================= */}

                {!isCompleted && currentStep && (
                  <div className="bg-white rounded-2xl p-6 mb-7 shadow-sm">

                    <div className="flex flex-wrap items-center justify-between gap-3">

                      <div>

                        <p className="text-sm text-[#c4622a] font-DM-Sans font-semibold">
                          CURRENT STEP
                        </p>

                        <h3 className="text-xl font-Outfit font-extrabold mt-1">
                          Step {currentStep.order}:{" "}
                          {currentStep.title}
                        </h3>

                      </div>

                      <span className="bg-[#fff1e8] text-[#c4622a] px-3 py-1.5 rounded-full text-sm font-semibold">
                        {currentStep.percentage}% complete
                      </span>

                    </div>

                  </div>
                )}

                {/* =================================================
                    COMPLETED MESSAGE
                ================================================= */}

                {isCompleted && (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-7">

                    <div className="flex items-start gap-4">

                      <div className="w-11 h-11 shrink-0 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl">
                        ✓
                      </div>

                      <div>

                        <h3 className="text-xl font-Outfit font-bold text-green-800">
                          Roadmap Completed!
                        </h3>

                        <p className="text-green-700 font-DM-Sans mt-1">
                          Congratulations! You completed all{" "}
                          {totalTasks} tasks across{" "}
                          {totalSteps} steps.
                        </p>

                        {currentRoadmap.completedAt && (
                          <p className="text-sm text-green-600 mt-2 font-DM-Sans">
                            Completed on{" "}
                            {formatDate(
                              currentRoadmap.completedAt
                            )}
                          </p>
                        )}

                      </div>

                    </div>

                  </div>
                )}

                {/* =================================================
                    ROADMAP STEPS
                ================================================= */}

                <div className="bg-white rounded-2xl p-6 shadow-sm">

                  <div className="flex items-center justify-between mb-5">

                    <div>

                      <h3 className="text-xl font-Outfit font-extrabold">
                        Roadmap Steps
                      </h3>

                      <p className="text-sm text-gray-500 font-DM-Sans mt-1">
                        {completedSteps} of {totalSteps} steps completed
                      </p>

                    </div>

                    <span className="text-[#c4622a] font-DM-Sans font-bold">
                      {roadmapProgress}%
                    </span>

                  </div>

                  {stepProgress.length > 0 ? (
                    <div className="space-y-6">

                      {stepProgress.map((step) => (

                        <div
                          key={step.stepId}
                          className="flex items-start gap-4"
                        >

                          {/* Step Icon */}

                          <div
                            className={`
                              w-11
                              h-11
                              shrink-0
                              rounded-xl
                              flex
                              items-center
                              justify-center
                              text-lg
                              ${
                                step.completed
                                  ? "bg-[#1e3a1e] text-white"
                                  : step.percentage > 0
                                  ? "bg-[#c4622a] text-white"
                                  : "bg-[#e8e4da] text-gray-500"
                              }
                            `}
                          >
                            {getStepIcon(step.order)}
                          </div>

                          {/* Step Details */}

                          <div className="flex-1 min-w-0">

                            <div className="flex flex-wrap justify-between items-center gap-2 mb-2">

                              <p className="text-sm sm:text-base font-DM-Sans font-semibold">
                                {step.title}
                              </p>

                              <p className="text-sm font-DM-Sans font-semibold">
                                {step.percentage}%
                              </p>

                            </div>

                            {/* Progress Bar */}

                            <div className="h-2 bg-[#e8e4da] rounded-full overflow-hidden">

                              <div
                                className={`
                                  h-full
                                  rounded-full
                                  transition-all
                                  duration-500
                                  ${
                                    step.completed
                                      ? "bg-[#1e3a1e]"
                                      : "bg-[#c4622a]"
                                  }
                                `}
                                style={{
                                  width: `${step.percentage}%`,
                                }}
                              />

                            </div>

                            {/* Task Count */}

                            <p className="text-xs text-gray-500 mt-2 font-DM-Sans">
                              {step.completedTasks}/
                              {step.totalTasks} tasks completed
                            </p>

                          </div>

                        </div>

                      ))}

                    </div>
                  ) : (
                    <p className="text-gray-500 font-DM-Sans">
                      No roadmap steps available.
                    </p>
                  )}

                </div>

                {/* =================================================
                    COMPLETED ROADMAP HISTORY
                ================================================= */}

                {completedRoadmaps.length > 0 && (
                  <div className="mt-8">

                    <div className="mb-4">

                      <h3 className="text-xl font-Outfit font-extrabold">
                        Completed Roadmaps
                      </h3>

                      <p className="text-gray-500 text-sm font-DM-Sans mt-1">
                        Your completed business journeys and history.
                      </p>

                    </div>

                    <div className="space-y-4">

                      {completedRoadmaps.map(
                        (item, index) => {

                          const percentage =
                            item.roadmapProgress?.percentage || 0;

                          const tasksDone =
                            item.roadmapProgress?.completed || 0;

                          const tasksTotal =
                            item.roadmapProgress?.total || 0;

                          const stepsDone =
                            item.stepProgress?.filter(
                              (step) => step.completed
                            ).length || 0;

                          const stepsTotal =
                            item.stepProgress?.length || 0;

                          return (
                            <div
                              key={
                                item.roadmap?._id ||
                                item.businessIdea?._id ||
                                index
                              }
                              className="
                                bg-white
                                rounded-2xl
                                p-6
                                shadow-sm
                              "
                            >

                              {/* Header */}

                              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

                                <div className="flex items-start gap-4">

                                  <div className="
                                    w-12
                                    h-12
                                    shrink-0
                                    rounded-full
                                    bg-green-100
                                    text-green-600
                                    flex
                                    items-center
                                    justify-center
                                    text-xl
                                  ">
                                    ✓
                                  </div>

                                  <div>

                                    <div className="flex flex-wrap items-center gap-3">

                                      <h4 className="text-lg sm:text-xl font-Outfit font-bold">
                                        {item.roadmap?.title ||
                                          item.businessIdea?.title ||
                                          "Completed Roadmap"}
                                      </h4>

                                      <span className="
                                        bg-green-100
                                        text-green-700
                                        px-3
                                        py-1
                                        rounded-full
                                        text-xs
                                        font-semibold
                                      ">
                                        Completed
                                      </span>

                                    </div>

                                    <p className="text-gray-500 text-sm mt-2 font-DM-Sans">
                                      {item.roadmap?.category ||
                                        item.businessIdea?.category?.[0] ||
                                        "Business"}{" "}
                                      •{" "}
                                      {item.roadmap?.level ||
                                        "Beginner"}
                                    </p>

                                    <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-sm font-DM-Sans">

                                      <span className="text-gray-600">
                                        ✓ {tasksDone}/{tasksTotal} tasks
                                      </span>

                                      <span className="text-gray-600">
                                        ✓ {stepsDone}/{stepsTotal} steps
                                      </span>

                                      <span className="text-green-600 font-semibold">
                                        {percentage}% complete
                                      </span>

                                    </div>

                                  </div>

                                </div>

                                {/* Percentage */}

                                <div className="text-left lg:text-right">

                                  <p className="text-2xl font-Outfit font-bold text-green-600">
                                    {percentage}%
                                  </p>

                                  <p className="text-xs text-gray-500 font-DM-Sans">
                                    Complete
                                  </p>

                                </div>

                              </div>

                              {/* Progress */}

                              <div className="mt-5">

                                <div className="h-2 bg-green-100 rounded-full overflow-hidden">

                                  <div
                                    className="h-full bg-green-600 rounded-full"
                                    style={{
                                      width: `${percentage}%`,
                                    }}
                                  />

                                </div>

                              </div>

                              {/* Completed Date */}

                              {item.completedAt && (
                                <p className="text-sm text-gray-500 mt-3 font-DM-Sans">
                                  Completed on{" "}
                                  {formatDate(
                                    item.completedAt
                                  )}
                                </p>
                              )}

                            </div>
                          );
                        }
                      )}

                    </div>

                  </div>
                )}

              </>
            )}

          </div>
        </div>
      </main>

    </div>
  );
}

export default MyProgress;