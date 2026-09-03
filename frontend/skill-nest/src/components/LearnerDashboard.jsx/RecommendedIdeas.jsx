import { GoDash } from "react-icons/go";
import { MdArrowRightAlt } from "react-icons/md";
import { PiForkKnifeBold } from "react-icons/pi";
import { TbGridPattern } from "react-icons/tb";
import { FiScissors } from "react-icons/fi";

function RecommendedIdeas(){
    return(
        <div className="bg-[#fff] px-6 py-6 rounded-2xl mb-4">
                  <div className="flex items-center gap-2 text-[11px] font-DM-Sans font-semibold text-[#c4622a] mb-1.5">
                    <GoDash />
                    <p>RECOMMENDED FOR YOU</p>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[17px] font-Outfit font-extrabold">
                      Based on your skills and interests
                    </h3>
                    <div className="flex items-center gap-1 text-[13px] text-[#c4622a] font-DM-Sans font-semibold">
                      <p>Browse all</p>
                      <MdArrowRightAlt />
                    </div>
                  </div>
        
                  <div className="lg:grid lg:grid-cols-3 gap-4">
                    <div className="bg-[#f5f2eb] px-6 py-6 rounded-2xl mb-4">
                      <div className="mb-3 flex items-start justify-between text-[11px] font-DM-Sans">
                        <div className="bg-amber-100 font-semibold w-9 px-2.5 py-2.5 rounded-xl">
                          <PiForkKnifeBold className="text-[15px] text-[#c4622a] font-DM-Sans" />
                        </div>
                        <p className="text-[#c4622a] font-semibold">96% match</p>
                      </div>
                      <p className="text-[10px] text-gray-500 font-DM-Sans font-semibold mb-1">
                        FOOD & CATERING
                      </p>
                      <p className="text-[14px] font-DM-Sans font-semibold mb-1">
                        Home Tiffin Service
                      </p>
                      <p className="text-[12px] font-DM-Sans text-gray-600 font-bold">
                        Rs.5000-15,000
                      </p>
                    </div>
                    <div className="bg-[#f5f2eb] px-6 py-6 rounded-2xl mb-4">
                      <div className="mb-3 flex items-start justify-between text-[11px] font-DM-Sans">
                        <div className="bg-blue-100 font-semibold w-9 px-2.5 py-2.5 rounded-xl">
                          <FiScissors
                            feBold
                            className="text-[15px] text-blue-800 font-DM-Sans"
                          />
                        </div>
                        <p className="text-[#c4622a] font-semibold">91% match</p>
                      </div>
                      <p className="text-[10px] text-gray-500 font-DM-Sans font-semibold mb-1">
                        FASHION & TAILORING
                      </p>
                      <p className="text-[14px] font-DM-Sans font-semibold mb-1">
                        Custom Boutique
                      </p>
                      <p className="text-[12px] font-DM-Sans text-gray-600 font-bold">
                        Rs.15000-40,000
                      </p>
                    </div>
                    <div className="bg-[#f5f2eb] px-6 py-6 rounded-2xl">
                      <div className="mb-3 flex items-start justify-between text-[11px] font-DM-Sans">
                        <div className="bg-blue-100 font-semibold w-9 px-2.5 py-2.5 rounded-xl">
                          <TbGridPattern
                            feBold
                            className="text-[15px] text-blue-800 font-DM-Sans"
                          />
                        </div>
                        <p className="text-[#c4622a] font-semibold">88% match</p>
                      </div>
                      <p className="text-[10px] text-gray-500 font-DM-Sans font-semibold mb-1">
                        DIGITAL SKILLS
                      </p>
                      <p className="text-[14px] font-DM-Sans font-semibold mb-1">
                        Freelance Design Studio
                      </p>
                      <p className="text-[12px] font-DM-Sans text-gray-600 font-bold">
                        Rs.0-8,000
                      </p>
                    </div>
                  </div>
                </div>
    )
}

export default RecommendedIdeas;