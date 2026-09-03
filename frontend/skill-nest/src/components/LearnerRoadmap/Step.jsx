import { IoIosArrowDown } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaHandPointRight } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useState } from "react";


function Step({heading, subheading, tip, estimatedCost, task1, task2, task3, task4, resource1, resource2}){
    const [showFullStep, setShowFullStep] = useState(false);
    return(<>
        {showFullStep? <div className=" bg-white lg:ml-70 lg:mr-60 mx-6 my- rounded-2xl border border-green-200 shadow mt-6 ">
                <div className="flex items-center justify-between border-b border-b-gray-200 px-5 py-5">
                    <div className="flex items-center gap-4">
                  <div className="bg-[#1e3a1e] text-[14px] text-gray-300 px-3 py-3 rounded-2xl">
                    <FaRegCheckCircle />
                  </div>
                  <div className="font-DM-Sans">
                    <h4 className="flex items-center text-[14px] font-semibold ">
                      {heading} <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-2xl ml-2">Done</span>
                    </h4>
                    <p className="text-[9px] px-2 text-gray-600">4/4</p>
                  </div>
                </div>
                <div 
                onClick={()=>setShowFullStep(!showFullStep)}
                className="text-[13px] text-gray-600"><IoIosArrowDown /></div>
                </div></div>: <div className=" bg-white lg:ml-70 lg:mr-60 mx-6 my- rounded-2xl border border-green-200 shadow mt-6 ">
                <div className="flex items-center justify-between border-b border-b-gray-200 px-5 py-5">
                    <div className="flex items-center gap-4">
                  <div className="bg-[#1e3a1e] text-[14px] text-gray-300 px-3 py-3 rounded-2xl">
                    <FaRegCheckCircle />
                  </div>
                  <div className="font-DM-Sans">
                    <h4 className="flex items-center text-[14px] font-semibold ">
                      {heading} <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-2xl ml-2">Done</span>
                    </h4>
                    <p className="text-[9px] px-2 text-gray-600">4/4</p>
                  </div>
                </div>
                <div 
                onClick={()=>setShowFullStep(!showFullStep)}
                className="text-[13px] text-gray-600"><IoIosArrowDown /></div>
                </div>
                <div className="px-5 py-4 font-DM-Sans ">
                    <p className="text-[14px] text-gray-600 mb-4">{subheading}</p>
                    <div className="flex items-center gap-2 bg-[#ffddca63] px-4 py-2.5 border border-[#eac8b5] shadow rounded-2xl mb-5">
                        <FaHandPointRight className="text-[#c4622a]"/>
                        <p className="text-[13px]">{tip}</p>
                    </div>
                    <div className="flex items-center gap-2 text-[13px] bg-[#e8e4da] px-4 py-2 rounded-2xl mb-4">
                        <LiaRupeeSignSolid />
                        <p className="text-gray-500">Estimated cost: </p>
                        <p className="font-bold">Rs.{estimatedCost}</p>
                    </div>
                    <div className=" font-DM-Sans mb-3">
                        <p className="text-[13px] text-gray-500 font-semibold mb-3">TASKS</p>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="bg-[#c4622a] text-white px-1.5 py-1 rounded-[5px] text-[12px]"><FaRegCheckCircle /></div>
                            <p className="text-[14px] font-semibold">{task1}</p>
                        </div>
                        <div  className="flex items-center gap-2 mb-2">
                            <div className="bg-[#c4622a] text-white px-1.5 py-1 rounded-[5px] text-[12px]"><FaRegCheckCircle /></div>
                            <p  className="text-[14px] font-semibold">{task2}</p>
                        </div>
                        <div  className="flex items-center gap-2 mb-2">
                            <div className="bg-[#c4622a] text-white px-1.5 py-1 rounded-[5px] text-[12px]"><FaRegCheckCircle /></div>
                            <p className="text-[14px] font-semibold">{task3}</p>
                        </div>
                        <div  className="flex items-center gap-2  text-[14px]">
                            <div className="bg-[#c4622a] text-white px-1.5 py-1 rounded-[5px] text-[12px]"><FaRegCheckCircle /></div>
                            <p className="text-[14px] font-semibold">{task4}</p>
                        </div>
                    </div>
        
                    <p className="text-[13px] text-gray-500 font-DM-Sans font-semibold mb-3">RELATED RESOURCES</p>
        
                    <div className="flex items-center gap-2 text-[13px] font-DM-Sans mb-1.5 text-[#c4622a] font-semibold">
                        <FaArrowUpRightFromSquare />
                        <a href="">{resource1}</a>
                    </div>
                    <div  className="flex items-center gap-2 text-[13px] font-DM-Sans text-[#c4622a] font-semibold">
                        <FaArrowUpRightFromSquare />
                        <a href="">{resource2}</a>
                    </div>
                   
                </div>
        
              </div>}
              </>
    )
}

export default Step;