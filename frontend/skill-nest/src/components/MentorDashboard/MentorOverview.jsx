import { LuDot } from "react-icons/lu";

function MentorOverview(){
    return(
       <div className="flex gap-4">

        {/* Mentee Progress - Track progress of assigned mentee */}
        <div className="w-[50%] bg-white px-7 py-3 rounded-2xl">
            <h4 className=" font-Outfit font-bold text-[18px] mb-3">Mentee Progress</h4>
            <div className="flex gap-2 w-full">
                <img src="" alt="" />
                <div className="w-full">
                    <div className="flex justify-between mb-1.5">
                        <p className="text-[13px] ">Kavitha Menon</p>
                        <div className="bg-blue-100 text-[10px] font-DM-Sans font-semibold text-blue-600 px-2 py-0.5 rounded-2xl">On Track</div>
                    </div>
                    <div className="py-0.5 bg-gray-800 mb-0.5"></div>
                    <div className="flex items-center text-[11px] text-gray-600">
                        <p>45%</p>
                        <LuDot />
                        <p>Legal & Registration</p>
                    </div>
                    
                </div>
            </div>

            <div className="flex gap-2 w-full">
                <img src="" alt="" />
                <div className="w-full">
                    <div className="flex justify-between mb-1.5">
                        <p className="text-[13px] ">Priya Sharma</p>
                        <div className="bg-blue-100 text-[10px] font-DM-Sans font-semibold text-blue-600 px-2 py-0.5 rounded-2xl">On Track</div>
                    </div>
                    <div className="py-1 bg-green-600 mb-0.5"></div>
                    <div className="flex items-center text-[11px] text-gray-600">
                        <p>80%</p>
                        <LuDot />
                        <p>Marketing Basics</p>
                    </div>
                    
                </div>
            </div>

            <div className="flex gap-2 w-full">
                <img src="" alt="" />
                <div className="w-full">
                    <div className="flex justify-between mb-1.5">
                        <p className="text-[13px] ">Arun Kumar</p>
                        <div className="bg-red-100 text-[10px] font-DM-Sans font-semibold text-red-600 px-2 py-0.5 rounded-2xl">Needs Help</div>
                    </div>
                    <div className="py-1 bg-red-400 mb-0.5"></div>
                    <div className="flex items-center text-[11px] text-gray-600">
                        <p>20%</p>
                        <LuDot />
                        <p>Idea Validation</p>
                    </div>
                    
                </div>
            </div>

            <div className="flex gap-2 w-full">
                <img src="" alt="" />
                <div className="w-full">
                    <div className="flex justify-between mb-1.5">
                        <p className="text-[13px] ">Fatima Shaikh</p>
                        <div className="bg-red-100 text-[10px] font-DM-Sans font-semibold text-red-600 px-2 py-0.5 rounded-2xl">Needs Help</div>
                    </div>
                    <div className="py-1 bg-gray-800 mb-0.5"></div>
                    <div className="flex items-center text-[11px] text-gray-600">
                        <p>60%</p>
                        <LuDot />
                        <p>Cost Estimation</p>
                    </div>
                    
                </div>
            </div>
        </div>

        {/* Today's Sessions */}
        <div className="bg-white w-[50%] px-7 py-3 rounded-2xl">
            <h4 className=" font-Outfit font-bold text-[18px] mb-3">Today's Sessions</h4>
            <div className="flex gap-2 w-full mb-5 pb-3 border-b border-gray-300">
                <img src="" alt="" />
                <div className="w-full">
                    <div className="flex justify-between mb-1.5">
                        <p className="text-[13px] ">Kavitha Menon</p>
                        <div className="text-[12px] font-DM-Sans font-semibold px-2 py-0.5 rounded-2xl">10:00 AM</div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-gray-600">
                        <p>FSSAI walkthrough</p>
                        <p className="text-[#c4622a] font-semibold">Join</p>
                    </div>
                    
                </div>
            </div>

            <div className="flex gap-2 w-full">
                <img src="" alt="" />
                <div className="w-full">
                    <div className="flex justify-between mb-1.5">
                        <p className="text-[13px] ">Priya Sharma</p>
                        <div className="text-[12px] font-DM-Sans font-semibold px-2 py-0.5 rounded-2xl">3:00 PM</div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-gray-600">
                        <p>Instagram strategy</p>
                        <p className="text-[#c4622a] font-semibold">Join</p>
                    </div>
                    
                </div>
            </div>
        </div>
       </div>
    )
}

export default MentorOverview;