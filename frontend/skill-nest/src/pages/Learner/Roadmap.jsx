import { useState } from "react";
import Navbar from "../../components/Learner/LearnerDashboard.jsx/Navbar";
import Sidebar from "../../components/Learner/LearnerDashboard.jsx/Sidebar";

import WelcomeCard from "../../components/LearnerRoadmap/WelcomeCard";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaHandPointRight } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Step from "../../components/LearnerRoadmap/Step";

function Roadmap() {
  const [showSidebar, setShowSidebar] = useState(false);

  const [showFullStep, setShowFullStep] = useState(false);

  return (
    <div className="bg-[#f5f2eb]  min-h-screen overflow-hidden">
      <Navbar />

      {/*sidebar*/}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <WelcomeCard />

      <Step  
      heading="1. Idea Validation"
      subheading="Confirm real demand exists before investing a single rupee."
      tip="Tip: Talk to 5 people willing to pay before proceeding."
      estimatedCost="0"
      task1="Survey 20 potential customers"
      task2="Research 3 direct competitors"
      task3="Validate your unique value proposition"
      task4="Estimate monthly demand in your area"
      resource1="Business Idea Validation Toolkit"
      resource2="Competitor Analysis Template"
      />

      <Step  
      heading="2. Skills & Tools Audit"
      subheading="Identify the gap between what you have and what you need."
      tip="Tip: Borrow equipment to start — buy after first revenue."
      estimatedCost="0"
      task1="List quipment you already own"
      task2="Identify your top 3 skill gaps"
      task3="Research local suppliers for materials"
      task4="Estimate one time setup costs"
      resource1="Equipment Sourcing Guide"
      resource2="Skill Gap Self-Assessment"
      />

      <Step  
      heading="3. Legal & MSME Registration"
      subheading="Register legally to build trust and access government schemes."
      tip="Tip: FSSAI Basic Registration is free for home food businesses under Rs.12L turnover."
      estimatedCost="0 – 2,500"
      task1="Register on Udyam portal(udyamregistration.gov.in)"
      task2="Apply for FSSAI Basic Registration"
      task3="Obtain trade licence from local municipality"
      task4="Open a dedicated business bank account"
      resource1="FSSAI Registration Step-by-Step Guide"
      resource2="Pre-Launch Compliance Checklist"
      />

      <Step  
      heading="4. Cost Estimation & Pricing"
      subheading="Build a simple budget and set a pricing strategy that ensures profit."
      tip="Tip: Offer weekly subscriptions — predictable recurring revenue is better than one-off orders."
      estimatedCost="0"
      task1="Calculate daily ingredient costs"
      task2="Add packaging and delivery costs"
      task3="Set per-unit price with 40%+ margin"
      task4="Create a simple profit & loss sheet"
      resource1="Pricing Your Food Business for Profit"
      resource2="Simple P&L Template for Micro-Business"
      />

      <Step  
      heading="5. Marketing & First Customers"
      subheading="Build visibility and get your first 10 paying customers."
      tip="Tip: Your first 10 customers come from your personal network — ask everyone you know."
      estimatedCost="500 – 2,000"
      task1="Create Google Business Profile(free)"
      task2="Set up WhatsApp Business catalogue"
      task3="Post on social media 3x per week"
      task4="Offer 5 free trail meals to generate reviews"
      resource1="Pricing Your Food Business for ProfitWhatsApp Business for Micro-Entrepreneurs"
      resource2="Instagram Reels for Local Business"
      />
    
      
    </div>
  );
}

export default Roadmap;
