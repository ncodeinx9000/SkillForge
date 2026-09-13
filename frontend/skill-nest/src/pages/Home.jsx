import Header from "../components/Header";
import { FaArrowRightLong } from "react-icons/fa6";
import { GoDash } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
import { BsArrowRight } from "react-icons/bs";
import { FiScissors } from "react-icons/fi";
import { BsForkKnife } from "react-icons/bs";
import { LuPaintbrush } from "react-icons/lu";
import { BiJoystickButton } from "react-icons/bi";
import { LiaWrenchSolid } from "react-icons/lia";
import { MdOutlineInventory2 } from "react-icons/md";
import { GrEmptyCircle } from "react-icons/gr";
import { MdOutlinePentagon } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import { CiGlobe } from "react-icons/ci";
import { SlGraph } from "react-icons/sl";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { CiPlay1 } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import bgImage from "../assets/bg-image.jpg";
import { PiPlantThin } from "react-icons/pi";
import InterestCard from "../components/InterestCard";
import { MdKeyboardArrowRight } from "react-icons/md";
import BusinessIdeaCard from "../components/BusinessIdeaCard";
import MentorCard from "../components/MentorCard";
import LearningCard from "../components/LearningCard";
import { GrDocumentText } from "react-icons/gr";
import { TbClipboardList } from "react-icons/tb";
import { PiBag } from "react-icons/pi";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import RoleCard from "../components/RoleCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../lib/axios";

function Home() {
  const navigate = useNavigate();
  const [homeData, setHomeData] = useState({ stats: {}, ideas: [], mentors: [], resources: [] });
  const [homeLoading, setHomeLoading] = useState(true);
  const [homeError, setHomeError] = useState("");

  useEffect(() => {
    api.get("/public/home")
      .then((response) => setHomeData(response.data))
      .catch((error) => {
        console.error("Failed to load home data:", error);
        setHomeError("Live platform data is temporarily unavailable. Please try again shortly.");
      })
      .finally(() => setHomeLoading(false));
  }, []);

  const stats = homeData.stats || {};
  const featuredIdea = homeData.ideas[0];
  const featuredRoadmap = featuredIdea?.roadmap;
  const categories = [...new Set(homeData.ideas.flatMap((idea) => idea.category || []))].slice(0, 6);
  return (
    <>
      <Header />
      {homeError && <div className="fixed left-0 right-0 top-20 z-20 bg-red-50 px-5 py-3 text-center text-sm text-red-700">{homeError}</div>}
      {/* Hero Section*/}
      <section className="relative overflow-hidden bg-[#f5f2eb] mt-20  py-15">
        <img
          src={bgImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f5f2eb] via-[#f5f2eb]/70 to-[#f5f2eb]/20"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 py-6 flex items-center justify-between">
          {/* Left Content*/}
          <div>
            <div className="bg-[#bfbdaf] px-6 py-1 rounded-full flex items-center w-83 text-[14px] font-Outfit  mb-6">
              <PiPlantThin className="text-black p-2 w-8 h-7 " />
              <p>SBA UNIFIED MENTOR PROGRAMME</p>
            </div>
            <h1 className="w-90 text-5xl font-Outfit text-[10xl] font-extrabold mb-6">
              Turn your skill into a thriving micro-business.
            </h1>
            <p className="font-Outfit w-110 mb-6">
              Discover business ideas matched to your skills, follow structured
              roadmaps, and get mentored by experts who have built what you want
              to build.
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-2 w-200 mb-8">
              {categories.map((category) => <div key={category} className="bg-[#ffffff] border border-gray-400 px-2 py-1 text-[13px] font-DM-Sans font-semibold rounded-full">{category}</div>)}
              {categories.length === 0 && <p className="text-sm text-gray-600">Explore published business opportunities and mentor guidance.</p>}
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => navigate("/signup")} className="flex items-center gap-2 bg-[#c4622a] text-white text-sm font-semibold px-8 py-3 rounded-xl font-DM-Sans hover:bg-[#e4864f] transition-colors">
                Discover My Business <FaArrowRightLong />
              </button>

              <button
                onClick={() => navigate("/login")}
                className="font-DM-Sans text-sm font-semibold px-6 py-3 bg-[#ffffff] border border-gray-500 rounded-xl cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </div>
          {/* right image*/}
        </div>
      </section>
      <div className="relative z-10 w-full mx-auto bg-green-900 text-white">
        <div className="grid grid-cols-2 md:flex flex-wrap gap-y-6 justify-around font-Outfit py-5 ">
          <div className="text-center">
            <p className="text-2xl font-bold">{stats.learners || 0}</p>
            <p className="text-sm text-gray-300">Entrepreneurs Trained</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{stats.mentors || 0}</p>
            <p className="text-sm text-gray-300">Expert Mentors</p>
          </div>
          <div className=" text-center">
            <p className="text-2xl font-bold">{stats.roadmaps || 0}</p>
            <p className="text-sm text-gray-300">Business Roadmaps</p>
          </div>
          <div className=" text-center">
            <p className="text-2xl font-bold">{stats.completionRate ?? "—"}</p>
            <p className="text-sm text-gray-300">Complete Rate</p>
          </div>
        </div>
      </div>

      {/* Skill & Interest*/}
      <div className="bg-[#f5f2eb]  border-b border-b-gray-300">
        <div className="lg:flex lg:items-center lg:justify-between max-w-7xl mx-auto px-5 py-15">
          <div className="lg:w-[36rem]">
            <p className="flex items-center text-[12px] font-semibold font-DM-Sans tracking-wide text-[#c4622a] gap-1 mb-3">
              <GoDash /> SKILL & INTEREST PROFILING
            </p>
            <h2 className="font-Outfit text-3xl font-extrabold w-75 mb-3">
              We match your skills to real business opportunities.
            </h2>

            <p className="font-DM-Sans text-[#6b6b58] mb-5">
              A quick 5-minute assessment cross-references your skills,
              interests, location, and investment capacity to surface the most
              viable ideas for you.
            </p>

            <ul className="mb-6">
              <li className="flex items-center gap-1 mb-2 text-[14px]">
                <GoDotFill className="text-[#c4622a] " />{" "}
                <p className="font-semibold">Tailoring</p>
                <BsArrowRight />{" "}
                <p className="text-[#6b6b58]">
                  Custom Boutique or Alteration Shop
                </p>
              </li>
              <li className="flex items-center gap-1 mb-2 text-[14px]">
                <GoDotFill className="text-[#c4622a] " />{" "}
                <p className="font-semibold">Cooking</p> <BsArrowRight />{" "}
                <p className="text-[#6b6b58]">
                  {" "}
                  Home Tiffin, Catering, or Cloud Kitchen
                </p>
              </li>
              <li className="flex items-center gap-1 mb-2 text-[14px]">
                <GoDotFill className="text-[#c4622a] " />{" "}
                <p className="font-semibold">Digital Skills</p>
                <BsArrowRight />{" "}
                <p className="text-[#6b6b58]">
                  Freelance Design, Social Media Agency
                </p>
              </li>
              <li className="flex items-center gap-1 mb-2 text-[14px]">
                <GoDotFill className="text-[#c4622a] " />{" "}
                <p className="font-semibold">Handicrafts</p>
                <BsArrowRight />{" "}
                <p className="text-[#6b6b58]">
                  Export Marketplace, Gift Hampers
                </p>
              </li>
            </ul>

            <button className="flex items-center gap-2 bg-[#c4622a] text-white text-sm px-5 py-3 rounded-xl font-DM-Sans font-semibold hover:bg-[#e4864f] transition-colors mb-15">
              Take the Skill Assesment <BsArrowRight />{" "}
            </button>
          </div>
          <div className="lg:w-[36rem] grid grid-cols-2 gap-5 mb-8">
            <InterestCard
              icon={FiScissors}
              iconBgColor="bg-pink-200"
              iconTextColor="text-pink-800"
              name="Tailoring & Fashion"
            />
            <InterestCard
              icon={BsForkKnife}
              iconBgColor="bg-orange-200"
              iconTextColor="text-orange-700"
              name="Food & Catering"
            />
            <InterestCard
              icon={LuPaintbrush}
              iconBgColor="bg-purple-200"
              iconTextColor="text-purple-60"
              name="Handicrafts & Art"
            />
            <InterestCard
              icon={BiJoystickButton}
              iconBgColor="bg-blue-200"
              iconTextColor="text-blue-700"
              name="Digital & Tech"
            />
            <InterestCard
              icon={LiaWrenchSolid}
              iconBgColor="bg-amber-200"
              iconTextColor="text-amber-700"
              name="Repair Services"
            />
            <InterestCard
              icon={MdOutlineInventory2}
              iconBgColor="bg-green-200"
              iconTextColor="text-green-700"
              name="Retail & Trading"
            />
          </div>
        </div>
      </div>

      {/* Business Idea*/}
      <div className="bg-[#f5f2eb]">
        <div className="max-w-7xl mx-auto px-5 py-20">
          <div className="flex items-end justify-between mb-9">
            <div>
              <h4 className="flex items-center gap-1 text-[#c4622a] text-[12px] font-DM-Sans font-semibold tracking-wide ">
                <GoDash />
                BUSINESS IDEAS
              </h4>
              <h3 className="text-[30px] font-Outfit font-extrabold">
                Curated ideas, matched to your skills.
              </h3>
            </div>
            <div className="text-right">
              <a
                href=""
                className="flex items-center text-[#c4622a] text-[14px] font-DM-Sans tracking-wide font-bold"
              >
                Browse all {homeData.ideas.length} ideas <MdKeyboardArrowRight />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {homeLoading ? <p className="text-sm text-gray-500">Loading published ideas...</p> : homeData.ideas.length === 0 ? <p className="text-sm text-gray-500">No published business ideas yet.</p> : homeData.ideas.slice(0, 4).map((idea, index) => <BusinessIdeaCard key={idea._id} icon={[FiScissors, BsForkKnife, BiJoystickButton, LuPaintbrush][index % 4]} iconBgColor={["bg-pink-200", "bg-orange-200", "bg-blue-200", "bg-purple-200"][index % 4]} iconTextColor={["text-pink-800", "text-orange-800", "text-blue-800", "text-purple-800"][index % 4]} name={idea.category?.join(" & ") || "Business"} description={idea.title} para={idea.description} />)}
          </div>
        </div>
      </div>

      {/*Business Roadmap*/}
      <div className="bg-[#1e3a1e] ">
        <div className="lg:flex lg:items-center lg:justify-between lg:gap-x-15 max-w-7xl mx-auto px-5 py-20">
          <div className="lg:w-1/2">
            <p className="flex items-center gap-1  text-[#c4622a] text-[12px] font-DM-Sans font-semibold mb-3">
              <GoDash />
              BUSINESS ROADMAPS
            </p>
            <h3 className="text-[30px] text-[#f5f2eb] w-90 font-extrabold font-Outfit mb-3">
              Step-by-step guidance from idea to launch.
            </h3>
            <p className="text-[#f5f2eba3] mb-6">
              Every business idea comes with a structured roadmap covering idea
              validation, tools, legal registration, cost estimation, and
              marketing.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-1 bg-[#3e663e6e] text-sm rounded-2xl px-4 py-1.5">
                <GrEmptyCircle className="text-[#c4622a]" />
                <p className="text-white">Idea Validation</p>
              </div>
              <div className="flex items-center gap-1 bg-[#3e663e6e] text-sm rounded-2xl px-4 py-1">
                <LiaWrenchSolid className="text-[#c4622a]" />
                <p className="text-white">Skills & Tools</p>
              </div>
              <div className="flex items-center gap-1 bg-[#3e663e6e] text-white text-sm rounded-2xl px-4 py-1.5">
                <MdOutlinePentagon className="text-[#c4622a]" />
                <p className="text-white">Legal & MSME Reg.</p>
              </div>
              <div className="flex items-center gap-1 bg-[#3e663e6e] text-white text-sm rounded-2xl px-4 py-1">
                <VscGraph className="text-[#c4622a]" />
                <p>Cost Estimation</p>
              </div>
              <div className="flex items-center gap-1 bg-[#3e663e6e] text-white text-sm rounded-2xl px-4 py-1">
                <CiGlobe className="text-[#c4622a]" />
                <p className="text-white">Marketing Basics</p>
              </div>
              <div className="flex items-center gap-1 bg-[#3e663e6e] text-white text-sm rounded-2xl px-4 py-1">
                <SlGraph className="text-[#c4622a]" />
                <p className="text-white">Growth Planning</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 w-50 text-sm font-DM-Sans font-semibold text-white bg-[#c4622a] rounded-2xl py-3 mb-20">
              <p>Explore Roadmaps</p>
              <BsArrowRight />
            </div>
          </div>
          <div className="lg:w-1/2 flex items-start justify-between border border-gray-600 bg-[#3e663e6e] px-10 py-5 rounded-2xl">
            <div>
              <h4 className="font-DM-Sans text-white text-[16px] font-semibold">
                {featuredIdea?.title || "Your business roadmap"}
              </h4>
              <p className="font-DM-Sans text-[13px] text-amber-100 mb-4">
                {(featuredIdea?.category || ["Business"])[0]} · {featuredIdea?.difficulty || "Beginner"}
              </p>
              <ul className="flex flex-col gap-4">
                {featuredRoadmap?.steps?.slice(0, 5).map((step) => <li key={step._id}><div className="flex items-center gap-2"><FaRegCheckCircle className="text-amber-200" /><p className="text-[14px] text-gray-300">{step.title}</p></div></li>)}
                {!featuredRoadmap && <li><p className="text-sm text-gray-400">Select a published idea to see its roadmap.</p></li>}
                <li className="hidden">
                  <div className="flex items-center gap-2 ">
                    <FaRegCheckCircle className="text-amber-200" />
                    <p className="line-through text-[14px] text-gray-400">
                      Idea Validation
                    </p>
                  </div>
                </li>
                <li className="hidden">
                  <div className="flex items-center gap-2 ">
                    <FaRegCheckCircle className="text-amber-200" />
                    <p className="line-through text-[14px] text-gray-400">
                      Skills & Tools Audit
                    </p>
                  </div>
                </li>
                <li className="hidden">
                  <div className="flex items-center gap-2 text-white">
                    <div className="text-black text-[11px] bg-white px-1.5 rounded-[50%]">
                      3
                    </div>
                    <p className="text-[14px]">Legal & MSME Registration</p>
                  </div>
                </li>
                <li className="hidden">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-600 text-gray-400 text-[11px]  px-1.5 rounded-[50%]">
                      4
                    </div>
                    <p className="text-[14px] text-gray-400">Cost Estimation</p>
                  </div>
                </li>
                <li className="hidden">
                  <div className="flex items-center gap-2 ">
                    <div className="text-gray-400 bg-gray-600 text-[11px] px-1.5 rounded-[50%]">
                      5
                    </div>
                    <p className="text-[14px] text-gray-400">
                      Marketing Basics
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="text-white text-[25px] font-Outfit font-extrabold">
              {featuredRoadmap ? `${featuredRoadmap.steps?.length || 0} steps` : "—"}
            </div>
          </div>
        </div>
      </div>

      {/* Menotr Directory */}
      <div className="bg-[#f5f2eb] border-b border-b-gray-300">
        <div className="max-w-7xl mx-auto px-5 py-20 ">
          <div className="flex items-end justify-between py-5">
            <div>
              <p className="flex items-center gap-1 text-[12px] font-DM-Sans font-semibold text-[#c4622a] tracking-wide">
                <GoDash />
                MENTOR DIRECTORY
              </p>
              <p className="text-[30px] w-75 font-Outfit font-extrabold mb-10">
                Learn from those who have launched.
              </p>
            </div>
            <div className="flex item text-[#c4622a] text-[14px] font-DM-Sans tracking-wide font-bold">
              Browse all {homeData.mentors.length} mentors
              <MdKeyboardArrowRight />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">{homeLoading ? <p className="text-sm text-gray-500">Loading verified mentors...</p> : homeData.mentors.length === 0 ? <p className="text-sm text-gray-500">No verified mentors are available yet.</p> : homeData.mentors.slice(0, 4).map((mentor) => <MentorCard key={mentor._id} name={mentor.user?.name || "Mentor"} speciality={mentor.title} location={mentor.location || "Location not set"} skill1={mentor.expertise?.[0] || "Entrepreneurship"} skill2={mentor.expertise?.[1] || "Business Strategy"} mentees={mentor.totalMentees || 0} sessions={mentor.totalSessions || 0} rating={Number(mentor.rating || 0).toFixed(1)} />)}</div>
        </div>
      </div>

      {/* Learning resources */}
      <div className="bg-[#f5f2eb]  border-b border-b-gray-300">
        <div className="max-w-7xl mx-auto px-5 py-18">
          <div className="flex items-end justify-between mb-7">
            <div>
              <p className="flex items-center gap-1 text-[11px] font-DM-Sans text-[#c4622a] tracking-wide font-semibold">
                <GoDash />
                LEARNING RESOURCES
              </p>
              <p className="text-[30px] text-[#1c2616] font-Outfit font-extrabold">
                Videos, articles & checklists.
              </p>
            </div>
            <a className="flex items-center text-[#c4622a] text-[14px] font-DM-Sans tracking-wide font-semibold">
              View all resources
              <MdKeyboardArrowRight />
            </a>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">{homeLoading ? <p className="text-sm text-gray-500">Loading published resources...</p> : homeData.resources.length === 0 ? <p className="text-sm text-gray-500">No published resources are available yet.</p> : homeData.resources.slice(0, 4).map((resource, index) => <LearningCard key={resource._id} icon={resource.type === "Video" ? CiPlay1 : resource.type === "Article" ? GrDocumentText : TbClipboardList} iconBgColor={["bg-pink-200", "bg-blue-200", "bg-green-200"][index % 3]} iconTextColor={["text-pink-900", "text-blue-900", "text-green-900"][index % 3]} fileName={resource.type.toUpperCase()} topics={resource.title} duration={resource.estimatedDuration || resource.category || "Self-paced"} />)}</div>
        </div>
      </div>

      {/* Platform role */}
      <div className="bg-[#f5f2eb]">
        <div className=" max-w-7xl mx-auto px-5 py-15">
          <p className="flex items-center gap-1 text-[11px] text-[#c4622a] tracking-wide font-DM-Sans font-semibold mb-3">
            <GoDash />
            PLATFORM ROLES
          </p>
          <p className="text-[30px] font-Outfit font-extrabold text-center mb-10">
            Built for three types of users.
          </p>
          <div className="grid grid-cols-3 gap-6 mb-6">
            <RoleCard
              icon={FaRegUser}
              iconBgColor="bg-amber-100"
              iconTextColor="text-amber-900"
              role="Learner / Founder"
              description="Discover ideas, follow roadmaps, access resources, and connect
                with mentors to launch your micro-business."
            />
            <RoleCard
              icon={PiBag}
              iconBgColor="bg-[#f5f2eb]"
              iconTextColor="text-[#1e3a1e]"
              role="Mentor / Trainer"
              description="Share your expertise, guide mentees, upload training resources, and manage sessions."
            />
            <RoleCard
              icon={HiOutlineSquares2X2}
              iconBgColor="bg-[#e8e4da]"
              iconTextColor="text-[#1c2616]"
              role="Administrator"
              description="Manage the platform, approve mentors and content, monitor KPIs, and handle reports."
            />
          </div>
        </div>
      </div>

      <div className=" bg-[#c4622a]">
        <div className="max-w-7xl mx-auto px-5 py-15">
          <p className="text-white text-[40px] text-center font-Outfit font-extrabold mb-3">
            Empowering women, youth, and rural entrepreneurs.
          </p>
          <p className="text-gray-200 text-center mb-6">
            Your skills deserve a structured path to a real business. Join
            {stats.learners || 0} learners are building their next opportunity on SkillForge.
          </p>
          <div className="flex items-center justify-center gap-6 mb-4">
            <p className="bg-white text-[#c4622a] font-DM-Sans text-[13px] font-semibold px-8 py-3 rounded-xl">
              Start Free - No Credit Card
            </p>
            <p className="text-white border border-white px-3 py-2 rounded-xl">
              Sign In
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#1e3a1e]">
        <div className="lg:flex lg:items-center lg:justify-between grid grid-cols-2 gap-10 max-w-7xl mx-auto px-5 py-15">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#c4622a] px-2 py-1.5 text-white rounded-xl">
                <PiPlantThin />
              </span>
              <span className="text-white text-[16px] font-bold font-Outfit">
                EntireSkill Hub
              </span>
            </div>
            <p className="text-[15px] text-gray-400 w-90">
              A SBA Unified Mentor platform helping aspiring micro-entrepreneurs
              across India discover, plan, and launch their businesses.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[12px] font-DM-Sans text-gray-400">PLATFORM</p>
            <p className="text-[14px] font-DM-Sans text-gray-200">
              Business Ideas
            </p>
            <p className="text-[14px] font-DM-Sans text-gray-200">Roadmaps</p>
            <p className="text-[14px] font-DM-Sans text-gray-200">Resources</p>
            <p className="text-[14px] font-DM-Sans text-gray-200">
              Mentor Directory
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[12px] font-DM-Sans text-gray-400">ROLES</p>
            <p className="text-[14px] font-DM-Sans text-gray-200">
              Register as Learner
            </p>
            <p className="text-[14px] font-DM-Sans text-gray-200">
              Register as Mentor
            </p>
            <p className="text-[14px] font-DM-Sans text-gray-200">
              Admin Login
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[12px] font-DM-Sans text-gray-400">COMPANY</p>
            <p className="text-[14px] font-DM-Sans text-gray-200">About Us</p>
            <p className="text-[14px] font-DM-Sans text-gray-200">
              Our Mission
            </p>
            <p className="text-[14px] font-DM-Sans text-gray-200">Blog</p>
            <p className="text-[14px] font-DM-Sans text-gray-200">Contact</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-5 border-b border-b-gray-600"></div>

        <div className="bg-[#1e3a1e] max-w-7xl mx-auto px-5 py-8">
          <p className="text-gray-400">
            © 2026 EntreSkill Hub. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
