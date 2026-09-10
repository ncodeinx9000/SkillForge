import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  FaRegCheckCircle,
  FaCheckCircle,
  FaHandPointRight,
} from "react-icons/fa";

import { FaArrowUpRightFromSquare } from "react-icons/fa6";

import {
  FiBookOpen,
  FiClock,
  FiFileText,
  FiVideo,
  FiLink,
} from "react-icons/fi";

const Step = ({
  step,
  completedTaskIds = [],
  onTaskToggle,
  readOnly = false,

  completedResourceIds = [],
  onResourceToggle,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!step) {
    return null;
  }

  const tasks = step.tasks || [];
  const resources = step.resources || [];

  const completedTasks = tasks.filter((task) =>
    completedTaskIds.includes(task._id?.toString()),
  ).length;

  const totalTasks = tasks.length;

  const percentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const getResourceIcon = (type) => {
    switch (type) {
      case "Video":
        return <FiVideo size={18} />;

      case "PDF":
        return <FiFileText size={18} />;

      case "Website":
        return <FiLink size={18} />;

      case "Article":
      case "Course":
      case "Template":
      default:
        return <FiBookOpen size={18} />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* =================================================
                STEP HEADER
            ================================================= */}

      <div
        className="p-5 sm:p-6 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex items-start gap-4">
          {/* STEP NUMBER */}

          <div
            className={`
                            flex-shrink-0
                            w-11 h-11
                            rounded-xl
                            flex items-center justify-center
                            font-bold
                            ${
                              percentage === 100
                                ? "bg-green-100 text-green-700"
                                : "bg-indigo-100 text-indigo-600"
                            }
                        `}
          >
            {step.order}
          </div>

          {/* STEP DETAILS */}

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                  {step.title}
                </h2>

                {step.description && (
                  <p className="text-sm text-gray-500 mt-1">
                    {step.description}
                  </p>
                )}
              </div>

              {/* ARROW */}

              <div className="text-gray-500 flex-shrink-0">
                {isOpen ? (
                  <IoIosArrowUp size={22} />
                ) : (
                  <IoIosArrowDown size={22} />
                )}
              </div>
            </div>

            {/* PROGRESS */}

            <div className="mt-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">
                  {completedTasks} / {totalTasks} tasks completed
                </span>

                <span className="text-xs font-semibold text-gray-700">
                  {percentage}%
                </span>
              </div>

              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
                STEP CONTENT
            ================================================= */}

      {isOpen && (
        <div className="border-t border-gray-100">
          <div className="p-5 sm:p-6">
            {/* =================================================
                            TIP
                        ================================================= */}

            {step.tip && (
              <div className="flex gap-3 p-4 mb-6 bg-amber-50 border border-amber-100 rounded-xl">
                <div className="flex-shrink-0 text-amber-600 pt-0.5">
                  <FaHandPointRight size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-amber-800">Tip</p>

                  <p className="text-sm text-amber-700 mt-1">{step.tip}</p>
                </div>
              </div>
            )}

            {/* =================================================
                            TASKS
                        ================================================= */}

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-gray-800">Tasks</h3>

                <span className="text-xs text-gray-500">
                  {completedTasks}/{totalTasks}
                </span>
              </div>

              {tasks.length === 0 ? (
                <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-500">
                  No tasks available for this step.
                </div>
              ) : (
                <div className="space-y-3">
                  {tasks.map((task, index) => {
                    const taskId = task._id?.toString();

                    const completed = completedTaskIds.includes(taskId);

                    return (
                      <button
                        key={task._id || index}
                        type="button"
                        disabled={readOnly}
                        onClick={() => {
                          if (!readOnly) {
                            onTaskToggle?.(taskId);
                          }
                        }}
                        className={`
                                                    w-full
                                                    flex items-center gap-3
                                                    text-left
                                                    p-4
                                                    rounded-xl
                                                    border
                                                    transition
                                                    ${
                                                      completed
                                                        ? "bg-green-50 border-green-200"
                                                        : "bg-white border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
                                                    }
                                                    ${
                                                      readOnly
                                                        ? "cursor-default"
                                                        : "cursor-pointer"
                                                    }
                                                `}
                      >
                        {/* CHECK ICON */}

                        <div className="flex-shrink-0">
                          {completed ? (
                            <FaCheckCircle
                              className="text-green-600"
                              size={21}
                            />
                          ) : (
                            <FaRegCheckCircle
                              className="text-gray-400"
                              size={21}
                            />
                          )}
                        </div>

                        {/* TASK */}

                        <div className="flex-1">
                          <p
                            className={`
                                                            text-sm font-medium
                                                            ${
                                                              completed
                                                                ? "text-green-700 line-through"
                                                                : "text-gray-700"
                                                            }
                                                        `}
                          >
                            {task.title}
                          </p>
                        </div>

                        {/* NUMBER */}

                        <span className="text-xs text-gray-400">
                          {index + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* =================================================
                            LEARNING RESOURCES
                        ================================================= */}

            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <FiBookOpen size={18} />
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-800">
                    Learning Resources
                  </h3>

                  <p className="text-xs text-gray-500">
                    Helpful resources for this step
                  </p>
                </div>
              </div>

              {resources.length === 0 ? (
                <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                  <p className="text-sm text-gray-500">
                    No learning resources have been added to this step yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {resources.map((resource, index) => {
                    if (!resource) {
                      return null;
                    }

                    return (
                      <div
                        key={resource._id || index}
                        className="border border-gray-200 rounded-xl p-4 hover:border-indigo-300 transition"
                      >
                        <div className="flex items-start gap-3">
                          {/* RESOURCE ICON */}

                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                            {getResourceIcon(resource.type)}
                          </div>

                          {/* RESOURCE INFO */}

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-sm font-semibold text-gray-800">
                                {resource.title}
                              </h4>

                              {resource.type && (
                                <span className="text-[10px] px-2 py-1 rounded-full bg-indigo-50 text-indigo-600">
                                  {resource.type}
                                </span>
                              )}
                            </div>

                            {resource.description && (
                              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                                {resource.description}
                              </p>
                            )}

                            {/* META */}

                            <div className="flex flex-wrap gap-4 mt-2">
                              {resource.estimatedDuration && (
                                <span className="flex items-center gap-1 text-xs text-gray-400">
                                  <FiClock size={13} />

                                  {resource.estimatedDuration}
                                </span>
                              )}

                              {resource.level && (
                                <span className="text-xs text-gray-400">
                                  Level: {resource.level}
                                </span>
                              )}
                            </div>

                            {/* OPEN RESOURCE */}

                            {resource.url && (
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-2 mt-3 px-3 py-2 rounded-lg bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700 transition"
                              >
                                Open Resource
                                <FaArrowUpRightFromSquare size={11} />
                              </a>
                            )}

                            {/* RESOURCE COMPLETION */}

                            {!readOnly && resource._id && (
                              <button
                                type="button"
                                onClick={() =>
                                  onResourceToggle?.(resource._id.toString())
                                }
                                className={`
            inline-flex
            items-center
            gap-2
            mt-3
            ml-2
            px-3
            py-2
            rounded-lg
            text-xs
            font-medium
            transition
            ${
              completedResourceIds.includes(resource._id.toString())
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }
        `}
                              >
                                {completedResourceIds.includes(
                                  resource._id.toString(),
                                ) ? (
                                  <>
                                    <FaCheckCircle size={13} />
                                    Completed
                                  </>
                                ) : (
                                  <>
                                    <FaRegCheckCircle size={13} />
                                    Mark Complete
                                  </>
                                )}
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

            {/* =================================================
                            STEP ESTIMATION
                        ================================================= */}

            {(step.estimatedDays || step.estimatedCost) && (
              <div className="flex flex-wrap gap-4 mt-6 pt-5 border-t border-gray-100">
                {step.estimatedDays > 0 && (
                  <div>
                    <p className="text-xs text-gray-400">Estimated Time</p>

                    <p className="text-sm font-semibold text-gray-700 mt-1">
                      {step.estimatedDays} days
                    </p>
                  </div>
                )}

                {step.estimatedCost > 0 && (
                  <div>
                    <p className="text-xs text-gray-400">Estimated Cost</p>

                    <p className="text-sm font-semibold text-gray-700 mt-1">
                      ₹{step.estimatedCost}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Step;
