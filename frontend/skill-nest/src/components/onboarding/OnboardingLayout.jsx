import skills from "../../data/skills";
import { FaCircleCheck } from "react-icons/fa6";
import { useState } from "react";
import { GoArrowRight } from "react-icons/go";

import OptionSelector from "./OptionSelector";
import ProgressBar from "./ProgressBar";
import Logo from "./Logo";

function OnboardingLayout({
  currentStep,
  totalSteps,
  stepTitle,
  title,
  subtitle,
  children,
  onBack,
  onNext,
}) {
  return (
    <div className="bg-[#f5f2eb] min-h-screen">
      {/* Logo */}
      <Logo />

      <div className="max-w-3xl w-full mx-auto px-10 pt-6">
        <ProgressBar currentStep={currentStep} totalStep={totalSteps} />
        <p className="text-[12px] text-[#c4622a] font-DM-Sans font-semibold py-4">
          {stepTitle}
        </p>
        <h2 className="text-[25px] font-Outfit font-extrabold">{title}</h2>

        {/* Dynamic Content */}
        <div className=" mt-4">{children}</div>

        {/* Buttons */}
        <div className="flex items-center justify-between font-DM-Sans mt-15 px-2.5 pb-7">
          <button
            onClick={onBack}
            className=" border font-bold px-5 py-1.5 rounded-xl"
          >
            Back
          </button>
          <p className="text-gray-600 tracking-wide">
            You can select multiple skills
          </p>
          <button
            onClick={onNext}
            className="bg-[#c4662a] text-white font-semibold rounded-xl flex items-center
          gap-2 border px-10 py-1.5"
          >
            <span>Next</span>
            <GoArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default OnboardingLayout;
