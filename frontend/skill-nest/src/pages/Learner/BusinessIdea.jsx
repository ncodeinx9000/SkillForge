import { GoDash } from "react-icons/go";

import { useState } from "react";
import Navbar from "../../components/Learner/LearnerDashboard.jsx/Navbar";
import Sidebar from "../../components/Learner/LearnerDashboard.jsx/Sidebar";

import { IoIosArrowDown } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaHandPointRight } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import Step from "../../components/LearnerRoadmap/Step";
import foodImg from "../../assets/food_catering.jpg";
import BusinessIdeaCard from "../../components/Learner/BusinessIdea";

function BusinessIdea() {
  const [showSidebar, setShowSidebar] = useState(false);

  const [showFullStep, setShowFullStep] = useState(false);

  return (
    <div className="bg-[#f5f2eb]  min-h-screen overflow-hidden">
      {/*sidebar*/}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <Navbar showSidebar={showSidebar} />

      <div
        className={`${showSidebar ? "lg:pl-60  px-6 py-5 mt-23" : "lg:pl-50 lg:pr-30 px-6 py-5 mt-23"}`}
      >
        <div className="flex gap-2 items-center font-DM-Sans font-semibold text-[11px] text-[#c4622a] tracking-wide mb-2">
          <GoDash />
          <p>BUSINESS IDEAS</p>
        </div>

        <h2 className="text-[23px] font-Outfit font-extrabold mb-6">
          Curated ideas, matched to your skills
        </h2>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex flex-1 items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-gray-200/60 shadow-sm">
            <CiSearch className="text-gray-400 text-xl" />
            <input
              type="text"
              className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
              placeholder="Search ideas..."
            />
          </div>
          {/* Filter Button */}
          <button className="flex items-center gap-2 bg-white px-6 py-2.5 rounded-full border border-gray-200/60 shadow-sm text-sm text-gray-700 font-medium shrink-0 hover:bg-gray-50 transition-colors">
            <CiFilter className="text-lg" />
            <span>Filters</span>
          </button>
        </div>

        {/* Business Ideas */}
        <div className="grid grid-cols-3 gap-4 ">
          <BusinessIdeaCard
            img={foodImg}
            title="Home Tiffin Service"
            category="Food & Catering"
            description="Deliver fresh home-cooked meals to offices and students daily."
            investment="5,000–15,000"
            estimatedIncome="15,000–40,000/month"
            matchScore="96%"
            difficulty="Beginner"
          />

          <BusinessIdeaCard
            img={foodImg}
            title="Custom Boutique"
            category="Fashion & Tailoring"
            description="A neighbourhood boutique offering custom fits, alterations, and bridal wear."
            investment="15,000–40,000"
            estimatedIncome="20,000–60,000/month"
            matchScore="91%"
            difficulty="Beginner"
          />

          <BusinessIdeaCard
            img={foodImg}
            title="Freelance Design Studio
"
            category="Digital Skills"
            description="Offer logo design, social media creatives, and brand kits to local businesses."
            investment="0–8,000"
            estimatedIncome="20,000–80,000/month
"
            matchScore="88%"
            difficulty="Beginner"
          />

          <BusinessIdeaCard
            img={foodImg}
            title="Handmade Jewellery
"
            category="Handicrafts"
            description="Sell handcrafted jewellery via Instagram, WhatsApp and Etsy."
            investment="8,000–20,000"
            estimatedIncome="10,000–50,000/month
"
            matchScore="84%"
            difficulty="Beginner"
          />

          <BusinessIdeaCard
            img={foodImg}
            title="Mobile & Electronics Repair
"
            category="Repair Services"
            description="Open a local repair centre for smartphones and laptops."
            investment="25,000–60,000"
            estimatedIncome="25,000–70,000/month
"
            matchScore="79%"
            difficulty="Intermediate"
          />

          <BusinessIdeaCard
            img={foodImg}
            title="Mobile & Electronics Organic Grocery Store
"
            category="Retail & Trading"
            description="Source and sell organic produce directly from local farmers."
            investment="30,000–80,000"
            estimatedIncome="30,000–1,00,000/month
"
            matchScore="72%"
            difficulty="Advanced"
          />
        </div>
      </div>
    </div>
  );
}

export default BusinessIdea;
