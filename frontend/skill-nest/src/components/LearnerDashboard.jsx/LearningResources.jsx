import { GoDash } from "react-icons/go";
import { MdArrowRightAlt } from "react-icons/md";
import { FiPlay } from "react-icons/fi";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { LuClipboardList } from "react-icons/lu";

function LearningResources(){
    return(
        <div className="bg-[#fff] px-6 py-6 rounded-2xl mb-4">
                  <div className="flex items-center gap-2 text-[11px] font-DM-Sans font-semibold text-[#c4622a] mb-1.5">
                    <GoDash />
                    <p>CONTINUE LEARNING</p>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[17px] font-Outfit font-extrabold">
                      Your resources
                    </h3>
                    <div className="flex items-center gap-1 text-[13px] text-[#c4622a] font-DM-Sans font-semibold">
                      <p>View all</p>
                      <MdArrowRightAlt />
                    </div>
                  </div>
        
                  <div className="lg:grid lg:grid-cols-3 gap-4">
                    <div className="bg-[#f5f2eb] px-6 py-6 rounded-2xl mb-4">
                      <div className="mb-3 text-[11px] font-DM-Sans">
                        <div className="bg-pink-100 font-semibold w-9 px-2.5 py-2.5 rounded-xl">
                          <FiPlay className="text-[15px] text-pink-700 font-DM-Sans" />
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-500 font-DM-Sans font-semibold mb-1">
                        VIDEO
                      </p>
                      <p className="text-[14px] font-DM-Sans font-semibold mb-1">
                        How to Validate Your Business Idea in 7 Days
                      </p>
                      <div className="bg-[#c4622a] w-full py-[3px] rounded-2xl mb-1"></div>
                      <p className="text-[12px] font-DM-Sans text-gray-600 font-bold">
                        Completed
                      </p>
                    </div>
                    <div className="bg-[#f5f2eb] px-6 py-6 rounded-2xl mb-4">
                      <div className="mb-3 text-[11px] font-DM-Sans">
                        <div className="bg-blue-100 font-semibold w-9 px-2.5 py-2.5 rounded-xl">
                          <BsFileEarmarkPostFill
                            feBold
                            className="text-[15px] text-blue-600 font-DM-Sans"
                          />
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-500 font-DM-Sans font-semibold mb-1">
                        ARTICLE
                      </p>
                      <p className="text-[14px] font-DM-Sans font-semibold mb-1">
                        MSME Udyam Registration - Complete Guide 2026
                      </p>
                      <div className="bg-[#c4622a] w-full py-[3px] rounded-2xl mb-1"></div>
                      <p className="text-[12px] font-DM-Sans text-gray-600 font-bold">
                        Completed
                      </p>
                    </div>
                    <div className="bg-[#f5f2eb] px-6 py-6 rounded-2xl">
                      <div className="mb-3 text-[11px] font-DM-Sans">
                        <div className="bg-green-100 font-semibold w-9 px-2.5 py-2.5 rounded-xl">
                          <LuClipboardList
                            feBold
                            className="text-[15px] text-green-600 font-DM-Sans"
                          />
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-500 font-DM-Sans font-semibold mb-1">
                        CHECKLIST
                      </p>
                      <p className="text-[14px] font-DM-Sans font-semibold mb-1">
                        Pre-Launch Compliance Checklist
                      </p>
                      <div className="bg-[#c4622a] w-full py-[3px] rounded-2xl mb-1"></div>
                      <p className="text-[12px] font-DM-Sans text-gray-600 font-bold">
                        33% done
                      </p>
                    </div>
                  </div>
                </div>
    )
}

export default LearningResources;