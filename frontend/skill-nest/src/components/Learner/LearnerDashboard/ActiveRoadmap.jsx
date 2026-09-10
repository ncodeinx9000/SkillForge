import { GoDash } from "react-icons/go";
import { MdArrowRightAlt } from "react-icons/md";
import { RiCheckboxCircleLine } from "react-icons/ri";

function ActiveRoadmap(){
    return(
        <div className="bg-[#fff]  px-6 py-6 rounded-2xl mb-4">
                    <div className="flex gap-1.5 items-center font-DM-Sans font-semibold text-[11px] text-[#c4622a] mb-2">
                      <GoDash />
                      <p>ACTIVE ROADMAP</p>
                    </div>
                    <div className="flex items-start justify-between mb-5 ">
                      <h1 className="font-Outfit font-extrabold text-[18.5px]">
                        Home Tiffin Service
                      </h1>
                      <div className="flex gap-1 items-center text-[12px] font-DM-Sans font-semibold text-[#c4622a]">
                        <p>Full roadmap</p>
                        <MdArrowRightAlt />
                      </div>
                    </div>
                    <div>
                      <div className="flex gap-2 items-center mb-7">
                        <div className="bg-[#c4622a] w-[90%] p-1 rounded-2xl"></div>
                        <p>49%</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 px-3 py-1">
                          <div className="bg-[#1e3a1e] text-white px-1 py-1 rounded-2xl">
                            <RiCheckboxCircleLine />
                          </div>
                          <p className="text-[14.5px] text-gray-600 font-DM-Sans font-semibold  line-through">
                            Idea Validation
                          </p>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-7">
                          <div className="bg-[#1e3a1e] text-white px-1 py-1 rounded-2xl">
                            <RiCheckboxCircleLine />
                          </div>
                          <p className="text-[14.5px] text-gray-600 font-DM-Sans font-semibold  line-through">
                            Skills & Tools Audit
                          </p>
                        </div>
                        <div className="flex items-center justify-between gap-2 px-3 py-3 bg-[#f8ede7d1] border border-[#c59e8585] rounded-2xl">
                          <div>
                            <p className="bg-[#c4622a] text-white text-[10px] px-2.5 py-1 rounded-full font-semibold">
                              3
                            </p>
                          </div>
                          <div className="w-[90%]">
                            <p className="text-[13px] font-DM-Sans font-semibold mb-2">
                              Legal & MSME Registration
                            </p>
                            <div className="bg-[#c4622a] py-[3px] rounded-2xl mb-1"></div>
                            <p className="text-[11px] text-gray-500">45% complete</p>
                          </div>
                          <div></div>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-7">
                          <div className="bg-[#dfddd8] text-[#0f0f0eab] text-[10px] px-2.5 py-1.5 rounded-4xl">
                            4
                          </div>
                          <p className="text-[14.5px] text-gray-600 font-DM-Sans font-semibold ">
                            Cost Estimation & Pricing
                          </p>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-1">
                          <div className="bg-[#dfddd8] text-[#0f0f0eab] text-[10px] px-2.5 py-1.5 rounded-4xl">
                            4
                          </div>
                          <p className="text-[14.5px] text-gray-600 font-DM-Sans font-semibold ">
                            Marketing & First Customers
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
    )
}

export default ActiveRoadmap;