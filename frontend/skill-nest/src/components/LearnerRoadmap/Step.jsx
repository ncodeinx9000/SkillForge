import React, { useState } from "react";
import {
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";
import {
  FaRegCheckCircle,
  FaHandPointRight,
  FaExternalLinkAlt,
} from "react-icons/fa";
import {
  FiBookOpen,
  FiClock,
  FiFileText,
  FiPlayCircle,
  FiLink,
} from "react-icons/fi";
import { LiaRupeeSignSolid } from "react-icons/lia";

const getResourceIcon = (type) => {
  switch (type) {
    case "Video":
      return <FiPlayCircle className="text-red-500" size={18} />;

    case "PDF":
      return <FiFileText className="text-orange-500" size={18} />;

    case "Course":
      return <FiBookOpen className="text-blue-500" size={18} />;

    case "Website":
      return <FiLink className="text-green-500" size={18} />;

    case "Article":
      return <FiFileText className="text-purple-500" size={18} />;

    case "Template":
      return <FiFileText className="text-indigo-500" size={18} />;

    default:
      return <FiBookOpen className="text-gray-500" size={18} />;
  }
};

const Step = ({
  step,
  completedTaskIds = [],
  onTaskToggle,
  readOnly = false,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!step) return null;

  const tasks = step.tasks || [];
  const resources = step.resources || [];

  const completedTasks = tasks.filter((task) =>
    completedTaskIds.includes(task._id)
  ).length;

  const totalTasks = tasks.length;

  const progress =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

      {/* ================= STEP HEADER ================= */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-5 sm:p-6 cursor-pointer hover:bg-gray-50 transition"
      >
        <div className="flex items-start justify-between gap-4">

          <div className="flex items-start gap-4">

            {/* Step Number */}
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold shrink-0">
              {step.order}
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                {step.title}
              </h2>

              {step.description && (
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  {step.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 mt-3">

                {step.estimatedDays > 0 && (
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <FiClock size={14} />
                    {step.estimatedDays} days
                  </span>
                )}

                {step.estimatedCost > 0 && (
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <LiaRupeeSignSolid size={15} />
                    {step.estimatedCost}
                  </span>
                )}

                <span className="text-xs text-gray-500">
                  {completedTasks}/{totalTasks} tasks
                </span>

                {resources.length > 0 && (
                  <span className="text-xs text-indigo-600">
                    {resources.length} resources
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="text-gray-500 p-1"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? (
              <IoIosArrowUp size={22} />
            ) : (
              <IoIosArrowDown size={22} />
            )}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-5">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">Step Progress</span>
            <span className="font-medium text-indigo-600">
              {progress}%
            </span>
          </div>

          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* ================= STEP CONTENT ================= */}
      {isOpen && (
        <div className="border-t border-gray-100 p-5 sm:p-6">

          {/* ================= TIP ================= */}
          {step.tip && (
            <div className="mb-6 flex gap-3 bg-yellow-50 border border-yellow-100 rounded-xl p-4">
              <FaHandPointRight
                className="text-yellow-600 mt-1 shrink-0"
                size={18}
              />

              <div>
                <p className="text-sm font-semibold text-yellow-800">
                  Tip
                </p>

                <p className="text-sm text-yellow-700 mt-1">
                  {step.tip}
                </p>
              </div>
            </div>
          )}

          {/* ================= TASKS ================= */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-3">
              Tasks
            </h3>

            {tasks.length === 0 ? (
              <div className="border border-gray-200 rounded-xl p-4 text-sm text-gray-500">
                No tasks available for this step.
              </div>
            ) : (
              <div className="space-y-2">
                {tasks.map((task, index) => {
                  const isCompleted = completedTaskIds.includes(task._id);

                  return (
                    <label
                      key={task._id || index}
                      className={`flex items-start gap-3 p-4 rounded-xl border transition ${
                        isCompleted
                          ? "bg-green-50 border-green-200"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      } ${
                        readOnly
                          ? "cursor-default"
                          : "cursor-pointer"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        disabled={readOnly}
                        onChange={() => {
                          if (!readOnly && onTaskToggle) {
                            onTaskToggle(task._id);
                          }
                        }}
                        className="mt-1 w-4 h-4 accent-indigo-600"
                      />

                      <div className="flex-1">
                        <p
                          className={`text-sm ${
                            isCompleted
                              ? "text-green-700 line-through"
                              : "text-gray-700"
                          }`}
                        >
                          {task.title}
                        </p>
                      </div>

                      {isCompleted && (
                        <FaRegCheckCircle
                          className="text-green-500 shrink-0"
                          size={18}
                        />
                      )}
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* ================= LEARNING RESOURCES ================= */}
          <div className="mt-8">

            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-semibold text-gray-800">
                  Learning Resources
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  Use these resources to help you complete this step.
                </p>
              </div>

              <span className="text-xs text-gray-500">
                {resources.length} resource
                {resources.length !== 1 ? "s" : ""}
              </span>
            </div>

            {resources.length === 0 ? (
              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <p className="text-sm text-gray-500">
                  No learning resources have been added to this step yet.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {resources.map((resource, index) => {
                  /*
                    Depending on populate(), resource may be:
                    - the complete resource object
                    - just an ObjectId/string
                  */

                  if (!resource || typeof resource !== "object") {
                    return null;
                  }

                  return (
                    <div
                      key={resource._id || index}
                      className="border border-gray-200 rounded-xl p-4 hover:border-indigo-200 hover:bg-indigo-50/30 transition"
                    >
                      <div className="flex items-start gap-3">

                        {/* Resource Icon */}
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                          {getResourceIcon(resource.type)}
                        </div>

                        <div className="flex-1 min-w-0">

                          {/* Title + Type */}
                          <div className="flex flex-wrap items-center gap-2">

                            <h4 className="text-sm font-semibold text-gray-800">
                              {resource.title}
                            </h4>

                            {resource.type && (
                              <span className="text-[10px] px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                                {resource.type}
                              </span>
                            )}
                          </div>

                          {/* Description */}
                          {resource.description && (
                            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                              {resource.description}
                            </p>
                          )}

                          {/* Meta */}
                          <div className="flex flex-wrap items-center gap-3 mt-2">

                            {resource.estimatedDuration && (
                              <span className="flex items-center gap-1 text-xs text-gray-400">
                                <FiClock size={13} />
                                {resource.estimatedDuration}
                              </span>
                            )}

                            {resource.level && (
                              <span className="text-xs text-gray-400">
                                {resource.level}
                              </span>
                            )}

                            {resource.category && (
                              <span className="text-xs text-gray-400">
                                {resource.category}
                              </span>
                            )}
                          </div>

                          {/* Open Resource */}
                          {resource.url && (
                            <button
                              type="button"
                              onClick={() =>
                                window.open(
                                  resource.url,
                                  "_blank",
                                  "noopener,noreferrer"
                                )
                              }
                              className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700 transition"
                            >
                              Open Resource
                              <FaExternalLinkAlt size={11} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Step;